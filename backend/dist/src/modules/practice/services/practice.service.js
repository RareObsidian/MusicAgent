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
exports.PracticeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const practice_record_entity_1 = require("../entities/practice-record.entity");
let PracticeService = class PracticeService {
    constructor(practiceRepository) {
        this.practiceRepository = practiceRepository;
    }
    async create(userId, createPracticeDto) {
        const record = this.practiceRepository.create({
            ...createPracticeDto,
            userId,
            status: practice_record_entity_1.PracticeStatus.IN_PROGRESS,
        });
        return this.practiceRepository.save(record);
    }
    async findAllByUser(userId, query) {
        const where = { userId };
        if (query.type) {
            where.type = query.type;
        }
        if (query.startDate && query.endDate) {
            where.startTime = (0, typeorm_2.Between)(new Date(query.startDate), new Date(query.endDate + 'T23:59:59'));
        }
        return this.practiceRepository.find({
            where,
            order: { startTime: 'DESC' },
        });
    }
    async findOne(id, userId) {
        const record = await this.practiceRepository.findOne({
            where: { id, userId },
        });
        if (!record) {
            throw new common_1.NotFoundException('练习记录不存在');
        }
        return record;
    }
    async pause(id, userId) {
        const record = await this.findOne(id, userId);
        if (record.status !== practice_record_entity_1.PracticeStatus.IN_PROGRESS) {
            throw new Error('只能暂停进行中的练习');
        }
        const now = new Date();
        const duration = Math.floor((now.getTime() - record.startTime.getTime()) / 1000);
        record.durationSeconds += duration;
        record.status = practice_record_entity_1.PracticeStatus.PAUSED;
        return this.practiceRepository.save(record);
    }
    async resume(id, userId) {
        const record = await this.findOne(id, userId);
        if (record.status !== practice_record_entity_1.PracticeStatus.PAUSED) {
            throw new Error('只能恢复已暂停的练习');
        }
        record.startTime = new Date();
        record.status = practice_record_entity_1.PracticeStatus.IN_PROGRESS;
        return this.practiceRepository.save(record);
    }
    async end(id, userId, endDto) {
        const record = await this.findOne(id, userId);
        if (record.status === practice_record_entity_1.PracticeStatus.COMPLETED) {
            throw new Error('练习已结束');
        }
        const now = new Date();
        let duration = record.durationSeconds;
        if (record.status === practice_record_entity_1.PracticeStatus.IN_PROGRESS) {
            duration += Math.floor((now.getTime() - record.startTime.getTime()) / 1000);
        }
        record.durationSeconds = duration;
        record.endTime = now;
        record.status = practice_record_entity_1.PracticeStatus.COMPLETED;
        if (endDto.focusRating !== undefined) {
            record.focusRating = endDto.focusRating;
        }
        if (endDto.notes) {
            record.notes = endDto.notes;
        }
        return this.practiceRepository.save(record);
    }
    async getStatistics(userId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const todayRecords = await this.practiceRepository.find({
            where: {
                userId,
                status: practice_record_entity_1.PracticeStatus.COMPLETED,
                endTime: (0, typeorm_2.Between)(today, new Date()),
            },
        });
        const todayMinutes = todayRecords.reduce((sum, r) => sum + Math.floor(r.durationSeconds / 60), 0);
        const weekRecords = await this.practiceRepository.find({
            where: {
                userId,
                status: practice_record_entity_1.PracticeStatus.COMPLETED,
                endTime: (0, typeorm_2.Between)(weekAgo, new Date()),
            },
        });
        const weekMinutes = weekRecords.reduce((sum, r) => sum + Math.floor(r.durationSeconds / 60), 0);
        const totalCount = await this.practiceRepository.count({ where: { userId } });
        const streakDays = await this.calculateStreak(userId);
        return {
            todayMinutes,
            weekMinutes,
            totalCount,
            streakDays,
        };
    }
    async calculateStreak(userId) {
        const records = await this.practiceRepository.find({
            where: { userId, status: practice_record_entity_1.PracticeStatus.COMPLETED },
            order: { endTime: 'DESC' },
        });
        if (records.length === 0)
            return 0;
        const practiceDates = [...new Set(records.map(r => {
                const date = new Date(r.endTime);
                return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            }))];
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        for (let i = 0; i < practiceDates.length; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            const dateStr = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
            if (practiceDates.includes(dateStr)) {
                streak++;
            }
            else if (i > 0) {
                break;
            }
        }
        return streak;
    }
    async remove(id, userId) {
        const record = await this.findOne(id, userId);
        await this.practiceRepository.remove(record);
    }
};
exports.PracticeService = PracticeService;
exports.PracticeService = PracticeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(practice_record_entity_1.PracticeRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PracticeService);
//# sourceMappingURL=practice.service.js.map