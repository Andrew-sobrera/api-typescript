import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    const payload = { sub: user.id, username: user.email };
    const token = await this.jwtService.signAsync(payload);

    return await this.prisma.user.update({
      where: {
        id,
      },

      data: {
        token,
      },
    });
  }
}
