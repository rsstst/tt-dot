import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});

const prisma = new PrismaClient({adapter});

async function main() {
  await prisma.mahasiswa.deleteMany();
  await prisma.dosen.deleteMany();
  await prisma.user.deleteMany();

  const dosen1 = await prisma.dosen.create({
    data: { nama: 'Budi Santoso', mata_kuliah: 'Pemrograman Web' },
  });
  const dosen2 = await prisma.dosen.create({
    data: { nama: 'Siti Aminah', mata_kuliah: 'Basis Data' },
  });
  const dosen3 = await prisma.dosen.create({
    data: { nama: 'Ahmad Fauzi', mata_kuliah: 'Algoritma & Struktur Data' },
  });

  await prisma.mahasiswa.createMany({
    data: [
      { nama: 'Andi Wijaya', nim: '2021001', dosenId: dosen1.id },
      { nama: 'Rina Putri', nim: '2021002', dosenId: dosen1.id },
      { nama: 'Dewi Lestari', nim: '2021003', dosenId: dosen2.id },
      { nama: 'Fajar Nugroho', nim: '2021004', dosenId: dosen2.id },
      { nama: 'Citra Dewi', nim: '2021005', dosenId: dosen3.id },
      { nama: 'Eko Prasetyo', nim: '2021006', dosenId: dosen3.id },
    ],
  });
}

main()
  .catch((e) => {
    console.error('Seeding gagal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });