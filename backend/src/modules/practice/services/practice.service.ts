import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { PracticeRecord, PracticeStatus } from '../entities/practice-record.entity';
import { CreatePracticeDto, EndPracticeDto } from '../dto/create-practice.dto';
import { PracticeQueryDto } from '../dto/practice-query.dto';

@Injectable()
export class PracticeService {
  constructor(
    @InjectRepository(PracticeRecord)
    private practiceRepository: Repository<PracticeRecord>,
  ) {}

  async create(userId: string, createPracticeDto: CreatePracticeDto): Promise<PracticeRecord> {
    const record = this.practiceRepository.create({
      ...createPracticeDto,
      userId,
      status: PracticeStatus.IN_PROGRESS,
    });
    return this.practiceRepository.save(record);
  }

  async findAllByUser(userId: string, query: PracticeQueryDto): Promise<PracticeRecord[]> {
    const where: any = { userId };
    
    if (query.type) {
      where.type = query.type;
    }
    
    if (query.startDate && query.endDate) {
      where.startTime = Between(
        new Date(query.startDate),
        new Date(query.endDate + 'T23:59:59'),
      );
    }
    
    return this.practiceRepository.find({
      where,
      order: { startTime: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<PracticeRecord> {
    const record = await this.practiceRepository.findOne({
      where: { id, userId },
    });
    
    if (!record) {
      throw new NotFoundException('练习记录不存在');
    }
    
    return record;
  }

  async pause(id: string, userId: string): Promise<PracticeRecord> {
    const record = await this.findOne(id, userId);
    
    if (record.status !== PracticeStatus.IN_PROGRESS) {
      throw new Error('只能暂停进行中的练习');
    }
    
    const now = new Date();
    const duration = Math.floor((now.getTime() - record.startTime.getTime()) / 1000);
    
    record.durationSeconds += duration;
    record.status = PracticeStatus.PAUSED;
    
    return this.practiceRepository.save(record);
  }

  async resume(id: string, userId: string): Promise<PracticeRecord> {
    const record = await this.findOne(id, userId);
    
    if (record.status !== PracticeStatus.PAUSED) {
      throw new Error('只能恢复已暂停的练习');
    }
    
    record.startTime = new Date();
    record.status = PracticeStatus.IN_PROGRESS;
    
    return this.practiceRepository.save(record);
  }

  async end(id: string, userId: string, endDto: EndPracticeDto): Promise<PracticeRecord> {
    const record = await this.findOne(id, userId);
    
    if (record.status === PracticeStatus.COMPLETED) {
      throw new Error('练习已结束');
    }
    
    const now = new Date();
    let duration = record.durationSeconds;
    
    if (record.status === PracticeStatus.IN_PROGRESS) {
      duration += Math.floor((now.getTime() - record.startTime.getTime()) / 1000);
    }
    
    record.durationSeconds = duration;
    record.endTime = now;
    record.status = PracticeStatus.COMPLETED;
    
    if (endDto.focusRating !== undefined) {
      record.focusRating = endDto.focusRating;
    }
    
    if (endDto.notes) {
      record.notes = endDto.notes;
    }
    
    return this.practiceRepository.save(record);
  }

  async getStatistics(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    // 今日练习时长
    const todayRecords = await this.practiceRepository.find({
      where: {
        userId,
        status: PracticeStatus.COMPLETED,
        endTime: Between(today, new Date()),
      },
    });
    const todayMinutes = todayRecords.reduce((sum, r) => sum + Math.floor(r.durationSeconds / 60), 0);
    
    // 本周练习时长
    const weekRecords = await this.practiceRepository.find({
      where: {
        userId,
        status: PracticeStatus.COMPLETED,
        endTime: Between(weekAgo, new Date()),
      },
    });
    const weekMinutes = weekRecords.reduce((sum, r) => sum + Math.floor(r.durationSeconds / 60), 0);
    
    // 练习次数
    const totalCount = await this.practiceRepository.count({ where: { userId } });
    
    // 连续练习天数 (简化计算)
    const streakDays = await this.calculateStreak(userId);
    
    return {
      todayMinutes,
      weekMinutes,
      totalCount,
      streakDays,
    };
  }

  private async calculateStreak(userId: string): Promise<number> {
    // 获取所有练习日期
    const records = await this.practiceRepository.find({
      where: { userId, status: PracticeStatus.COMPLETED },
      order: { endTime: 'DESC' },
    });
    
    if (records.length === 0) return 0;
    
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
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  }

  async remove(id: string, userId: string): Promise<void> {
    const record = await this.findOne(id, userId);
    await this.practiceRepository.remove(record);
  }
}
