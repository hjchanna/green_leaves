-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.12 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping data for table green_leaves.m_fertilizer_item: ~11 rows (approximately)
/*!40000 ALTER TABLE `m_fertilizer_item` DISABLE KEYS */;
INSERT INTO `m_fertilizer_item` (`index_no`, `item_no`, `name`, `branch`, `instalment_count`, `cost_price`, `sale_price`) VALUES
	(1, 1000, 'CIC U 709 (50Kg )', 1, 2, NULL, 2900.0000),
	(2, 1001, 'U 709 CIC (25Kg)', 1, 2, NULL, 1465.0000),
	(3, 1002, 'PERANOX', 1, 1, NULL, 400.0000),
	(4, 1002, 'CIC POWER T', 1, 1, NULL, 875.0000),
	(5, 1003, 'MICRO TEA', 1, 2, NULL, 800.0000),
	(6, 1004, 'CB TEA SP 1 CIC', 1, 2, NULL, 2850.0000),
	(7, 1005, 'AGSTAR U 709 (50Kg)', 1, 2, NULL, 2900.0000),
	(8, 1006, 'AGSTAR UT 1625 (50Kg)', 1, 2, NULL, 2950.0000),
	(9, 1007, 'AGASAT T 750 (50kg)', 1, 2, NULL, 1300.0000),
	(10, 1008, 'BAUR U 709  (50Kg)', 1, 2, NULL, 2900.0000),
	(11, 1009, 'LAKPOHORA U 709 (50Kg) ', 1, 2, NULL, 2900.0000);
/*!40000 ALTER TABLE `m_fertilizer_item` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
