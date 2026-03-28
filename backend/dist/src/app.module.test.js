"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const practice_module_1 = require("./modules/practice/practice.module");
const music_module_1 = require("./modules/music/music.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('MYSQL_HOST', 'localhost'),
                    port: configService.get('MYSQL_PORT', 3306),
                    username: configService.get('MYSQL_USERNAME', 'root'),
                    password: configService.get('MYSQL_PASSWORD', ''),
                    database: configService.get('MYSQL_DATABASE', 'piano_assistant'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                    logging: false,
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    uri: configService.get('MONGODB_URI', 'mongodb://localhost:27017/piano_assistant'),
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            practice_module_1.PracticeModule,
            music_module_1.MusicModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.test.js.map