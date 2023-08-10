/*
  Warnings:

  - Added the required column `favourite_stores` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `favourite_stores` VARCHAR(191) NOT NULL;
