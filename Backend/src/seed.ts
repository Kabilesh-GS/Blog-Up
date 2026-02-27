import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const Connect = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: Connect });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.role.createMany({
    data: [
      { role: 'USER' }, 
      { role: 'ADMIN' }],
  });
  console.log('Roles added');

  await prisma.user.create({
    data: {
      fullName: 'Admin',
      userName: 'Admin',
      email: 'admin@blogUp.com',
      password: await bcrypt.hash('AdminPass123', 10),
      userRole: {
        create: {
          role: {
            connect: {
              id: 2,
            },
          },
        },
      },
    },
  });
  console.log('admin Created Successfully');
}

seed()
  .catch((e: unknown) => {
    console.error('Seed failed : ' + e);
  })
  .finally(() => console.log('seed over'));
