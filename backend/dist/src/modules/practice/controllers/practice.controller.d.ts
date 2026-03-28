import { PracticeService } from '../services/practice.service';
import { CreatePracticeDto, EndPracticeDto } from '../dto/create-practice.dto';
import { PracticeQueryDto } from '../dto/practice-query.dto';
export declare class PracticeController {
    private readonly practiceService;
    constructor(practiceService: PracticeService);
    start(createDto: CreatePracticeDto, req: any): Promise<import("../entities/practice-record.entity").PracticeRecord>;
    pause(id: string, req: any): Promise<import("../entities/practice-record.entity").PracticeRecord>;
    resume(id: string, req: any): Promise<import("../entities/practice-record.entity").PracticeRecord>;
    end(id: string, endDto: EndPracticeDto, req: any): Promise<import("../entities/practice-record.entity").PracticeRecord>;
    findAll(query: PracticeQueryDto, req: any): Promise<import("../entities/practice-record.entity").PracticeRecord[]>;
    getStats(req: any): Promise<{
        todayMinutes: number;
        weekMinutes: number;
        totalCount: number;
        streakDays: number;
    }>;
    findOne(id: string, req: any): Promise<import("../entities/practice-record.entity").PracticeRecord>;
    remove(id: string, req: any): Promise<void>;
}
