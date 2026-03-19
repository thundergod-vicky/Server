"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CreateExamDto () {
        return CreateExamDto;
    },
    get ExamStatus () {
        return ExamStatus;
    }
});
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
var ExamStatus = /*#__PURE__*/ function(ExamStatus) {
    ExamStatus["DRAFT"] = "DRAFT";
    ExamStatus["PLANNED"] = "PLANNED";
    ExamStatus["SCHEDULED"] = "SCHEDULED";
    return ExamStatus;
}({});
let CreateExamDto = class CreateExamDto {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], CreateExamDto.prototype, "title", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateExamDto.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateExamDto.prototype, "batchId", void 0);
_ts_decorate([
    (0, _classvalidator.IsEnum)(ExamStatus),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], CreateExamDto.prototype, "status", void 0);

//# sourceMappingURL=create-exam.dto.js.map