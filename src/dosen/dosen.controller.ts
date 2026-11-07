import { Controller, Get, Render } from '@nestjs/common';
import { DosenService } from './dosen.service.js';

@Controller('dosen')
export class DosenController {
    constructor(private dosenService: DosenService) {}

  @Get()
  @Render('dosen')
  getHello(): { message: string } {
    return { message: this.dosenService.getHello() };
  }
}
