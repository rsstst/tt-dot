import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async validateUser(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });

        //Jika user tidak terdaftar, error
        if (!user) {
            throw new UnauthorizedException('Username tidak ditemukan');
        }

        //Jika user sesuai, konfirmasi username dan password
        const isMatch = await this.prisma.user.findFirst({
            where: { username: dto.username, password: dto.password },
        });
        
        //Jika tidak sama, error
        if (!isMatch) {
            throw new UnauthorizedException('Username atau password salah');
        }

        const { password, ...result } = user;
        return result;
    }
}
