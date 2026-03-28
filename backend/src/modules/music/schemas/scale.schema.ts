import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScaleDocument = Scale & Document;

export enum ScaleMode {
  MAJOR = 'major',
  MINOR = 'minor',
  HARMONIC_MINOR = 'harmonicMinor',
}

@Schema({ collection: 'scales' })
export class Scale {
  @Prop({ required: true })
  key: string; // C, D, E, F, G, A, B 等

  @Prop({ required: true, enum: ScaleMode })
  mode: ScaleMode;

  @Prop({ required: true, type: [String] })
  notes: string[]; // ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']

  @Prop({ type: [Number] })
  intervals: number[]; // 音程半音数 [0, 2, 4, 5, 7, 9, 11, 12]

  @Prop()
  description: string;

  @Prop({ type: Object })
  keySignature: {
    sharps: number;
    flats: number;
    accidentals: string[];
  };

  @Prop({ default: 1 })
  difficulty: number; // 难度等级 1-10

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ScaleSchema = SchemaFactory.createForClass(Scale);
