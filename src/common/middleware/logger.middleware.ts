import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request & { user?: any }, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
