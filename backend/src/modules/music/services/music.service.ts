import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scale, ScaleDocument } from '../schemas/scale.schema';
import { ScaleMode } from '../schemas/scale.schema';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Scale.name) private scaleModel: Model<ScaleDocument>,
  ) {}

  async findAllScales(): Promise<Scale[]> {
    return this.scaleModel.find().exec();
  }

  async findScaleByKeyAndMode(key: string, mode: ScaleMode): Promise<Scale | null> {
    return this.scaleModel.findOne({ key, mode }).exec();
  }

  async findScalesByMode(mode: ScaleMode): Promise<Scale[]> {
    return this.scaleModel.find({ mode }).exec();
  }

  async createScale(scale: Partial<Scale>): Promise<Scale> {
    const newScale = new this.scaleModel(scale);
    return newScale.save();
  }

  async seedScales(): Promise<void> {
    const count = await this.scaleModel.countDocuments();
    if (count > 0) return; // 已有数据，跳过

    const scales = [
      // C 大调
      {
        key: 'C',
        mode: ScaleMode.MAJOR,
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
        intervals: [0, 2, 4, 5, 7, 9, 11, 12],
        description: 'C自然大调，无升降号，最基础的调式',
        keySignature: { sharps: 0, flats: 0, accidentals: [] },
        difficulty: 1,
      },
      // G 大调
      {
        key: 'G',
        mode: ScaleMode.MAJOR,
        notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'],
        intervals: [0, 2, 4, 5, 7, 9, 11, 12],
        description: 'G自然大调，1个升号(F#)',
        keySignature: { sharps: 1, flats: 0, accidentals: ['F#'] },
        difficulty: 2,
      },
      // F 大调
      {
        key: 'F',
        mode: ScaleMode.MAJOR,
        notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'],
        intervals: [0, 2, 4, 5, 7, 9, 11, 12],
        description: 'F自然大调，1个降号(Bb)',
        keySignature: { sharps: 0, flats: 1, accidentals: ['Bb'] },
        difficulty: 2,
      },
      // A 自然小调
      {
        key: 'A',
        mode: ScaleMode.MINOR,
        notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'],
        intervals: [0, 2, 3, 5, 7, 8, 10, 12],
        description: 'A自然小调，无升降号，C大调的关系小调',
        keySignature: { sharps: 0, flats: 0, accidentals: [] },
        difficulty: 1,
      },
      // A 和声小调
      {
        key: 'A',
        mode: ScaleMode.HARMONIC_MINOR,
        notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G#', 'A'],
        intervals: [0, 2, 3, 5, 7, 8, 11, 12],
        description: 'A和声小调，升高第VII级音(G#)，增强导音倾向',
        keySignature: { sharps: 0, flats: 0, accidentals: ['G#'] },
        difficulty: 3,
      },
    ];

    await this.scaleModel.insertMany(scales);
    console.log('✅ 音阶数据初始化完成');
  }

  // 获取音阶的频率数据（用于前端播放）
  getScaleFrequencies(notes: string[]): Record<string, number> {
    const baseFrequencies: Record<string, number> = {
      'C': 261.63,
      'C#': 277.18,
      'Db': 277.18,
      'D': 293.66,
      'D#': 311.13,
      'Eb': 311.13,
      'E': 329.63,
      'F': 349.23,
      'F#': 369.99,
      'Gb': 369.99,
      'G': 392.00,
      'G#': 415.30,
      'Ab': 415.30,
      'A': 440.00,
      'A#': 466.16,
      'Bb': 466.16,
      'B': 493.88,
    };

    const frequencies: Record<string, number> = {};
    notes.forEach((note, index) => {
      // 处理八度标记 (如 C2)
      const cleanNote = note.replace(/\d+$/, '');
      const octave = note.match(/\d+/) ? parseInt(note.match(/\d+/)[0]) : 4;
      
      if (baseFrequencies[cleanNote]) {
        // 计算不同八度的频率
        const octaveDiff = octave - 4;
        frequencies[note] = baseFrequencies[cleanNote] * Math.pow(2, octaveDiff);
      }
    });

    return frequencies;
  }
}
