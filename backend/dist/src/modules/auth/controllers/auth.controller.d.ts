import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            phone: any;
            nickname: any;
            avatar: any;
            preferences: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            phone: string;
            nickname: string;
            avatar: string;
            preferences: {
                dailyGoalMinutes: number;
                theme: string;
                notifications: boolean;
            };
        };
    }>;
}
