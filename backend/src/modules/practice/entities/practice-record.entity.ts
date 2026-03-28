import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum PracticeType {
  SCALE = '音阶练习',
  PIECE = '曲目练习',
  SIGHT_READING = '视奏练习',
  THEORY = '乐理学习',
  FREE = '自由练习',
}

export enum PracticeStatus {
  IN_PROGRESS = '进行中',
  PAUSED = '已暂停',
  COMPLETED = '已完成',
}

@Entity('practice_records')
export class PracticeRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.practiceRecords)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: PracticeType,
    default: PracticeType.FREE,
  })
  type: PracticeType;

  @Column({ nullable: true })
  pieceName: string;

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ type: 'datetime', nullable: true })
  endTime: Date;

  @Column({ default: 0 })
  durationSeconds: number;

  @Column({
    type: 'enum',
    enum: PracticeStatus,
    default: PracticeStatus.IN_PROGRESS,
  })
  status: PracticeStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'tinyint', nullable: true })
  focusRating: number; // 1-5 专注度评分

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
