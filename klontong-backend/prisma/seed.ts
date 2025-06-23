import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Load JSON files...');
  const categories = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/categories.json'), 'utf-8')
  );
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data/products.json'), 'utf-8')
  );

  console.log('Seeding categories...');
  await prisma.category.createMany({ data: categories });
  const allCategories = await prisma.category.findMany();

  console.log('Seeding products...');
  for (const p of products) {
    const category = allCategories.find((c) => c.name === p.categoryName);
    if (!category) continue;

    await prisma.product.create({
      data: {
        name: p.name,
        sku: p.sku,
        description: p.description,
        weight: p.weight,
        width: p.width,
        length: p.length,
        height: p.height,
        image: p.image,
        price: p.price,
        categoryId: category.id,
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
