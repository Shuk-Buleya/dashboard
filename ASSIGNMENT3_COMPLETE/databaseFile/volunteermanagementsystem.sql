-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 06, 2023 at 09:24 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `volunteermanagementsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
CREATE TABLE IF NOT EXISTS `attendance` (
  `attendance_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) DEFAULT NULL,
  `volunteer_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `check_in` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `check_out` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `event_id` (`event_id`),
  KEY `volunteer_id` (`volunteer_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `event_id`, `volunteer_id`, `role_id`, `check_in`, `check_out`) VALUES
(1, 1, 1, 1, '2023-10-15 07:00:00', '2023-10-15 11:00:00'),
(2, 1, 2, 2, '2023-10-15 07:30:00', '2023-10-15 12:00:00'),
(4, 2, 4, 4, '2023-11-05 06:30:00', '2023-11-05 11:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `event_date` date NOT NULL,
  `venue` varchar(255) NOT NULL,
  `description` text,
  `total_volunteers` int(11) NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_name`, `event_date`, `venue`, `description`, `total_volunteers`) VALUES
(1, 'Charity Fundraiser Revision', '2023-10-14', 'Community Center 3', NULL, 14),
(2, 'Science Fair', '2023-11-05', 'High School Auditorium', 'Showcasing student science projects', 15),
(3, 'Food Drive', '2023-12-01', 'Local Grocery Store', 'Collecting food donations for the needy', 8),
(5, 'Picnic', '2023-11-25', 'Behind Ndirande', 'fundraising for needy students', 16),
(9, 'BIS BIT party', '2023-10-18', 'Manda A mbuzi', '', 18),
(10, 'last day party', '2023-10-28', 'OT', 'tikusekela', 21);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) DEFAULT NULL,
  `volunteer_id` int(11) DEFAULT NULL,
  `feedback_text` text,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `event_id` (`event_id`),
  KEY `volunteer_id` (`volunteer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(1, 'Registration Desk'),
(2, 'Event Setup'),
(3, 'Usher'),
(4, 'Food Service'),
(5, 'Parking Attendant'),
(6, 'Information Booth'),
(7, 'Cleanup Crew');

-- --------------------------------------------------------

--
-- Table structure for table `user_events`
--

DROP TABLE IF EXISTS `user_events`;
CREATE TABLE IF NOT EXISTS `user_events` (
  `event_id` int(11) DEFAULT NULL,
  `volunteer_id` int(11) DEFAULT NULL,
  KEY `event_id` (`event_id`),
  KEY `volunteer_id` (`volunteer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

DROP TABLE IF EXISTS `volunteer`;
CREATE TABLE IF NOT EXISTS `volunteer` (
  `volunteer_id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `sname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  PRIMARY KEY (`volunteer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `volunteer`
--

INSERT INTO `volunteer` (`volunteer_id`, `fname`, `sname`, `email`, `phone`) VALUES
(1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890'),
(2, 'Alice', 'Smith', 'alice.smith@example.com', '987-654-3210'),
(4, 'Emma', 'White', 'emma.white@example.com', '555-444-3333'),
(5, 'Michael', 'Brown', 'michael.brown@example.com', '999-888-7777'),
(6, 'Sarah', 'Lee', 'sarah.lee@example.com', '111-999-7777'),
(7, 'David', 'Miller', 'david.miller@example.com', '888-777-6666'),
(8, 'Linda', 'Wilson', 'linda.wilson@example.com', '333-222-1111'),
(9, 'James', 'Anderson', 'james.anderson@example.com', '222-333-4444'),
(10, 'Emily', 'Moore', 'emily.moore@example.com', '444-555-6666'),
(11, 'Daniel', 'Taylor', 'daniel.taylor@example.com', '666-555-4444'),
(12, 'Olivia', 'Johnson', 'olivia.johnson@example.com', '999-888-7777'),
(13, 'Ethan', 'Davis', 'ethan.davis@example.com', '333-222-1111'),
(14, 'Bentry', 'Chipandula', 'bentleychipandula123@gmail.com', '0881614047'),
(16, 'xako', 'xako', 'admin@admin.com', '0881614047'),
(17, 'xako', 'xako', 'admin@admin.com', '0881614047'),
(18, 'xako', 'xako', 'admin@admin.com', '0881614047'),
(19, 'xako', 'xako', 'admin@admin.com', '0881614047'),
(22, 'Example', 'ONE', 'bentleychipandula123@gmail.com', '0881614047'),
(25, 'Shukuran', 'Buleya', 'example@exampe.com', '0881614760'),
(26, 'Grace', 'Gausi', 'bis20-ggausi@poly.ac.mw', '098765567'),
(27, 'zakiya', 'buleya', 'shukuranbuleya@gmail.com', '09273562727'),
(28, 'Sandile', 'Nyalugwe', 'emmanuelnyalugwe19@outlook.com', '+265888999000'),
(29, 'fali', 'time', 'shukuranbuleya@gmail.com', '987655322');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  ADD CONSTRAINT `attendance_ibfk_4` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer` (`volunteer_id`) ON DELETE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer` (`volunteer_id`);

--
-- Constraints for table `user_events`
--
ALTER TABLE `user_events`
  ADD CONSTRAINT `user_events_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  ADD CONSTRAINT `user_events_ibfk_2` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer` (`volunteer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
