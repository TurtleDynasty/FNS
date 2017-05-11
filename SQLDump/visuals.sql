-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Host: helska.cefns.nau.edu
-- Generation Time: May 11, 2017 at 01:33 PM
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
-- Table structure for table `visuals`
--

CREATE TABLE IF NOT EXISTS `visuals` (
  `VisualID` tinyint(4) NOT NULL AUTO_INCREMENT,
  `VisualName` varchar(50) NOT NULL,
  `VisualType` varchar(50) DEFAULT NULL,
  `VisualFunction` varchar(30) DEFAULT NULL,
  `VisualDescription` varchar(500) DEFAULT NULL,
  `VisualThumbnail` varchar(50) DEFAULT NULL,
  `VisualBaseQuery` varchar(500) DEFAULT NULL,
  `BaseLastCached` datetime DEFAULT NULL,
  `VisualActiveFlag` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`VisualID`),
  UNIQUE KEY `VisualName` (`VisualName`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `visuals`
--

INSERT INTO `visuals` (`VisualID`, `VisualName`, `VisualType`, `VisualFunction`, `VisualDescription`, `VisualThumbnail`, `VisualBaseQuery`, `BaseLastCached`, `VisualActiveFlag`) VALUES
(1, 'Objects Replicated by Node', 'bargraph', 'init_replicated_objects', 'Replicated Objects: The total amount of objects being replicated in a single node that is currently in use.', 'bargraph.png', 'SELECT `nodes`.`NODENAME` AS nodeName, COUNT(`replicated_objects`.`NODEID`) AS replCount FROM `replicated_objects` INNER JOIN `nodes` ON `replicated_objects`.`NODEID` = `nodes`.`NODEID` GROUP BY `replicated_objects`.`NODEID`', NULL, 1),
(2, 'Objects Deduplicated by Backup', 'bargraph', 'init_backup_test', 'Deduplication Backups: The total amount of deduplication objects being backed up on currently active nodes.', 'bargraph.png', 'SELECT `nodes`.`NODENAME` AS letter, SUM(`dedup_stats`.`UNIQUE_BYTES`/1000000) AS frequency FROM `dedup_stats` INNER JOIN `nodes` ON `dedup_stats`.`NODEID` = `nodes`.`NODEID` WHERE UNIQUE_BYTES NOT LIKE '''' GROUP BY `dedup_stats`.`NODEID` ORDER BY `dedup_stats`.`NODEID', NULL, 1),
(3, 'Object Count by Storage Pool', 'piechart', 'init_pie_test', 'Storage Pool Objects: The total amount of objects in each storage pool that is currently in use.', 'piechart.png', 'SELECT `STGPOOL_NAME` AS name, SUM(`OBJECT_COUNT`) AS count FROM `containers` WHERE OBJECT_COUNT NOT LIKE '''' GROUP BY `STGPOOL_NAME`', NULL, 1),
(4, 'Storage Pool Space', 'bargraph', 'init_pool_test', 'Storage Pool Space: The current size of each storage pool that is currently in use.', 'bargraph.png', 'SELECT STGPOOL_NAME AS letter, TOTAL_SPACE_MB AS frequency FROM `stgpools` WHERE TOTAL_SPACE_MB > 0 GROUP BY STGPOOL_NAME ORDER BY `stgpools`.`STGPOOL_NAME`', NULL, 1),
(5, 'Object References by Container', 'heatmap', 'init_heatmap', 'Container References: The current number of references in each container that is currently in use.', 'heatmap.png', 'SELECT `CNTRID` AS id, SUM(`REFCOUNT`) AS value FROM `sd_chunk_locations` WHERE `REFCOUNT` NOT LIKE '''' GROUP BY `CNTRID`', NULL, 1),
(6, 'Scatter Plot Test', 'scatterplot', 'init_scatter_test', 'Scatter Test: This is the Scatter Plot Test description.', 'scatter.png', NULL, NULL, 1),
(7, 'File Occupancy by Storage Pool', 'bargraph', 'init_occupancy_test', 'File Occupancy: The number of files in each storage pool that is currently in use.', 'bargraph.png', 'SELECT NODE_NAME AS nodeName, SUM(NUM_FILES) AS numFiles FROM `occupancy` GROUP BY NODE_NAME', NULL, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
