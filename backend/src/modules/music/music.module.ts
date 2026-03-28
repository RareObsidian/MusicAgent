import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicService } from './services/music.service';
import { MusicController } from './controllers/music.controller';
import { Scale, ScaleSchema } from './schemas/scale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scale.name, schema: ScaleSchema }]),
  ],
  controllers: [MusicController],
  providers: [MusicService],
  exports: [MusicService],
})
export class MusicModule {}
