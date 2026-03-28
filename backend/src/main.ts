import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  
  // 全局前缀
  app.setGlobalPrefix(configService.get('API_PREFIX') || 'api/v1');
  
  // CORS 配置 - 允许前端访问
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3001'], // Vue 开发服务器
    credentials: true,
  });
  
  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  
  // Swagger API 文档
  const config = new DocumentBuilder()
    .setTitle('钢琴助手 API')
    .setDescription('钢琴学习辅助应用后端接口文档')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  
  console.log(`🎹 钢琴助手后端服务已启动`);
  console.log(`📡 API 地址: http://localhost:${port}/${configService.get('API_PREFIX')}`);
  console.log(`📚 文档地址: http://localhost:${port}/api/docs`);
}

bootstrap();
