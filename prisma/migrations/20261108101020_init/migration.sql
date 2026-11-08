-- CreateTable
CREATE TABLE "dosen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "mata_kuliah" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mahasiswa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "dosenId" INTEGER NOT NULL,
    CONSTRAINT "mahasiswa_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "dosen" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_nim_key" ON "mahasiswa"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
