import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { MahasiswaDto } from './dto/mahasiswa.dto.js';

@Injectable()
export class MahasiswaService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    return this.prisma.mahasiswa.findMany({
      where: search
        ? { nama: { contains: search } }
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

  async findOne(id_mhs: number) {
    const mahasiswa = await this.prisma.mahasiswa.findUnique({
      where: { id: id_mhs },
    });
    if (!mahasiswa) {
      throw new NotFoundException('Mahasiswa tidak ditemukan');
    }
    return mahasiswa;
  }

  async getAllDosen() {
    return this.prisma.dosen.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        nama: true,
        mata_kuliah: true,
      },
    });
  }

  async create(dto: MahasiswaDto) {

    const dosen = await this.prisma.dosen.findUnique({
      where: { id: dto.dosenId },
    });
    if (!dosen) {
      throw new BadRequestException('Dosen tidak ditemukan');
    }

    const exist = await this.prisma.mahasiswa.findUnique({
      where: { nim: dto.nim },
    });
    if (exist) {
      throw new ConflictException('NIM sudah digunakan');
    }

    return this.prisma.mahasiswa.create({
      data: {
        nama: dto.nama,
        nim: dto.nim,
        dosenId: dto.dosenId,
      },
    });
  }

  async update(id_mhs: number, dto: MahasiswaDto) {
    const mahasiswa = await this.findOne(id_mhs);

    const dosen = await this.prisma.dosen.findUnique({
      where: { id: dto.dosenId },
    });
    if (!dosen) {
      throw new BadRequestException('Dosen tidak ditemukan');
    }

    if (mahasiswa.nim !== dto.nim) {
      const exist = await this.prisma.mahasiswa.findUnique({
        where: { nim: dto.nim },
      });
      if (exist) {
        throw new ConflictException('NIM sudah digunakan');
      }
    }

    return this.prisma.mahasiswa.update({
      where: { id: id_mhs },
      data: {
        nama: dto.nama,
        nim: dto.nim,
        dosenId: dto.dosenId,
      },
    });
  }

  async delete(id_mhs: number) {
    await this.findOne(id_mhs);
    await this.prisma.mahasiswa.delete({
      where: { id: id_mhs },
    });
    return { message: 'Mahasiswa berhasil dihapus' };
  }
}
