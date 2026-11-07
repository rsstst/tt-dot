import { Module } from '@nestjs/common';
import { DosenService } from './dosen.service.js';
import { DosenController } from './dosen.controller.js';

@Module({
  providers: [DosenService],
  controllers: [DosenController]
})
export class DosenModule {}
