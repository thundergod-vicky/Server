"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateProfileDto", {
    enumerable: true,
    get: function() {
        return UpdateProfileDto;
    }
});
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
let UpdateProfileDto = class UpdateProfileDto {
};
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'John Doe',
        description: 'User full name'
    }),
    _ts_metadata("design:type", String)
], UpdateProfileDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'john@example.com',
        description: 'User email'
    }),
    _ts_metadata("design:type", String)
], UpdateProfileDto.prototype, "email", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'newpassword123',
        description: 'New password'
    }),
    _ts_metadata("design:type", String)
], UpdateProfileDto.prototype, "password", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'https://avatar.url',
        description: 'Avatar URL'
    }),
    _ts_metadata("design:type", String)
], UpdateProfileDto.prototype, "avatar", void 0);
_ts_decorate([
    (0, _swagger.ApiPropertyOptional)({
        example: 'A_PLUS',
        enum: [
            'F',
            'D',
            'D_PLUS',
            'C',
            'C_PLUS',
            'B',
            'B_PLUS',
            'A',
            'A_PLUS',
            'E'
        ],
        description: 'Student grade'
    }),
    _ts_metadata("design:type", Object)
], UpdateProfileDto.prototype, "grade", void 0);

//# sourceMappingURL=update-profile.dto.js.map