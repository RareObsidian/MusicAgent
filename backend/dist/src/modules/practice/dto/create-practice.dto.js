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
exports.EndPracticeDto = exports.CreatePracticeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const practice_record_entity_1 = require("../entities/practice-record.entity");
class CreatePracticeDto {
}
exports.CreatePracticeDto = CreatePracticeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '练习类型', enum: practice_record_entity_1.PracticeType, example: practice_record_entity_1.PracticeType.SCALE }),
    (0, class_validator_1.IsEnum)(practice_record_entity_1.PracticeType),
    __metadata("design:type", String)
], CreatePracticeDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '曲目名称', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePracticeDto.prototype, "pieceName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '开始时间', example: '2026-03-28T10:00:00Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreatePracticeDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePracticeDto.prototype, "notes", void 0);
class EndPracticeDto {
}
exports.EndPracticeDto = EndPracticeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '专注度评分 1-5', required: false, minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], EndPracticeDto.prototype, "focusRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '备注', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EndPracticeDto.prototype, "notes", void 0);
//# sourceMappingURL=create-practice.dto.js.map