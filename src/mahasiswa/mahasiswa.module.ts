import { Module } from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service.js';
import { MahasiswaController } from './mahasiswa.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
    imports: [PrismaModule],
    providers: [MahasiswaService],
    controllers: [MahasiswaController]
})
export class MahasiswaModule {}
