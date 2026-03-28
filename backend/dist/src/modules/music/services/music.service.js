"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const scale_schema_1 = require("../schemas/scale.schema");
const scale_schema_2 = require("../schemas/scale.schema");
let MusicService = class MusicService {
    constructor(scaleModel) {
        this.scaleModel = scaleModel;
    }
    async findAllScales() {
        return this.scaleModel.find().exec();
    }
    async findScaleByKeyAndMode(key, mode) {
        return this.scaleModel.findOne({ key, mode }).exec();
    }
    async findScalesByMode(mode) {
        return this.scaleModel.find({ mode }).exec();
    }
    async createScale(scale) {
        const newScale = new this.scaleModel(scale);
        return newScale.save();
    }
    async seedScales() {
        const count = await this.scaleModel.countDocuments();
        if (count > 0)
            return;
        const scales = [
            {
                key: 'C',
                mode: scale_schema_2.ScaleMode.MAJOR,
                notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
                intervals: [0, 2, 4, 5, 7, 9, 11, 12],
                description: 'C自然大调，无升降号，最基础的调式',
                keySignature: { sharps: 0, flats: 0, accidentals: [] },
                difficulty: 1,
            },
            {
                key: 'G',
                mode: scale_schema_2.ScaleMode.MAJOR,
                notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'],
                intervals: [0, 2, 4, 5, 7, 9, 11, 12],
                description: 'G自然大调，1个升号(F#)',
                keySignature: { sharps: 1, flats: 0, accidentals: ['F#'] },
                difficulty: 2,
            },
            {
                key: 'F',
                mode: scale_schema_2.ScaleMode.MAJOR,
                notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'],
                intervals: [0, 2, 4, 5, 7, 9, 11, 12],
                description: 'F自然大调，1个降号(Bb)',
                keySignature: { sharps: 0, flats: 1, accidentals: ['Bb'] },
                difficulty: 2,
            },
            {
                key: 'A',
                mode: scale_schema_2.ScaleMode.MINOR,
                notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'],
                intervals: [0, 2, 3, 5, 7, 8, 10, 12],
                description: 'A自然小调，无升降号，C大调的关系小调',
                keySignature: { sharps: 0, flats: 0, accidentals: [] },
                difficulty: 1,
            },
            {
                key: 'A',
                mode: scale_schema_2.ScaleMode.HARMONIC_MINOR,
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
    getScaleFrequencies(notes) {
        const baseFrequencies = {
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
        const frequencies = {};
        notes.forEach((note, index) => {
            const cleanNote = note.replace(/\d+$/, '');
            const octave = note.match(/\d+/) ? parseInt(note.match(/\d+/)[0]) : 4;
            if (baseFrequencies[cleanNote]) {
                const octaveDiff = octave - 4;
                frequencies[note] = baseFrequencies[cleanNote] * Math.pow(2, octaveDiff);
            }
        });
        return frequencies;
    }
};
exports.MusicService = MusicService;
exports.MusicService = MusicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(scale_schema_1.Scale.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MusicService);
//# sourceMappingURL=music.service.js.map