import { IsNotEmpty, IsString } from 'class-validator';

export class DosenDto {
    @IsNotEmpty({ message: 'Nama harap diisi' })
    @IsString({ message: 'Nama harus berupa string' })
    nama: string;

    @IsNotEmpty({ message: 'Mata kuliah harap diisi' })
    @IsString({ message: 'Mata kuliah harus berupa string' })
    mata_kuliah: string;
}