import { IsNotEmpty, IsString } from 'class-validator';

export class DosenDto {
    @IsNotEmpty({ message: 'Nama harap diisi' })
    @IsString()
    nama: string;

    @IsNotEmpty({ message: 'Mata kuliah harap diisi' })
    @IsString()
    mata_kuliah: string;
}