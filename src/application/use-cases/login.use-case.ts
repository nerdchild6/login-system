import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { IUserRepository } from '../../domain/user.repository.interface';
import type { IPasswordHasher } from '../../domain/password-hasher.interface';
import type { ITokenService } from '../../domain/token.service.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('PasswordHasher') private readonly passwordHasher: IPasswordHasher,
    @Inject('TokenService') private readonly tokenService: ITokenService,
  ) {}

  async execute(email: string, rawPassword: string) {
    // 1. Find User
    const user = await this.userRepository.findByEmail(email);

    // LOGIN LOGIC: If user does NOT exist, that is the error.
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Check Password
    const isValid = await this.passwordHasher.compare(
      rawPassword,
      user.password,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Generate Token
    const token = this.tokenService.generate({
      sub: user.id,
      email: user.email,
    });

    return { accessToken: token };
  }
}
