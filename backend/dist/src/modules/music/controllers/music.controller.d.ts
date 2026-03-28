import { MusicService } from '../services/music.service';
import { ScaleMode } from '../schemas/scale.schema';
export declare class MusicController {
    private readonly musicService;
    constructor(musicService: MusicService);
    findAllScales(): Promise<import("../schemas/scale.schema").Scale[]>;
    findScaleByKey(key: string, mode?: ScaleMode): Promise<any>;
    findScalesByMode(mode: ScaleMode): Promise<import("../schemas/scale.schema").Scale[]>;
    seedData(): Promise<{
        message: string;
    }>;
}
