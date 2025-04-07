-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for gg
CREATE DATABASE IF NOT EXISTS `gg` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `gg`;

-- Dumping structure for table gg.pg_owners
CREATE TABLE IF NOT EXISTS `pg_owners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(15) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table gg.pg_owners: ~3 rows (approximately)
INSERT INTO `pg_owners` (`id`, `name`, `email`, `password`, `phone`, `address`, `state`, `city`, `pincode`, `created_at`) VALUES
	(6, 'karan rawat', 'karan13@gmail.com', 'K@aran123', '9312293823', '272, jh', 1, 3, 433434, '2025-04-05 07:13:56'),
	(30, 'karan', 'joker@gmail.com', 'K@aran123', '93122938', '272, jh', 1, 3, 433434, '2025-04-07 06:05:03'),
	(32, 'karan', '123@gmail.com', 'K@aran123', '9312293823', '272, jh', 1, 3, 433434, '2025-04-07 06:08:33');

-- Dumping structure for table gg.pg_properties
CREATE TABLE IF NOT EXISTS `pg_properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `location` text DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `city` int(11) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `total_rooms` int(11) DEFAULT NULL,
  `status` enum('Active','Under Maintenance','Closed') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `pg_properties_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `pg_owners` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table gg.pg_properties: ~1 rows (approximately)
INSERT INTO `pg_properties` (`id`, `owner_id`, `name`, `location`, `state`, `city`, `pincode`, `total_rooms`, `status`, `created_at`) VALUES
	(6, 6, 'sn', 'sector 69', 1, 2, 201014, 200, 'Active', '2025-04-07 08:25:14');

-- Dumping structure for table gg.rent_transactions
CREATE TABLE IF NOT EXISTS `rent_transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) DEFAULT NULL,
  `pg_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_method` enum('UPI','Bank Transfer','Card','Wallet','Cash') DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `status` enum('Success','Pending','Failed') DEFAULT 'Pending',
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `rent_transactions_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table gg.rent_transactions: ~0 rows (approximately)

-- Dumping structure for table gg.rooms
CREATE TABLE IF NOT EXISTS `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `property_id` int(11) DEFAULT NULL,
  `room_number` varchar(10) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `status` enum('Available','Occupied','Under Maintenance') DEFAULT 'Available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `unique_room_per_property` (`property_id`,`room_number`),
  KEY `property_id` (`property_id`) USING BTREE,
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `pg_properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table gg.rooms: ~1 rows (approximately)
INSERT INTO `rooms` (`id`, `property_id`, `room_number`, `type`, `status`, `created_at`) VALUES
	(14, 6, '101', 2, 'Occupied', '2025-04-07 09:32:32');

-- Dumping structure for table gg.super_admin
CREATE TABLE IF NOT EXISTS `super_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table gg.super_admin: ~1 rows (approximately)
INSERT INTO `super_admin` (`id`, `name`, `email`, `password`, `phone`, `created_at`) VALUES
	(1, 'karan', 'karan@gmail.com', 'karan123', '8368145192', '2025-04-05 05:59:07');

-- Dumping structure for table gg.tenants
CREATE TABLE IF NOT EXISTS `tenants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pg_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `aadhar` varchar(100) DEFAULT NULL,
  `pan` varchar(100) DEFAULT NULL,
  `parent_contact` varchar(10) DEFAULT NULL,
  `emergency_contact` varchar(10) DEFAULT NULL,
  `move_in_date` date DEFAULT NULL,
  `rent_due_date` date DEFAULT NULL,
  `profile_photo` varchar(100) DEFAULT NULL,
  `rent_status` enum('Paid','Pending') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  KEY `pg_id` (`pg_id`),
  KEY `room_id` (`room_id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `tenants_ibfk_1` FOREIGN KEY (`pg_id`) REFERENCES `pg_properties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tenants_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tenants_ibfk_3` FOREIGN KEY (`owner_id`) REFERENCES `pg_owners` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table gg.tenants: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
