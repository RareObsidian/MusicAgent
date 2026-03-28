import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeService } from './services/practice.service';
import { PracticeController } from './controllers/practice.controller';
import { PracticeRecord } from './entities/practice-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PracticeRecord])],
  controllers: [PracticeController],
  providers: [PracticeService],
  exports: [PracticeService],
})
export class PracticeModule {}
