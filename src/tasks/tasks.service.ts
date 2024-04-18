import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll(user): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        authorId: user.sub,
      },
    });
  }

  async findOne(id: number, userId: number): Promise<Task> {
    return await this.prisma.task.findUnique({
      where: {
        id,
        authorId: userId,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        id,
      },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }
}
