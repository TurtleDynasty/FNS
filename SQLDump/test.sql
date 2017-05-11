-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Host: helska.cefns.nau.edu
-- Generation Time: May 11, 2017 at 01:34 PM
-- Server version: 1.0.12
-- PHP Version: 5.3.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `capstone_datavis`
--

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `letter` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`letter`, `frequency`) VALUES
('A', '.08167'),
('A', '.08167'),
('B', '.01492'),
('C', '.02782'),
('D', '.04253'),
('E', '.12702'),
('F', '.02288'),
('G', '.02015'),
('H', '.06094'),
('I', '.06966'),
('J', '.00153'),
('K', '.00772'),
('L', '.04025'),
('M', '.02406'),
('N', '.06749'),
('O', '.07507'),
('P', '.01929'),
('Q', '.00095'),
('R', '.05987'),
('S', '.06327'),
('T', '.09056'),
('U', '.02758'),
('V', '.00978'),
('W', '.02360'),
('X', '.00150'),
('Y', '.01974'),
('Z', '.00074');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
