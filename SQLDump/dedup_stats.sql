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
-- Table structure for table `dedup_stats`
--

CREATE TABLE IF NOT EXISTS `dedup_stats` (
  `NODEID` int(11) DEFAULT NULL,
  `UNIQUE_BYTES` varchar(255) DEFAULT NULL,
  `FSID` varchar(255) DEFAULT NULL,
  `UNIQUE_COUNT` varchar(255) DEFAULT NULL,
  `LINKED_RECLAIMED_COUNT` varchar(255) DEFAULT NULL,
  `LINKED_RESIDENT_BYTES` varchar(255) DEFAULT NULL,
  `LINKED_RESIDENT_COUNT` varchar(255) DEFAULT NULL,
  `BASE_COUNT` varchar(255) DEFAULT NULL,
  `BASE_BYTES` varchar(255) DEFAULT NULL,
  `FSTYPE` varchar(255) DEFAULT NULL,
  `POOLID` varchar(255) DEFAULT NULL,
  `LINKED_RECLAIMED_BYTES` varchar(255) DEFAULT NULL,
  KEY `NODEID` (`NODEID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dedup_stats`
--

INSERT INTO `dedup_stats` (`NODEID`, `UNIQUE_BYTES`, `FSID`, `UNIQUE_COUNT`, `LINKED_RECLAIMED_COUNT`, `LINKED_RESIDENT_BYTES`, `LINKED_RESIDENT_COUNT`, `BASE_COUNT`, `BASE_BYTES`, `FSTYPE`, `POOLID`, `LINKED_RECLAIMED_BYTES`) VALUES
(1305, '288768', '1', '1', '0', '0', '0', '0', '0', '1', '32', '0'),
(1330, '70424', '1', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1403, '160212530718', '1', '272611', '0', '0', '0', '0', '0', '1', '42', '0'),
(1409, '107387296085', '1', '13', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1409, '154637707437', '1', '21', '0', '0', '0', '0', '0', '1', '42', '0'),
(1410, '47250411841', '1', '9', '0', '0', '0', '0', '0', '1', '42', '0'),
(1411, '9444875212', '1', '5', '0', '0', '0', '0', '0', '1', '42', '0'),
(1412, '4740840828', '1', '2146', '0', '0', '0', '0', '0', '1', '42', '0'),
(1413, '96790501990', '1', '252511', '0', '0', '0', '0', '0', '1', '42', '0'),
(1414, '95770859199', '1', '13', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1414, '150541441583', '1', '15116', '0', '0', '0', '0', '0', '1', '42', '0'),
(1416, '64432377914', '1', '8', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1416, '154637707437', '1', '21', '0', '0', '0', '0', '0', '1', '42', '0'),
(1282, '1732014', '2', '4876', '36680', '0', '0', '0', '0', '1', '6', '9338042846'),
(1283, '1732014', '2', '4876', '36680', '0', '0', '0', '0', '1', '6', '9338042846'),
(1284, '6193788', '2', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922946'),
(1305, '364', '2', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1305, '289792', '2', '1', '0', '0', '0', '0', '0', '1', '32', '0'),
(1313, '718', '2', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '569344', '2', '2', '0', '0', '0', '0', '0', '1', '31', '0'),
(1330, '204038204', '2', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1410, '424998853', '2', '665', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1410, '424998853', '2', '665', '0', '0', '0', '0', '0', '1', '42', '0'),
(1411, '4082345445', '2', '114421', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1411, '4082345445', '2', '114421', '0', '0', '0', '0', '0', '1', '42', '0'),
(1412, '53693648059', '2', '7', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1412, '53693648059', '2', '7', '0', '0', '0', '0', '0', '1', '42', '0'),
(1413, '424998853', '2', '665', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1413, '424998853', '2', '665', '0', '0', '0', '0', '0', '1', '42', '0'),
(15, '6178964', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922925'),
(17, '6178964', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922925'),
(19, '6178964', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922925'),
(20, '6178964', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922925'),
(21, '6178964', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922925'),
(22, '6193788', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922946'),
(23, '6193788', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922946'),
(26, '6193788', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922946'),
(27, '6193788', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922946'),
(28, '6193788', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922946'),
(29, '6193788', '3', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922946'),
(1228, '6161572175', '3', '80201', '0', '0', '0', '0', '0', '1', '-1000000', '0'),
(1228, '4284483', '3', '5960', '74240', '0', '0', '0', '0', '1', '6', '6157286970'),
(1234, '6209362679', '3', '80901', '0', '0', '0', '0', '0', '1', '-1000000', '0'),
(1234, '4585361', '3', '6402', '78458', '0', '0', '0', '0', '1', '6', '6586045524'),
(1282, '3344782929', '3', '18131', '0', '0', '0', '0', '0', '1', '4', '0'),
(1282, '13514653', '3', '23631', '70346', '0', '0', '0', '0', '1', '6', '4270427423'),
(1283, '10002215032', '3', '240158', '0', '0', '0', '0', '0', '1', '-1000000', '0'),
(1283, '2664036356', '3', '13787', '0', '0', '0', '0', '0', '1', '4', '0'),
(1283, '10014003384', '3', '262444', '72346', '0', '0', '0', '0', '1', '6', '4272320072'),
(1284, '228543', '3', '483', '17578', '0', '0', '0', '0', '1', '6', '4251926322'),
(1305, '364', '3', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1305, '289792', '3', '1', '0', '0', '0', '0', '0', '1', '32', '0'),
(1313, '3214', '3', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '623616', '3', '2', '0', '0', '0', '0', '0', '1', '31', '0'),
(1330, '83633884', '3', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1411, '100944059411', '3', '15', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1411, '100944059411', '3', '15', '0', '0', '0', '0', '0', '1', '42', '0'),
(1412, '30503495457', '3', '3', '0', '0', '0', '0', '0', '1', '42', '0'),
(1414, '4082345445', '3', '114421', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1414, '4082345445', '3', '114421', '0', '0', '0', '0', '0', '1', '42', '0'),
(1416, '424998853', '3', '665', '0', '0', '0', '0', '0', '1', '-9', '0'),
(1416, '424998853', '3', '665', '0', '0', '0', '0', '0', '1', '42', '0'),
(12, '6178964', '4', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922925'),
(14, '6178964', '4', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922925'),
(15, '9561631787', '4', '38473', '0', '0', '0', '0', '0', '1', '-1000000', '0'),
(15, '920845821', '4', '4489', '33984', '0', '0', '0', '0', '1', '6', '8640785966'),
(16, '6178964', '4', '14845', '14122', '0', '0', '0', '0', '1', '6', '226922925'),
(20, '4274583532', '4', '15033', '0', '0', '0', '0', '0', '1', '-1000000', '0'),
(20, '930314095', '4', '227', '0', '0', '0', '0', '0', '1', '4', '0'),
(20, '24451626', '4', '1434', '31639', '0', '0', '0', '0', '1', '6', '8519115912'),
(27, '229538', '4', '485', '17557', '0', '0', '0', '0', '1', '6', '4251432918'),
(28, '4710812556', '4', '16046', '0', '0', '0', '0', '0', '1', '-1000000', '0'),
(28, '23889896', '4', '1410', '32702', '0', '0', '0', '0', '1', '6', '8939569932'),
(29, '6547544243', '4', '24300', '0', '0', '0', '0', '0', '1', '-1000000', '0'),
(29, '1046230971', '4', '186', '0', '0', '0', '0', '0', '1', '4', '0'),
(29, '24245459', '4', '866', '23248', '0', '0', '0', '0', '1', '6', '5477067813'),
(1267, '1033321', '4', '2547', '2986', '0', '0', '0', '0', '1', '6', '226909379'),
(1305, '364', '4', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1305, '284672', '4', '1', '0', '0', '0', '0', '0', '1', '32', '0'),
(1313, '4604', '4', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '348160', '4', '1', '0', '0', '0', '0', '0', '1', '31', '0'),
(1330, '83632860', '4', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '591203', '4', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(15, '2347181139', '5', '1', '0', '0', '0', '0', '0', '1', '4', '0'),
(15, '742', '5', '2', '10688', '0', '0', '0', '0', '1', '6', '3353150367'),
(16, '9517756710', '5', '38404', '0', '0', '0', '0', '0', '1', '-1000000', '0'),
(16, '3409495062', '5', '13606', '24798', '0', '0', '0', '0', '1', '6', '6108261648'),
(19, '693070681', '5', '207', '0', '0', '0', '0', '0', '1', '4', '0'),
(19, '231036', '5', '489', '17541', '0', '0', '0', '0', '1', '6', '4250445630'),
(29, '2290400682', '5', '7370', '10882', '0', '0', '0', '0', '1', '6', '3409644945'),
(1305, '3149937', '5', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1305, '51902485504', '5', '1', '0', '0', '0', '0', '0', '1', '32', '0'),
(1331, '581890', '5', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(14, '1968404754', '6', '429', '0', '0', '0', '0', '0', '1', '4', '0'),
(14, '235834', '6', '499', '17718', '0', '0', '0', '0', '1', '6', '4320629034'),
(16, '1554266496', '6', '1', '0', '0', '0', '0', '0', '1', '4', '0'),
(16, '733', '6', '2', '12083', '0', '0', '0', '0', '1', '6', '3734225354'),
(17, '1554266496', '6', '1', '0', '0', '0', '0', '0', '1', '4', '0'),
(17, '739', '6', '2', '13279', '0', '0', '0', '0', '1', '6', '4145968213'),
(1305, '3300069', '6', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1305, '36859904', '6', '1', '0', '0', '0', '0', '0', '1', '32', '0'),
(1331, '581938', '6', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '630524', '7', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '581922', '8', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '359', '9', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '289792', '9', '1', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '656320', '9', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '583940', '10', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '718', '11', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '579584', '11', '2', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '92354', '11', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '718', '12', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '569344', '12', '2', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '583944', '12', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '588208', '13', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '583940', '14', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '583940', '15', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '359', '16', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '284672', '16', '1', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '583940', '16', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '583940', '17', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '23325', '18', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '11098112', '18', '2', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '583940', '18', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '583940', '19', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '573700', '20', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '6501', '21', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '84175872', '21', '2', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '573700', '21', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '573700', '22', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '15691', '23', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '204275712', '23', '1', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '573700', '23', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '345', '24', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '288768', '24', '1', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '573700', '24', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '573700', '25', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '491488', '26', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '42073939968', '26', '2', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '581892', '26', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '1889', '27', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '306176', '27', '1', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '11126355', '27', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '2838', '28', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '888832', '28', '2', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '100871', '28', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '303316', '29', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '40353724', '30', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '84196219', '31', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '2246', '32', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '591872', '32', '2', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '84200055', '32', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '204608039', '33', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '1403', '34', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '300032', '34', '1', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '581816', '34', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '3665879', '35', '1', '0', '0', '0', '0', '0', '1', '6', '0'),
(1313, '1724733440', '35', '1', '0', '0', '0', '0', '0', '1', '31', '0'),
(1331, '591077', '35', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '24373782', '36', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '581846', '37', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '581846', '39', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '581846', '40', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '581846', '41', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '615301', '42', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '581846', '43', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '581846', '44', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '1774187472', '45', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '1774187472', '46', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '1000472', '47', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '581846', '48', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '617516', '54', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '581846', '55', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '1729152601', '56', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '1728611686', '58', '2', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '597754', '59', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1331, '4783031', '62', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1321, '592601', '149', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1321, '17868204862', '150', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1321, '599962', '151', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1321, '291953', '152', '2', '0', '0', '0', '0', '0', '1', '-1', '0'),
(1321, '13176964', '152', '4', '0', '0', '0', '0', '0', '1', '6', '0'),
(1226, '4920996663', '4', '4513', '0', '0', '0', '0', '0', '2', '5', '0'),
(1226, '12894014392', '4', '107826', '802242', '151925760', '2016', '0', '0', '2', '6', '63753897760');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dedup_stats`
--
ALTER TABLE `dedup_stats`
  ADD CONSTRAINT `dedup_stats_ibfk_1` FOREIGN KEY (`NODEID`) REFERENCES `nodes` (`NODEID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
