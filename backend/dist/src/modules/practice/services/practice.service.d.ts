import { Repository } from 'typeorm';
import { PracticeRecord } from '../entities/practice-record.entity';
import { CreatePracticeDto, EndPracticeDto } from '../dto/create-practice.dto';
import { PracticeQueryDto } from '../dto/practice-query.dto';
export declare class PracticeService {
    private practiceRepository;
    constructor(practiceRepository: Repository<PracticeRecord>);
    create(userId: string, createPracticeDto: CreatePracticeDto): Promise<PracticeRecord>;
    findAllByUser(userId: string, query: PracticeQueryDto): Promise<PracticeRecord[]>;
    findOne(id: string, userId: string): Promise<PracticeRecord>;
    pause(id: string, userId: string): Promise<PracticeRecord>;
    resume(id: string, userId: string): Promise<PracticeRecord>;
    end(id: string, userId: string, endDto: EndPracticeDto): Promise<PracticeRecord>;
    getStatistics(userId: string): Promise<{
        todayMinutes: number;
        weekMinutes: number;
        totalCount: number;
        streakDays: number;
    }>;
    private calculateStreak;
    remove(id: string, userId: string): Promise<void>;
}
