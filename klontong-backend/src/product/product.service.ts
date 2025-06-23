import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    return this.prisma.product.create({ data });
  }

  async findAll(page = 1, limit = 10, search?: string, categoryId?: number) {
    const where: Prisma.ProductWhereInput = {
      ...(search && {
        name: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
      ...(categoryId && {
        categoryId: +categoryId,
      }),
    };

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { category: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: data.map((p: any) => ({
        id: p.id,
        categoryId: p.categoryId,
        categoryName: p.category.name,
        sku: p.sku,
        name: p.name,
        description: p.description,
        weight: p.weight,
        width: p.width,
        length: p.length,
        height: p.height,
        image: p.image,
        price: p.price,
      })),
      page,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  update(id: number, data) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
