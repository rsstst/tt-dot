import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Username harap diisi' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'Password harap diisi' })
    @IsString()
    password: string;
}