import { Body, Controller, Get, Post, Query, Res, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { DosenService } from './dosen.service.js';
import { DosenDto } from './dto/dosen.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';

@Controller('dosen')
export class DosenController {
  constructor(private dosenService: DosenService) {}

  // ambil semua data dosen
  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('format') format: string,
    @Res() res: Response,
  ) {
    const dosen = await this.dosenService.findAll(search);

    if (format === 'json') {
      return res.json(dosen);
    }
    return res.render('dosen/index', { dosen, search });
  }

  // ambil data dosen dari id, tampilkan ke form edit
  @Get(':id/edit')
  @UseGuards(AuthGuard)
  async editForm(
    @Param('id', ParseIntPipe) id: number,
    @Query('format') format: string,
    @Res() res: Response,
  ){
    const dosen = await this.dosenService.findOne(id);

    if (format === 'json') {
      return res.json(dosen);
    }

    return res.render('dosen/edit', { dosen });
  }

  // tambah data dosen
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() dto: DosenDto,
    @Query('format') format: string,
    @Res() res: Response,
  ) {
    await this.dosenService.create(dto);

    if (format === 'json') {
      return res.json({ message: 'Dosen berhasil ditambahkan' });
    }
    return res.redirect('/dosen');
  }

  // hapus data dosen
  @Post(':id/delete')
  @UseGuards(AuthGuard)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('format') format: string,
    @Res() res: Response,
  ) {
    try {
      await this.dosenService.delete(id);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      if (format === 'json') {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).render('dosen/index', {
        dosen: await this.dosenService.findAll(),
        error: error.message,
      });
    }

    if (format === 'json') {
      return res.json({ message: 'Dosen berhasil dihapus' });
    }
    return res.redirect('/dosen');
  } 

  // update data dosen
  @Post(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DosenDto,
    @Query('format') format: string,
    @Res() res: Response,
  ){
    await this.dosenService.update(id, dto);

    if (format === 'json') {
      return res.json({ message: 'Dosen berhasil diupdate' });
    }
    return res.redirect('/dosen');
  }
}
