import { Body, Controller, Get, Post, Query, Res, Param, ParseIntPipe } from '@nestjs/common';
import type { Response } from 'express';
import { MahasiswaService } from './mahasiswa.service.js';

@Controller('mahasiswa')
export class MahasiswaController {
    constructor(private readonly mahasiswaService: MahasiswaService) {}

    @Get()
    async findAll(
        @Query('search') search: string,
        @Query('format') format: string,
        @Res() res: Response,
    ) {
        const mahasiswa = await this.mahasiswaService.findAll(search);

        if (format === 'json') {
            return res.json(mahasiswa);
        }
        return res.render('mahasiswa/index', { mahasiswa, search });
    }
}
