import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { IUserRepository } from '../../domain/user.repository.interface';
import { User } from '../../domain/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.userModel.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.prisma.userModel.findUnique({
      where: { email },
    });

    if (!found) return null;

    // Map Prisma Model -> Domain Entity
    return new User(found.id, found.email, found.password, found.createdAt);
  }
}
