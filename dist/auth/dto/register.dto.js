"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RegisterDto", {
    enumerable: true,
    get: function() {
        return RegisterDto;
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
let RegisterDto = class RegisterDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'John Doe',
        description: 'Full name'
    }),
    _ts_metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'john@example.com',
        description: 'User email'
    }),
    _ts_metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'password123',
        description: 'User password'
    }),
    _ts_metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        example: 'STUDENT',
        enum: [
            'STUDENT',
            'TEACHER',
            'PARENT',
            'ADMIN'
        ],
        description: 'User role'
    }),
    _ts_metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);

//# sourceMappingURL=register.dto.js.map