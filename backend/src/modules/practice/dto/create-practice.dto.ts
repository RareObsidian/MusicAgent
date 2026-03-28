import { IsEnum, IsString, IsOptional, IsDateString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PracticeType } from '../entities/practice-record.entity';

export class CreatePracticeDto {
  @ApiProperty({ description: '练习类型', enum: PracticeType, example: PracticeType.SCALE })
  @IsEnum(PracticeType)
  type: PracticeType;

  @ApiProperty({ description: '曲目名称', required: false })
  @IsString()
  @IsOptional()
  pieceName?: string;

  @ApiProperty({ description: '开始时间', example: '2026-03-28T10:00:00Z' })
  @IsDateString()
  startTime: Date;

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class EndPracticeDto {
  @ApiProperty({ description: '专注度评分 1-5', required: false, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  focusRating?: number;

  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
