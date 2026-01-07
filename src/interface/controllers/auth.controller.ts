import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../application/use-cases/login.use-case';

// DTOs (Data Transfer Objects)
class RegisterDto {
  email!: string;
  password!: string;
}

class LoginDto {
  email!: string;
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto) {
    const user = await this.registerUseCase.execute(body.email, body.password);
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto) {
    return this.loginUseCase.execute(body.email, body.password);
  }
}
