import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: string;
  email: string;
  phone: string;
  nickname: string;
  avatar: string;
  preferences: any;
  createdAt: Date;
  
  @Exclude()
  password: string;
  
  @Exclude()
  isActive: boolean;
  
  @Exclude()
  updatedAt: Date;
}
