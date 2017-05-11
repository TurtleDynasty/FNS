-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Host: helska.cefns.nau.edu
-- Generation Time: May 11, 2017 at 02:49 PM
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
-- Table structure for table `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `userID` varchar(15) NOT NULL,
  `timeIn` date NOT NULL,
  `timeOut` date NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`userID`, `timeIn`, `timeOut`) VALUES
('a', '0000-00-00', '0000-00-00'),
('Alejandro', '2015-11-09', '2015-11-09'),
('alex', '2015-11-13', '0000-00-00'),
('apple', '0000-00-00', '0000-00-00'),
('av638', '0000-00-00', '0000-00-00'),
('eh', '0000-00-00', '0000-00-00'),
('hi', '0000-00-00', '0000-00-00'),
('katy', '0000-00-00', '0000-00-00'),
('kup', '0000-00-00', '0000-00-00'),
('me', '0000-00-00', '0000-00-00'),
('ollo', '0000-00-00', '0000-00-00'),
('op', '0000-00-00', '0000-00-00'),
('p', '0000-00-00', '0000-00-00'),
('poop', '0000-00-00', '0000-00-00'),
('yes', '0000-00-00', '0000-00-00'),
('you', '2017-03-16', '0000-00-00'),
('yup', '0000-00-00', '0000-00-00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
