import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PracticeType } from '../entities/practice-record.entity';

export class PracticeQueryDto {
  @ApiProperty({ description: '练习类型', enum: PracticeType, required: false })
  @IsEnum(PracticeType)
  @IsOptional()
  type?: PracticeType;

  @ApiProperty({ description: '开始日期', example: '2026-03-01', required: false })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({ description: '结束日期', example: '2026-03-31', required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
