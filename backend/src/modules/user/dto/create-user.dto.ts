import { IsEmail, IsString, MinLength, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '邮箱', example: 'user@example.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: '手机号', example: '13800138000', required: false })
  @IsPhoneNumber('CN')
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '密码', example: '123456', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: '昵称', example: '钢琴爱好者', required: false })
  @IsString()
  @IsOptional()
  nickname?: string;
}
