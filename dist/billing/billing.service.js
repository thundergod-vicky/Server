"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingService", {
    enumerable: true,
    get: function() {
        return BillingService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../prisma/prisma.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingService = class BillingService {
    // --- Billing Templates ---
    async createTemplate(data) {
        try {
            // @ts-ignore
            return await this.prisma.billingTemplate.create({
                data: {
                    ...data,
                    metadata: data.metadata || {}
                }
            });
        } catch (error) {
            throw new _common.BadRequestException(`Template Creation Failed: ${error.message}`);
        }
    }
    async findAllTemplates() {
        return await this.prisma.billingTemplate.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async findTemplate(id) {
        return await this.prisma.billingTemplate.findUnique({
            where: {
                id
            }
        });
    }
    async updateTemplate(id, data) {
        return await this.prisma.billingTemplate.update({
            where: {
                id
            },
            data
        });
    }
    async deleteTemplate(id) {
        return await this.prisma.billingTemplate.delete({
            where: {
                id
            }
        });
    }
    async generateInvoice(data) {
        const student = await this.prisma.user.findUnique({
            where: {
                id: data.studentId
            }
        });
        if (!student) throw new Error('Student not found');
        const invoiceData = {
            studentId: data.studentId,
            amount: data.amount ?? 0,
            tax: data.tax ?? 0,
            total: data.total ?? 0,
            items: data.customItems ?? [],
            status: data.status || 'PENDING',
            paymentMethod: data.paymentMethod || null,
            transactionId: data.transactionId || null,
            metadata: data.metadata || {},
            invoiceNumber: ''
        };
        if (data.templateId) {
            const template = await this.findTemplate(data.templateId);
            if (template) {
                invoiceData.templateId = template.id;
                if (!data.amount) {
                    invoiceData.amount = template.baseAmount;
                    invoiceData.tax = template.baseAmount * (template.taxRate / 100);
                    invoiceData.total = invoiceData.amount + invoiceData.tax;
                }
                if (!data.customItems) {
                    invoiceData.items = template.items ?? [
                        {
                            description: template.name,
                            amount: template.baseAmount
                        }
                    ];
                }
            }
        }
        // Generate unique invoice number
        const date = new Date();
        const prefix = `INV-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        const count = await this.prisma.invoice.count({
            where: {
                invoiceNumber: {
                    startsWith: prefix
                }
            }
        });
        invoiceData.invoiceNumber = `${prefix}-${(count + 1).toString().padStart(4, '0')}`;
        return await this.prisma.invoice.create({
            data: invoiceData,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        enrollmentId: true
                    }
                },
                template: true
            }
        });
    }
    async findAllInvoices(studentId) {
        return await this.prisma.invoice.findMany({
            where: studentId ? {
                studentId
            } : undefined,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        enrollmentId: true
                    }
                },
                template: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    async findInvoice(id) {
        return await this.prisma.invoice.findUnique({
            where: {
                id
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        enrollmentId: true
                    }
                },
                template: true
            }
        });
    }
    async updateInvoiceStatus(id, status) {
        return await this.prisma.invoice.update({
            where: {
                id
            },
            data: {
                status
            }
        });
    }
    async updateInvoice(id, data) {
        // Extract fields we want to update
        const { items, metadata, status, paymentMethod, transactionId, amount, tax, total } = data;
        // Create an update object, only including fields that are present in the request
        const updateData = {};
        if (items !== undefined) updateData.items = items;
        if (metadata !== undefined) updateData.metadata = metadata;
        if (status !== undefined) updateData.status = status;
        if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
        if (transactionId !== undefined) updateData.transactionId = transactionId;
        if (amount !== undefined) updateData.amount = parseFloat(amount.toString()) || 0;
        if (tax !== undefined) updateData.tax = parseFloat(tax.toString()) || 0;
        if (total !== undefined) updateData.total = parseFloat(total.toString()) || 0;
        // Find the current invoice to identify the linked payment before updating
        const currentInvoice = await this.prisma.invoice.findUnique({
            where: {
                id
            }
        });
        const updatedInvoice = await this.prisma.invoice.update({
            where: {
                id
            },
            data: updateData,
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        enrollmentId: true
                    }
                },
                template: true
            }
        });
        // Sync with Payment record if linked via transactionId
        const txId = updatedInvoice.transactionId || currentInvoice?.transactionId;
        if (txId) {
            try {
                const payment = await this.prisma.payment.findUnique({
                    where: {
                        txRef: txId
                    }
                });
                if (payment) {
                    const paymentStatusMap = {
                        'PAID': 'SUCCESS',
                        'EMI': 'SUCCESS',
                        'PARTIAL': 'SUCCESS',
                        'PENDING': 'PENDING',
                        'CANCELLED': 'FAILED'
                    };
                    await this.prisma.payment.update({
                        where: {
                            txRef: txId
                        },
                        data: {
                            amount: updateData.total !== undefined ? updateData.total : undefined,
                            status: updateData.status ? paymentStatusMap[updateData.status] : undefined,
                            mode: updateData.paymentMethod !== undefined ? updateData.paymentMethod : undefined
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to sync invoice update with payment record:", error);
            // We don't throw here to avoid failing the whole request if only the optional sync fails
            }
        }
        return updatedInvoice;
    }
    async markInvoiceSent(id) {
        return await this.prisma.invoice.update({
            where: {
                id
            },
            data: {
                sentAt: new Date()
            }
        });
    }
    async deleteInvoice(id) {
        return await this.prisma.invoice.delete({
            where: {
                id
            }
        });
    }
    async bulkDeleteRecords(studentIds) {
        // 1. Delete all invoices for these students
        const deletedInvoices = await this.prisma.invoice.deleteMany({
            where: {
                studentId: {
                    in: studentIds
                }
            }
        });
        // 2. Delete all payments for these students
        const deletedPayments = await this.prisma.payment.deleteMany({
            where: {
                studentId: {
                    in: studentIds
                }
            }
        });
        // 3. Reset financial status for these students back to "NONE"
        await this.prisma.user.updateMany({
            where: {
                id: {
                    in: studentIds
                }
            },
            data: {
                financialStatus: "NONE"
            }
        });
        return {
            deletedInvoices: deletedInvoices.count,
            deletedPayments: deletedPayments.count
        };
    }
    async getSummary() {
        const totalInvoices = await this.prisma.invoice.count();
        const outstandingResult = await this.prisma.invoice.aggregate({
            where: {
                status: 'PENDING'
            },
            _sum: {
                total: true
            }
        });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const clearedTodayResult = await this.prisma.invoice.aggregate({
            where: {
                status: 'PAID',
                updatedAt: {
                    gte: today
                }
            },
            _sum: {
                total: true
            }
        });
        return {
            totalInvoices,
            outstandingAmount: outstandingResult._sum.total || 0,
            clearedTodayAmount: clearedTodayResult._sum.total || 0
        };
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
BillingService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], BillingService);

//# sourceMappingURL=billing.service.js.map