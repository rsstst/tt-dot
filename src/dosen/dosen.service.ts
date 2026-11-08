import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { DosenDto } from './dto/dosen.dto.js';

@Injectable()
export class DosenService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    return this.prisma.dosen.findMany({
      where: search
        ? { nama: { contains: search } }
        : undefined,
      orderBy: { id: 'asc' },
      select: { id: true, nama: true, mata_kuliah: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.dosen.findUnique({
      where: { id },
      select: { id: true, nama: true, mata_kuliah: true },
    });
  }

  async create(dto: DosenDto) {
    return this.prisma.dosen.create({
      data: {
        nama: dto.nama,
        mata_kuliah: dto.mata_kuliah,
      },
    });
  }

  async delete(id: number) {
    const dosen = await this.prisma.dosen.findUnique({
      where: {id},
      include: { _count: { select: { mahasiswa: true } } },
    });

    if (!dosen) {
      throw new NotFoundException('Dosen tidak ditemukan');
    }
    if (dosen._count.mahasiswa > 0) {
      throw new ConflictException('Dosen tidak dapat dihapus karena masih memiliki mahasiswa');
    }

    await this.prisma.dosen.delete({ where: {id}});
    return { message: 'Dosen berhasil dihapus' };
  }

  async update(id: number, dto: DosenDto) {
    const dosen = await this.prisma.dosen.findUnique({ where: { id } });

    if (!dosen) {
      throw new Error('Dosen tidak ditemukan');
    }

    return this.prisma.dosen.update({
      where: { id },
      data: {
        nama: dto.nama,
        mata_kuliah: dto.mata_kuliah,
      },
    });
  }
}
