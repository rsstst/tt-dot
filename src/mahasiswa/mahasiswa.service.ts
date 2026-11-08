import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { MahasiswaDto } from './dto/mahasiswa.dto.js';

@Injectable()
export class MahasiswaService {
    constructor(private prisma: PrismaService) {}

    async findAll(search?: string) {
        return this.prisma.mahasiswa.findMany({
            where: search
                ? { nama: { contains: search, mode: 'insensitive' } }
                : undefined,
            orderBy: { id: 'asc' },
            select: {
                id: true,
                nama: true,
                nim: true,
                dosen: { select: { nama: true } },
            },
        });
    }

    async create(dto: MahasiswaDto) {
        return this.prisma.mahasiswa.create({
            data: {
                nama: dto.nama,
                nim: dto.nim,
                dosenId: dto.dosenId,
            },
        });
    }

    async delete(id: number) {
        const mahasiswa = await this.prisma.mahasiswa.findUnique({
            where: { id },
        });

        if (!mahasiswa) {
            throw new Error('Mahasiswa tidak ditemukan');
        }

        await this.prisma.mahasiswa.delete({ where: { id } });
        return { message: 'Mahasiswa berhasil dihapus' };
    }
}
