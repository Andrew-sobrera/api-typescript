/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma.service';
import { Task } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService, private eventEmitter: EventEmitter2) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const payload = await this.prisma.task.create({
      data: createTaskDto,
    })
      await this.eventEmitter.emit('create.task', payload);

    return payload
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
