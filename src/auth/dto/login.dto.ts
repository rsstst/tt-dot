import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Username harap diisi' })
    @IsString({ message: 'Username harus berupa string' })
    username: string;

    @IsNotEmpty({ message: 'Password harap diisi' })
    @IsString({ message: 'Password harus berupa string' })
    password: string;
}