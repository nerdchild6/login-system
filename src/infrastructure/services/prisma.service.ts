import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // 1. Create the native Postgres connection pool
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });

    // 2. Create the Driver Adapter
    const adapter = new PrismaPg(pool);

    // 3. Pass the adapter to PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
