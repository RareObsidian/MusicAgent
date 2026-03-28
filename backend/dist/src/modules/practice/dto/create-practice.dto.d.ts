import { PracticeType } from '../entities/practice-record.entity';
export declare class CreatePracticeDto {
    type: PracticeType;
    pieceName?: string;
    startTime: Date;
    notes?: string;
}
export declare class EndPracticeDto {
    focusRating?: number;
    notes?: string;
}
