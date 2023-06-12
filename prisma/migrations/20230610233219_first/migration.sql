-- CreateTable
CREATE TABLE `master_staging` (
    `Store` TEXT NULL,
    `City` TEXT NULL,
    `Province` TEXT NULL,
    `Zip Code` TEXT NULL,
    `Country` TEXT NULL,
    `UPC` INTEGER NULL,
    `Product` TEXT NULL,
    `Units` TEXT NULL,
    `Brand` TEXT NULL,
    `Currency` TEXT NULL,
    `VECTOR` TEXT NULL,
    `VALUE` DOUBLE NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `vector` VARCHAR(191) NOT NULL,
    `unit_price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProductToStore` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductToStore_AB_unique`(`A`, `B`),
    INDEX `_ProductToStore_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductToStore` ADD CONSTRAINT `_ProductToStore_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductToStore` ADD CONSTRAINT `_ProductToStore_B_fkey` FOREIGN KEY (`B`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
