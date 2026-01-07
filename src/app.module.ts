import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './interface/controllers/auth.controller';
import { PrismaService } from './infrastructure/services/prisma.service';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { BcryptPasswordHasher } from './infrastructure/services/bcrypt-password.hasher';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY', // Change this in production!
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    RegisterUseCase,
    LoginUseCase,
    // Dependency Injection Bindings
    { provide: 'UserRepository', useClass: PrismaUserRepository },
    { provide: 'PasswordHasher', useClass: BcryptPasswordHasher },
    { provide: 'TokenService', useClass: JwtTokenService },
  ],
})
export class AppModule {}
