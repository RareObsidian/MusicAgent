import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PracticeService } from '../services/practice.service';
import { CreatePracticeDto, EndPracticeDto } from '../dto/create-practice.dto';
import { PracticeQueryDto } from '../dto/practice-query.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('练习记录')
@Controller('practice')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post('start')
  @ApiOperation({ summary: '开始练习' })
  start(@Body() createDto: CreatePracticeDto, @Request() req) {
    return this.practiceService.create(req.user.userId, createDto);
  }

  @Post(':id/pause')
  @ApiOperation({ summary: '暂停练习' })
  pause(@Param('id') id: string, @Request() req) {
    return this.practiceService.pause(id, req.user.userId);
  }

  @Post(':id/resume')
  @ApiOperation({ summary: '恢复练习' })
  resume(@Param('id') id: string, @Request() req) {
    return this.practiceService.resume(id, req.user.userId);
  }

  @Post(':id/end')
  @ApiOperation({ summary: '结束练习' })
  end(@Param('id') id: string, @Body() endDto: EndPracticeDto, @Request() req) {
    return this.practiceService.end(id, req.user.userId, endDto);
  }

  @Get()
  @ApiOperation({ summary: '获取练习记录列表' })
  findAll(@Query() query: PracticeQueryDto, @Request() req) {
    return this.practiceService.findAllByUser(req.user.userId, query);
  }

  @Get('stats')
  @ApiOperation({ summary: '获取练习统计' })
  getStats(@Request() req) {
    return this.practiceService.getStatistics(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个练习记录' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.practiceService.findOne(id, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除练习记录' })
  remove(@Param('id') id: string, @Request() req) {
    return this.practiceService.remove(id, req.user.userId);
  }
}
