import { Body, Controller, Get, Post, Query, Res, Param, ParseIntPipe } from '@nestjs/common';
import type { Response } from 'express';
import { DosenService } from './dosen.service.js';
import { DosenDto } from './dto/dosen.dto.js';

@Controller('dosen')
export class DosenController {
  constructor(private readonly dosenService: DosenService) {}

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

  @Get('create')
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

  @Post('delete/:id')
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
        error: error.message,
      });
    }

    if (format === 'json') {
      return res.json({ message: 'Dosen berhasil dihapus' });
    }
    return res.redirect('/dosen');
  } 
}
