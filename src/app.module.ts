import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { DosenModule } from './dosen/dosen.module.js';
import { MahasiswaController } from './mahasiswa/mahasiswa.controller.js';
import { MahasiswaService } from './mahasiswa/mahasiswa.service.js';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule, 
    DosenModule, 
    MahasiswaModule, 
  ],
  controllers: [AppController, MahasiswaController],
  providers: [AppService, MahasiswaService],
})
export class AppModule {}
