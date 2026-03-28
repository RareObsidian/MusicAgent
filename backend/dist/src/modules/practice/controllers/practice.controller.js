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
exports.PracticeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const practice_service_1 = require("../services/practice.service");
const create_practice_dto_1 = require("../dto/create-practice.dto");
const practice_query_dto_1 = require("../dto/practice-query.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let PracticeController = class PracticeController {
    constructor(practiceService) {
        this.practiceService = practiceService;
    }
    start(createDto, req) {
        return this.practiceService.create(req.user.userId, createDto);
    }
    pause(id, req) {
        return this.practiceService.pause(id, req.user.userId);
    }
    resume(id, req) {
        return this.practiceService.resume(id, req.user.userId);
    }
    end(id, endDto, req) {
        return this.practiceService.end(id, req.user.userId, endDto);
    }
    findAll(query, req) {
        return this.practiceService.findAllByUser(req.user.userId, query);
    }
    getStats(req) {
        return this.practiceService.getStatistics(req.user.userId);
    }
    findOne(id, req) {
        return this.practiceService.findOne(id, req.user.userId);
    }
    remove(id, req) {
        return this.practiceService.remove(id, req.user.userId);
    }
};
exports.PracticeController = PracticeController;
__decorate([
    (0, common_1.Post)('start'),
    (0, swagger_1.ApiOperation)({ summary: '开始练习' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_practice_dto_1.CreatePracticeDto, Object]),
    __metadata("design:returntype", void 0)
], PracticeController.prototype, "start", null);
__decorate([
    (0, common_1.Post)(':id/pause'),
    (0, swagger_1.ApiOperation)({ summary: '暂停练习' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PracticeController.prototype, "pause", null);
__decorate([
    (0, common_1.Post)(':id/resume'),
    (0, swagger_1.ApiOperation)({ summary: '恢复练习' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PracticeController.prototype, "resume", null);
__decorate([
    (0, common_1.Post)(':id/end'),
    (0, swagger_1.ApiOperation)({ summary: '结束练习' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_practice_dto_1.EndPracticeDto, Object]),
    __metadata("design:returntype", void 0)
], PracticeController.prototype, "end", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '获取练习记录列表' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [practice_query_dto_1.PracticeQueryDto, Object]),
    __metadata("design:returntype", void 0)
], PracticeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: '获取练习统计' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PracticeController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '获取单个练习记录' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PracticeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '删除练习记录' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PracticeController.prototype, "remove", null);
exports.PracticeController = PracticeController = __decorate([
    (0, swagger_1.ApiTags)('练习记录'),
    (0, common_1.Controller)('practice'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [practice_service_1.PracticeService])
], PracticeController);
//# sourceMappingURL=practice.controller.js.map