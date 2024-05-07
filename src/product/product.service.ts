import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ProductService {

  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    return await this.prisma.product.findMany({})
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: {
        id
      },
      data: updateProductDto
    })
  }

  async remove(id: number) {
    await this.prisma.product.delete({
      where: {
        id
      }
    })
  }
}
