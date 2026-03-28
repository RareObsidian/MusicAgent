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
exports.PracticeRecord = exports.PracticeStatus = exports.PracticeType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
var PracticeType;
(function (PracticeType) {
    PracticeType["SCALE"] = "\u97F3\u9636\u7EC3\u4E60";
    PracticeType["PIECE"] = "\u66F2\u76EE\u7EC3\u4E60";
    PracticeType["SIGHT_READING"] = "\u89C6\u594F\u7EC3\u4E60";
    PracticeType["THEORY"] = "\u4E50\u7406\u5B66\u4E60";
    PracticeType["FREE"] = "\u81EA\u7531\u7EC3\u4E60";
})(PracticeType || (exports.PracticeType = PracticeType = {}));
var PracticeStatus;
(function (PracticeStatus) {
    PracticeStatus["IN_PROGRESS"] = "\u8FDB\u884C\u4E2D";
    PracticeStatus["PAUSED"] = "\u5DF2\u6682\u505C";
    PracticeStatus["COMPLETED"] = "\u5DF2\u5B8C\u6210";
})(PracticeStatus || (exports.PracticeStatus = PracticeStatus = {}));
let PracticeRecord = class PracticeRecord {
};
exports.PracticeRecord = PracticeRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PracticeRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PracticeRecord.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.practiceRecords),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], PracticeRecord.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PracticeType,
        default: PracticeType.FREE,
    }),
    __metadata("design:type", String)
], PracticeRecord.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PracticeRecord.prototype, "pieceName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], PracticeRecord.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], PracticeRecord.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], PracticeRecord.prototype, "durationSeconds", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PracticeStatus,
        default: PracticeStatus.IN_PROGRESS,
    }),
    __metadata("design:type", String)
], PracticeRecord.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PracticeRecord.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], PracticeRecord.prototype, "focusRating", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PracticeRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PracticeRecord.prototype, "updatedAt", void 0);
exports.PracticeRecord = PracticeRecord = __decorate([
    (0, typeorm_1.Entity)('practice_records')
], PracticeRecord);
//# sourceMappingURL=practice-record.entity.js.map