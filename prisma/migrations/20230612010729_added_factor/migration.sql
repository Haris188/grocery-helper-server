/*
  Warnings:

  - Added the required column `unit_factor` to the `Master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Master` ADD COLUMN `unit_factor` INTEGER NOT NULL;
