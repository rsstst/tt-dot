import { Injectable } from '@nestjs/common';

@Injectable()
export class DosenService {
  getHello(): string {
    return 'Hello World!';
  }
}