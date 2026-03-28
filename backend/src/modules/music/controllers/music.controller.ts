import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MusicService } from '../services/music.service';
import { ScaleMode } from '../schemas/scale.schema';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('乐理知识')
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('scales')
  @ApiOperation({ summary: '获取所有音阶' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAllScales() {
    return this.musicService.findAllScales();
  }

  @Get('scales/:key')
  @ApiOperation({ summary: '获取指定调号的音阶' })
  @ApiQuery({ name: 'mode', enum: ScaleMode, required: false })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findScaleByKey(
    @Param('key') key: string,
    @Query('mode') mode: ScaleMode = ScaleMode.MAJOR,
  ) {
    const scale = await this.musicService.findScaleByKeyAndMode(key, mode);
    if (!scale) {
      return { message: '音阶不存在' };
    }
    
    // 添加频率数据
    const frequencies = this.musicService.getScaleFrequencies(scale.notes);
    
    // 转换为普通对象
    const scaleObj = JSON.parse(JSON.stringify(scale));
    
    return {
      ...scaleObj,
      frequencies,
    };
  }

  @Get('scales/mode/:mode')
  @ApiOperation({ summary: '按调式获取音阶' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findScalesByMode(@Param('mode') mode: ScaleMode) {
    return this.musicService.findScalesByMode(mode);
  }

  @Post('seed')
  @ApiOperation({ summary: '初始化音阶数据' })
  async seedData() {
    await this.musicService.seedScales();
    return { message: '数据初始化完成' };
  }
}
