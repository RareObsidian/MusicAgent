"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const music_service_1 = require("../services/music.service");
const scale_schema_1 = require("../schemas/scale.schema");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let MusicController = class MusicController {
    constructor(musicService) {
        this.musicService = musicService;
    }
    findAllScales() {
        return this.musicService.findAllScales();
    }
    async findScaleByKey(key, mode = scale_schema_1.ScaleMode.MAJOR) {
        const scale = await this.musicService.findScaleByKeyAndMode(key, mode);
        if (!scale) {
            return { message: '音阶不存在' };
        }
        const frequencies = this.musicService.getScaleFrequencies(scale.notes);
        const scaleObj = JSON.parse(JSON.stringify(scale));
        return {
            ...scaleObj,
            frequencies,
        };
    }
    findScalesByMode(mode) {
        return this.musicService.findScalesByMode(mode);
    }
    async seedData() {
        await this.musicService.seedScales();
        return { message: '数据初始化完成' };
    }
};
exports.MusicController = MusicController;
__decorate([
    (0, common_1.Get)('scales'),
    (0, swagger_1.ApiOperation)({ summary: '获取所有音阶' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "findAllScales", null);
__decorate([
    (0, common_1.Get)('scales/:key'),
    (0, swagger_1.ApiOperation)({ summary: '获取指定调号的音阶' }),
    (0, swagger_1.ApiQuery)({ name: 'mode', enum: scale_schema_1.ScaleMode, required: false }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Query)('mode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "findScaleByKey", null);
__decorate([
    (0, common_1.Get)('scales/mode/:mode'),
    (0, swagger_1.ApiOperation)({ summary: '按调式获取音阶' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('mode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MusicController.prototype, "findScalesByMode", null);
__decorate([
    (0, common_1.Post)('seed'),
    (0, swagger_1.ApiOperation)({ summary: '初始化音阶数据' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "seedData", null);
exports.MusicController = MusicController = __decorate([
    (0, swagger_1.ApiTags)('乐理知识'),
    (0, common_1.Controller)('music'),
    __metadata("design:paramtypes", [music_service_1.MusicService])
], MusicController);
//# sourceMappingURL=music.controller.js.map