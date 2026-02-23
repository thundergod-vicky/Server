"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BatchesService", {
    enumerable: true,
    get: function() {
        return BatchesService;
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
let BatchesService = class BatchesService {
    async create(createBatchDto) {
        return this.prisma.batch.create({
            data: {
                name: createBatchDto.name,
                description: createBatchDto.description,
                teacherId: createBatchDto.teacherId
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }
    async findAll() {
        return this.prisma.batch.findMany({
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                _count: {
                    select: {
                        students: true
                    }
                }
            }
        });
    }
    async findOne(id) {
        const batch = await this.prisma.batch.findUnique({
            where: {
                id
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                students: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        if (!batch) {
            throw new _common.NotFoundException(`Batch with ID ${id} not found`);
        }
        return batch;
    }
    async assignStudents(batchId, studentIds) {
        return this.prisma.batch.update({
            where: {
                id: batchId
            },
            data: {
                students: {
                    connect: studentIds.map((id)=>({
                            id
                        }))
                }
            },
            include: {
                students: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }
    async assignTeacher(batchId, teacherId) {
        return this.prisma.batch.update({
            where: {
                id: batchId
            },
            data: {
                teacherId: teacherId
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }
    async removeStudent(batchId, studentId) {
        return this.prisma.batch.update({
            where: {
                id: batchId
            },
            data: {
                students: {
                    disconnect: {
                        id: studentId
                    }
                }
            }
        });
    }
    async findByStudent(studentId) {
        return this.prisma.batch.findMany({
            where: {
                students: {
                    some: {
                        id: studentId
                    }
                }
            },
            include: {
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }
    async findByTeacher(teacherId) {
        return this.prisma.batch.findMany({
            where: {
                teacherId
            },
            include: {
                _count: {
                    select: {
                        students: true
                    }
                }
            }
        });
    }
    async delete(id) {
        return this.prisma.batch.delete({
            where: {
                id
            }
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
BatchesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], BatchesService);

//# sourceMappingURL=batches.service.js.map