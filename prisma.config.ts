import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // 1. Use process.env (Standard in both Node and Bun)
    // 2. OR use a dummy URL so 'prisma generate' passes on Windows without a real DB
    url:
      process.env.DATABASE_URL ||
      'postgresql://dummy_user:dummy_pwd@localhost:5432/dummy_db',
  },
});
