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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PracticeQueryDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const practice_record_entity_1 = require("../entities/practice-record.entity");
class PracticeQueryDto {
}
exports.PracticeQueryDto = PracticeQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '练习类型', enum: practice_record_entity_1.PracticeType, required: false }),
    (0, class_validator_1.IsEnum)(practice_record_entity_1.PracticeType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PracticeQueryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '开始日期', example: '2026-03-01', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PracticeQueryDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '结束日期', example: '2026-03-31', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PracticeQueryDto.prototype, "endDate", void 0);
//# sourceMappingURL=practice-query.dto.js.map