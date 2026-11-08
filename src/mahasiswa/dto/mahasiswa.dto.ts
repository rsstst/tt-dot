import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class MahasiswaDto {
    @IsNotEmpty({ message: 'Nama harap diisi' })
    @IsString({ message: 'Nama harus berupa string' })
    nama: string;

    @IsNotEmpty({ message: 'NIM harap diisi' })
    @IsString({ message: 'NIM harus berupa string' })
    nim: string;

    @IsNotEmpty({ message: 'Harap pilih dosen terkait'})
    @IsInt({ message: 'ID dosen tidak valid' })
    @Type(() => Number)
    dosenId: number;
}   