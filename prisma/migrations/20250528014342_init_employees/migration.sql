/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Employee` (
    `emp_no` INTEGER NOT NULL AUTO_INCREMENT,
    `birth_date` DATETIME(3) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `hire_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`emp_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Department` (
    `dept_no` VARCHAR(191) NOT NULL,
    `dept_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Department_dept_name_key`(`dept_name`),
    PRIMARY KEY (`dept_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Salary` (
    `emp_no` INTEGER NOT NULL,
    `from_date` DATETIME(3) NOT NULL,
    `to_date` DATETIME(3) NOT NULL,
    `salary` INTEGER NOT NULL,

    PRIMARY KEY (`emp_no`, `from_date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Title` (
    `emp_no` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `from_date` DATETIME(3) NOT NULL,
    `to_date` DATETIME(3) NULL,

    PRIMARY KEY (`emp_no`, `from_date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeptEmp` (
    `emp_no` INTEGER NOT NULL,
    `dept_no` VARCHAR(191) NOT NULL,
    `from_date` DATETIME(3) NOT NULL,
    `to_date` DATETIME(3) NULL,

    PRIMARY KEY (`emp_no`, `dept_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DeptManager` (
    `emp_no` INTEGER NOT NULL,
    `dept_no` VARCHAR(191) NOT NULL,
    `from_date` DATETIME(3) NOT NULL,
    `to_date` DATETIME(3) NULL,

    PRIMARY KEY (`emp_no`, `dept_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Salary` ADD CONSTRAINT `Salary_emp_no_fkey` FOREIGN KEY (`emp_no`) REFERENCES `Employee`(`emp_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Title` ADD CONSTRAINT `Title_emp_no_fkey` FOREIGN KEY (`emp_no`) REFERENCES `Employee`(`emp_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeptEmp` ADD CONSTRAINT `DeptEmp_emp_no_fkey` FOREIGN KEY (`emp_no`) REFERENCES `Employee`(`emp_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeptEmp` ADD CONSTRAINT `DeptEmp_dept_no_fkey` FOREIGN KEY (`dept_no`) REFERENCES `Department`(`dept_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeptManager` ADD CONSTRAINT `DeptManager_emp_no_fkey` FOREIGN KEY (`emp_no`) REFERENCES `Employee`(`emp_no`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeptManager` ADD CONSTRAINT `DeptManager_dept_no_fkey` FOREIGN KEY (`dept_no`) REFERENCES `Department`(`dept_no`) ON DELETE RESTRICT ON UPDATE CASCADE;
