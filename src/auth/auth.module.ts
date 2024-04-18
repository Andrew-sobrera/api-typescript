import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Corrija o caminho para PrismaService
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [AuthService, PrismaService], // Inclua PrismaService nos providers
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
