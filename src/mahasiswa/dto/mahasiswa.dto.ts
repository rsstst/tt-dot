import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class MahasiswaDto {
    @IsNotEmpty({ message: 'Nama harap diisi' })
    @IsString()
    nama: string;

    @IsNotEmpty({ message: 'NIM harap diisi' })
    @IsString()
    nim: string;

    @IsNotEmpty({ message: 'Harap pilih dosen terkait'})
    dosenId: number;
}   