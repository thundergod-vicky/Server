"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateBatchDto", {
    enumerable: true,
    get: function() {
        return CreateBatchDto;
    }
});
const _classvalidator = require("class-validator");
const _swagger = require("@nestjs/swagger");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateBatchDto = class CreateBatchDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'Class 10 - Mathematics'
    }),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateBatchDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'Morning batch for class 10 math students',
        required: false
    }),
    (0, _classvalidator.IsOptional)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateBatchDto.prototype, "description", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'userId_of_teacher'
    }),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateBatchDto.prototype, "teacherId", void 0);

//# sourceMappingURL=create-batch.dto.js.map