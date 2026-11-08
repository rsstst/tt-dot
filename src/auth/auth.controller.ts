import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthGuard } from '../common/guards/auth.guard.js';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  showLogin(
    @Query('format') format: string,
    @Query('error') error: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (req.session?.user) {
      return res.redirect('/dashboard');
    }

    if (format === 'json') {
      return res.json({ view: 'auth/login', loggedIn: false });
    }

    return res.render('auth/login', {
      error: error || null,
    });
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Query('format') format: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const user = await this.authService.validateUser(dto);

      req.session.user = user;

      if (format === 'json') {
        return res.json({ message: 'Login berhasil', user });
      }
      return res.redirect('/dashboard');
    } catch (error) {
      if (format === 'json') {
        throw error;
      }
      return res.redirect('/login?error=Username atau password salah');
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logout(
    @Query('format') format: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    req.session.destroy(() =>{
        if (format === 'json') {
            return res.json({ message: 'Logout berhasil' });
        }
        return res.redirect('/login');
    })
  }
}
