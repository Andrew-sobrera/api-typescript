import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskListener } from './task.listener';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HttpModule } from '@nestjs/axios'; // Importe de '@nestjs/axios'

@Module({
  imports: [EventEmitterModule.forRoot(), HttpModule], // Certifique-se de importar o EventEmitterModule.forRoot() se estiver no módulo raiz
  controllers: [TasksController],
  providers: [TasksService, PrismaService, TaskListener],
})
export class TasksModule {}
