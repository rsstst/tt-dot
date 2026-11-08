import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { MahasiswaService } from './mahasiswa.service.js';
import { MahasiswaDto } from './dto/mahasiswa.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';

@Controller('mahasiswa')
export class MahasiswaController {
  constructor(private mahasiswaService: MahasiswaService) {}

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('format') format: string,
    @Res() res: Response,
  ) {
    const mahasiswa = await this.mahasiswaService.findAll(search);
    const dosen = await this.mahasiswaService.getAllDosen();

    if (format === 'json') {
      return res.json(mahasiswa);
    }
    return res.render('mahasiswa/index', { mahasiswa, search, dosen });
  }

  @Get(':id/edit')
  @UseGuards(AuthGuard)
  async editForm(
    @Param('id', ParseIntPipe) id: number,
    @Query('format') format: string,
    @Res() res: Response,
  ){
    const mahasiswa = await this.mahasiswaService.findOne(id);
    let dosen = await this.mahasiswaService.getAllDosen();

    dosen = dosen.map(d => ({
      ...d,
      selected: d.id === mahasiswa.dosenId
    }));

    if (format === 'json') {
      return res.json(mahasiswa);
    }

    return res.render('mahasiswa/edit', { mahasiswa, dosen });
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() dto: MahasiswaDto,
    @Query('format') format: string,
    @Res() res: Response,
  ) {
    await this.mahasiswaService.create(dto);

    if (format === 'json') {
      return res.json({ message: 'Mahasiswa berhasil ditambahkan' });
    }

    return res.redirect('/mahasiswa');
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MahasiswaDto,
    @Query('format') format: string,
    @Res() res: Response,
  ){
    await this.mahasiswaService.update(id, dto);

    if (format === 'json') {
      return res.json({ message: 'Mahasiswa berhasil diupdate' });
    }

    return res.redirect('/mahasiswa');
  }

  @Post(':id/delete')
  @UseGuards(AuthGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('format') format: string,
    @Res() res: Response,
  ) {
    try {
      await this.mahasiswaService.delete(id);

      if (format === 'json') {
        return res.json({ message: 'Mahasiswa berhasil dihapus' });
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      if (format === 'json') {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).render('mahasiswa/index', {
        mahasiswa: await this.mahasiswaService.findAll(),
        dosen: await this.mahasiswaService.getAllDosen(),
        error: error.message,
      });
    }
    return res.redirect('/mahasiswa');
  }
}
