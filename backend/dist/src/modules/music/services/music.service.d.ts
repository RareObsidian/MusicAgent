import { Model } from 'mongoose';
import { Scale, ScaleDocument } from '../schemas/scale.schema';
import { ScaleMode } from '../schemas/scale.schema';
export declare class MusicService {
    private scaleModel;
    constructor(scaleModel: Model<ScaleDocument>);
    findAllScales(): Promise<Scale[]>;
    findScaleByKeyAndMode(key: string, mode: ScaleMode): Promise<Scale | null>;
    findScalesByMode(mode: ScaleMode): Promise<Scale[]>;
    createScale(scale: Partial<Scale>): Promise<Scale>;
    seedScales(): Promise<void>;
    getScaleFrequencies(notes: string[]): Record<string, number>;
}
