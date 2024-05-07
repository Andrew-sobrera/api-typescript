import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { SqsSenderService } from './sqs/sqs.service';
import { MessagesController } from './sqs/sqs.controller';

@Module({
  imports: [TasksModule, AuthModule, UsersModule, ProductModule],
  controllers: [
    AppController,
    TasksController,
    AuthController,
    UsersController,
    ProductController,
    MessagesController
  ],
  providers: [
    AppService,
    TasksService,
    PrismaService,
    AuthService,
    UsersService,
    ProductService,
    SqsSenderService
  ],
})
@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TasksController);
  }
}
