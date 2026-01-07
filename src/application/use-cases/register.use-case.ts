import { Inject, Injectable } from '@nestjs/common';
// FIX: Add 'type' keyword here
import type { IUserRepository } from '../../domain/user.repository.interface';
import type { IPasswordHasher } from '../../domain/password-hasher.interface';
import { User } from '../../domain/user.entity';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('PasswordHasher') private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(email: string, rawPassword: string): Promise<User> {
    // ... logic remains the same
    User.validate(email, rawPassword);
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await this.passwordHasher.hash(rawPassword);
    const newUser = new User(
      crypto.randomUUID(),
      email,
      hashedPassword,
      new Date(),
    );
    await this.userRepository.save(newUser);
    return newUser;
  }
}
