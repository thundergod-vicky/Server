"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingController", {
    enumerable: true,
    get: function() {
        return BillingController;
    }
});
const _common = require("@nestjs/common");
const _billingservice = require("./billing.service");
const _jwtauthguard = require("../auth/jwt-auth.guard");
const _rolesguard = require("../auth/roles.guard");
const _rolesdecorator = require("../auth/roles.decorator");
const _client = require("@prisma/client");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let BillingController = class BillingController {
    getSummary() {
        return this.billingService.getSummary();
    }
    // --- Billing Templates ---
    createTemplate(body) {
        return this.billingService.createTemplate(body);
    }
    findAllTemplates() {
        return this.billingService.findAllTemplates();
    }
    findTemplate(id) {
        return this.billingService.findTemplate(id);
    }
    updateTemplate(id, body) {
        return this.billingService.updateTemplate(id, body);
    }
    deleteTemplate(id) {
        return this.billingService.deleteTemplate(id);
    }
    // --- Invoices ---
    generateInvoice(body) {
        return this.billingService.generateInvoice(body);
    }
    findAllInvoices(studentId) {
        return this.billingService.findAllInvoices(studentId);
    }
    findInvoice(id) {
        return this.billingService.findInvoice(id);
    }
    updateInvoiceStatus(id, status) {
        return this.billingService.updateInvoiceStatus(id, status);
    }
    updateInvoice(id, body) {
        return this.billingService.updateInvoice(id, body);
    }
    markInvoiceSent(id) {
        return this.billingService.markInvoiceSent(id);
    }
    deleteInvoice(id) {
        return this.billingService.deleteInvoice(id);
    }
    bulkDelete(studentIds) {
        return this.billingService.bulkDeleteRecords(studentIds);
    }
    constructor(billingService){
        this.billingService = billingService;
    }
};
_ts_decorate([
    (0, _common.Get)('summary'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "getSummary", null);
_ts_decorate([
    (0, _common.Post)('templates'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "createTemplate", null);
_ts_decorate([
    (0, _common.Get)('templates'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "findAllTemplates", null);
_ts_decorate([
    (0, _common.Get)('templates/:id'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "findTemplate", null);
_ts_decorate([
    (0, _common.Patch)('templates/:id'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "updateTemplate", null);
_ts_decorate([
    (0, _common.Delete)('templates/:id'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "deleteTemplate", null);
_ts_decorate([
    (0, _common.Post)('invoices'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "generateInvoice", null);
_ts_decorate([
    (0, _common.Get)('invoices'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Query)('studentId')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "findAllInvoices", null);
_ts_decorate([
    (0, _common.Get)('invoices/:id'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "findInvoice", null);
_ts_decorate([
    (0, _common.Patch)('invoices/:id/status'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)('status')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "updateInvoiceStatus", null);
_ts_decorate([
    (0, _common.Patch)('invoices/:id'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "updateInvoice", null);
_ts_decorate([
    (0, _common.Post)('invoices/:id/send'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "markInvoiceSent", null);
_ts_decorate([
    (0, _common.Delete)('invoices/:id'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "deleteInvoice", null);
_ts_decorate([
    (0, _common.Post)('invoices/bulk-delete'),
    (0, _rolesdecorator.Roles)(_client.Role.ADMIN, _client.Role.ACCOUNTS),
    _ts_param(0, (0, _common.Body)('studentIds')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Array
    ]),
    _ts_metadata("design:returntype", void 0)
], BillingController.prototype, "bulkDelete", null);
BillingController = _ts_decorate([
    (0, _common.Controller)('billing'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _rolesguard.RolesGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService
    ])
], BillingController);

//# sourceMappingURL=billing.controller.js.map