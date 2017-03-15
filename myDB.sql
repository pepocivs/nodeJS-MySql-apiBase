/*
MySQL - 5.5.5-10.1.19-MariaDB : Database - myDB
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`myDB` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `myDB`;

/*Table structure for table `firstCallTable` */

DROP TABLE IF EXISTS `firstCallTable`;

CREATE TABLE `firstCallTable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(250) DEFAULT NULL,
  `slug` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `firstCallTable` */

LOCK TABLES `firstCallTable` WRITE;

insert  into `firstCallTable`(`id`,`value`,`slug`) values (1,'This is a test value 1','hello.world'),(2,'This is a test value 2','hello.world'),(3,'This is a test value 3','hello.world');

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
