import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });
  }

  const categories = await prisma.category.findMany();

  for (let i = 0; i < 100; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        sku: faker.string.alpha(6).toUpperCase(),
        description: faker.commerce.productDescription(),
        weight: faker.number.int({ min: 100, max: 1000 }),
        width: 10,
        height: 10,
        length: 10,
        image: faker.image.urlLoremFlickr({ category: 'product' }),
        price: faker.number.int({ min: 1000, max: 100000 }),
        categoryId: categories[Math.floor(Math.random() * categories.length)].id,
      },
    });
  }

  const hashedPassword = await bcrypt.hash('test123', 10);

  await prisma.user.create({
    data: {
      email: 'test@klontong.com',
      password: hashedPassword,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('Error during seeding:', e);
    prisma.$disconnect();
    process.exit(1);
  });
