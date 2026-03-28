import { PracticeRecord } from '../../practice/entities/practice-record.entity';
export declare class User {
    id: string;
    email: string;
    phone: string;
    password: string;
    nickname: string;
    avatar: string;
    preferences: {
        dailyGoalMinutes: number;
        theme: string;
        notifications: boolean;
    };
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    practiceRecords: PracticeRecord[];
}
