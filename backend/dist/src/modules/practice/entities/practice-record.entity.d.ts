import { User } from '../../user/entities/user.entity';
export declare enum PracticeType {
    SCALE = "\u97F3\u9636\u7EC3\u4E60",
    PIECE = "\u66F2\u76EE\u7EC3\u4E60",
    SIGHT_READING = "\u89C6\u594F\u7EC3\u4E60",
    THEORY = "\u4E50\u7406\u5B66\u4E60",
    FREE = "\u81EA\u7531\u7EC3\u4E60"
}
export declare enum PracticeStatus {
    IN_PROGRESS = "\u8FDB\u884C\u4E2D",
    PAUSED = "\u5DF2\u6682\u505C",
    COMPLETED = "\u5DF2\u5B8C\u6210"
}
export declare class PracticeRecord {
    id: string;
    userId: string;
    user: User;
    type: PracticeType;
    pieceName: string;
    startTime: Date;
    endTime: Date;
    durationSeconds: number;
    status: PracticeStatus;
    notes: string;
    focusRating: number;
    createdAt: Date;
    updatedAt: Date;
}
