-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `role` INTEGER NOT NULL,
    `sid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlackListToken` (
    `tokenId` INTEGER NOT NULL AUTO_INCREMENT,
    `token` TEXT NOT NULL,

    PRIMARY KEY (`tokenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jobs` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(30) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `salary` INTEGER NOT NULL,
    `location` VARCHAR(100) NOT NULL,
    `experience` INTEGER NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `post_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jobs` ADD CONSTRAINT `Jobs_post_by_fkey` FOREIGN KEY (`post_by`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
