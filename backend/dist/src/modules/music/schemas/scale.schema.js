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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleSchema = exports.Scale = exports.ScaleMode = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var ScaleMode;
(function (ScaleMode) {
    ScaleMode["MAJOR"] = "major";
    ScaleMode["MINOR"] = "minor";
    ScaleMode["HARMONIC_MINOR"] = "harmonicMinor";
})(ScaleMode || (exports.ScaleMode = ScaleMode = {}));
let Scale = class Scale {
};
exports.Scale = Scale;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Scale.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ScaleMode }),
    __metadata("design:type", String)
], Scale.prototype, "mode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [String] }),
    __metadata("design:type", Array)
], Scale.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Number] }),
    __metadata("design:type", Array)
], Scale.prototype, "intervals", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Scale.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], Scale.prototype, "keySignature", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], Scale.prototype, "difficulty", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Scale.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Scale.prototype, "updatedAt", void 0);
exports.Scale = Scale = __decorate([
    (0, mongoose_1.Schema)({ collection: 'scales' })
], Scale);
exports.ScaleSchema = mongoose_1.SchemaFactory.createForClass(Scale);
//# sourceMappingURL=scale.schema.js.map