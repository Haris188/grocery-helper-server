/*
  Warnings:

  - You are about to drop the column `currency` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_ProductToStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ProductToStore` DROP FOREIGN KEY `_ProductToStore_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ProductToStore` DROP FOREIGN KEY `_ProductToStore_B_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `currency`,
    DROP COLUMN `unit`,
    DROP COLUMN `unit_price`;

-- DropTable
DROP TABLE `_ProductToStore`;

-- CreateTable
CREATE TABLE `Master` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `unit_price` DOUBLE NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Master` ADD CONSTRAINT `Master_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Master` ADD CONSTRAINT `Master_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
