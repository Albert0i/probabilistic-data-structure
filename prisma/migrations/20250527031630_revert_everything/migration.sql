/*
  Warnings:

  - You are about to drop the column `jobDescription` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `jobTitle` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `jobType` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `order_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_userId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `jobDescription`,
    DROP COLUMN `jobTitle`,
    DROP COLUMN `jobType`;

-- DropTable
DROP TABLE `order_details`;

-- DropTable
DROP TABLE `orders`;

-- DropTable
DROP TABLE `products`;
