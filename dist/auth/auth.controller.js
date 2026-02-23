"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _authservice = require("./auth.service");
const _logindto = require("./dto/login.dto");
const _registerdto = require("./dto/register.dto");
const _logoutdto = require("./dto/logout.dto");
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
let AuthController = class AuthController {
    async login(loginDto) {
        if (!loginDto || !loginDto.email || !loginDto.password) {
            throw new _common.UnauthorizedException('Missing email or password');
        }
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new _common.UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async logout(body) {
        return this.authService.logout(body.userId);
    }
    constructor(authService){
        this.authService = authService;
    }
};
_ts_decorate([
    (0, _common.Post)('login'),
    (0, _swagger.ApiOperation)({
        summary: 'User login'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Login successful'
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Invalid credentials'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logindto.LoginDto === "undefined" ? Object : _logindto.LoginDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
_ts_decorate([
    (0, _common.Post)('register'),
    (0, _swagger.ApiOperation)({
        summary: 'User registration'
    }),
    (0, _swagger.ApiResponse)({
        status: 201,
        description: 'Registration successful'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _registerdto.RegisterDto === "undefined" ? Object : _registerdto.RegisterDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
_ts_decorate([
    (0, _common.Post)('logout'),
    (0, _swagger.ApiOperation)({
        summary: 'User logout'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Logged out successfully'
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logoutdto.LogoutDto === "undefined" ? Object : _logoutdto.LogoutDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = _ts_decorate([
    (0, _swagger.ApiTags)('Auth'),
    (0, _common.Controller)('auth'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map