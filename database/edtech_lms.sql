-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2025 at 02:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edtech_lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `bannerimage` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `title`, `description`, `bannerimage`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Edtech Innovate', '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit.&nbsp;</p>', 'banners/Cm2xwnx1fHwzEQ2LDPnEvrZlPYSxeO0abL8pfc2C.png', 1, '2025-07-26 01:07:24', '2025-07-26 01:07:26');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `author_image` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `faq` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`faq`)),
  `blog_category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `name`, `status`, `author_image`, `image`, `author_name`, `content`, `faq`, `blog_category_id`, `created_at`, `updated_at`, `slug`, `short_description`) VALUES
(1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?', 1, 'blogs/author/znD6TFgx0bsjQWvNsPrTx8fTlonCzBprhLszLc6p.jpg', 'blogs/dOXff56oSvqp4eWsExikuhtHAdV4NRuMS4nEFEhl.jpg', 'Deepak Singh Rawat', '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br></p>\r\n<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p>', '\"[{\\\"question\\\":\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\",\\\"answer\\\":\\\"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br><br><br><\\\\\\/p>\\\"},{\\\"question\\\":\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\",\\\"answer\\\":\\\"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br><br><br><\\\\\\/p>\\\"},{\\\"question\\\":\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\",\\\"answer\\\":\\\"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br><br><br><br><br><br><br><\\\\\\/p>\\\"}]\"', 1, '2025-07-26 01:19:21', '2025-07-26 01:19:21', 'lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-rerum-provident-unde-et', '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. R<br><br><br></p>');

-- --------------------------------------------------------

--
-- Table structure for table `blog_categories`
--

CREATE TABLE `blog_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_categories`
--

INSERT INTO `blog_categories` (`id`, `name`, `status`, `created_at`, `updated_at`, `slug`) VALUES
(1, 'IT', 1, '2025-07-26 01:16:39', '2025-07-26 01:16:39', 'it');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:62:{i:0;a:4:{s:1:\"a\";i:70;s:1:\"b\";s:19:\"view role permision\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:1;a:4:{s:1:\"a\";i:71;s:1:\"b\";s:14:\"view permision\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:2;a:4:{s:1:\"a\";i:72;s:1:\"b\";s:9:\"view role\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:3;a:4:{s:1:\"a\";i:73;s:1:\"b\";s:9:\"view user\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:4;a:4:{s:1:\"a\";i:74;s:1:\"b\";s:8:\"view web\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:5;a:4:{s:1:\"a\";i:75;s:1:\"b\";s:19:\"view home component\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:6;a:4:{s:1:\"a\";i:76;s:1:\"b\";s:11:\"view banner\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:7;a:4:{s:1:\"a\";i:77;s:1:\"b\";s:13:\"create banner\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:8;a:4:{s:1:\"a\";i:78;s:1:\"b\";s:11:\"edit banner\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:9;a:4:{s:1:\"a\";i:79;s:1:\"b\";s:13:\"delete banner\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:10;a:4:{s:1:\"a\";i:80;s:1:\"b\";s:13:\"view feedback\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:11;a:4:{s:1:\"a\";i:81;s:1:\"b\";s:15:\"create feedback\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:12;a:4:{s:1:\"a\";i:82;s:1:\"b\";s:13:\"edit feedback\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:13;a:4:{s:1:\"a\";i:83;s:1:\"b\";s:15:\"delete feedback\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:14;a:4:{s:1:\"a\";i:84;s:1:\"b\";s:23:\"view university partner\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:15;a:4:{s:1:\"a\";i:85;s:1:\"b\";s:25:\"create university partner\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:16;a:4:{s:1:\"a\";i:86;s:1:\"b\";s:23:\"edit university partner\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:17;a:4:{s:1:\"a\";i:87;s:1:\"b\";s:25:\"delete university partner\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:18;a:4:{s:1:\"a\";i:88;s:1:\"b\";s:10:\"view offer\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:19;a:4:{s:1:\"a\";i:89;s:1:\"b\";s:12:\"create offer\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:20;a:4:{s:1:\"a\";i:90;s:1:\"b\";s:10:\"edit offer\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:21;a:4:{s:1:\"a\";i:91;s:1:\"b\";s:12:\"delete offer\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:22;a:4:{s:1:\"a\";i:92;s:1:\"b\";s:17:\"view course plans\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:23;a:4:{s:1:\"a\";i:93;s:1:\"b\";s:19:\"create course plans\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:24;a:4:{s:1:\"a\";i:94;s:1:\"b\";s:17:\"edit course plans\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:25;a:4:{s:1:\"a\";i:95;s:1:\"b\";s:19:\"delete course plans\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:26;a:4:{s:1:\"a\";i:96;s:1:\"b\";s:15:\"view department\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:27;a:4:{s:1:\"a\";i:97;s:1:\"b\";s:17:\"create department\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:28;a:4:{s:1:\"a\";i:98;s:1:\"b\";s:15:\"edit department\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:29;a:4:{s:1:\"a\";i:99;s:1:\"b\";s:17:\"delete department\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:30;a:4:{s:1:\"a\";i:100;s:1:\"b\";s:12:\"view program\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:31;a:4:{s:1:\"a\";i:101;s:1:\"b\";s:14:\"create program\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:32;a:4:{s:1:\"a\";i:102;s:1:\"b\";s:12:\"edit program\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:33;a:4:{s:1:\"a\";i:103;s:1:\"b\";s:14:\"delete program\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:34;a:4:{s:1:\"a\";i:104;s:1:\"b\";s:11:\"view course\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:35;a:4:{s:1:\"a\";i:105;s:1:\"b\";s:13:\"create course\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:36;a:4:{s:1:\"a\";i:106;s:1:\"b\";s:11:\"edit course\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:37;a:4:{s:1:\"a\";i:107;s:1:\"b\";s:13:\"delete course\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:38;a:4:{s:1:\"a\";i:108;s:1:\"b\";s:9:\"view unit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:39;a:4:{s:1:\"a\";i:109;s:1:\"b\";s:11:\"create unit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:40;a:4:{s:1:\"a\";i:110;s:1:\"b\";s:9:\"edit unit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:41;a:4:{s:1:\"a\";i:111;s:1:\"b\";s:11:\"delete unit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:42;a:4:{s:1:\"a\";i:112;s:1:\"b\";s:11:\"view topics\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:43;a:4:{s:1:\"a\";i:113;s:1:\"b\";s:13:\"create topics\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:44;a:4:{s:1:\"a\";i:114;s:1:\"b\";s:11:\"edit topics\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:45;a:4:{s:1:\"a\";i:115;s:1:\"b\";s:13:\"delete topics\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:46;a:4:{s:1:\"a\";i:116;s:1:\"b\";s:17:\"view course video\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:47;a:4:{s:1:\"a\";i:117;s:1:\"b\";s:19:\"create course video\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:48;a:4:{s:1:\"a\";i:118;s:1:\"b\";s:17:\"edit course video\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:49;a:4:{s:1:\"a\";i:119;s:1:\"b\";s:19:\"delete course video\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:50;a:4:{s:1:\"a\";i:120;s:1:\"b\";s:17:\"view blogs module\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:51;a:4:{s:1:\"a\";i:121;s:1:\"b\";s:19:\"view blogs category\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:52;a:4:{s:1:\"a\";i:122;s:1:\"b\";s:21:\"create blogs category\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:53;a:4:{s:1:\"a\";i:123;s:1:\"b\";s:19:\"edit blogs category\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:54;a:4:{s:1:\"a\";i:124;s:1:\"b\";s:21:\"delete blogs category\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:55;a:4:{s:1:\"a\";i:125;s:1:\"b\";s:10:\"view blogs\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:56;a:4:{s:1:\"a\";i:126;s:1:\"b\";s:12:\"create blogs\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:57;a:4:{s:1:\"a\";i:127;s:1:\"b\";s:10:\"edit blogs\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:58;a:4:{s:1:\"a\";i:128;s:1:\"b\";s:12:\"delete blogs\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:59;a:4:{s:1:\"a\";i:129;s:1:\"b\";s:9:\"view lead\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:60;a:4:{s:1:\"a\";i:130;s:1:\"b\";s:13:\"view-pdf lead\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:61;a:4:{s:1:\"a\";i:131;s:1:\"b\";s:15:\"view-excel lead\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}}s:5:\"roles\";a:1:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:5:\"admin\";s:1:\"c\";s:3:\"web\";}}}', 1753612930),
('laravel_cache_superadmins@example.com|127.0.0.1', 'i:1;', 1753337826),
('laravel_cache_superadmins@example.com|127.0.0.1:timer', 'i:1753337825;', 1753337825);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `department_id` bigint(20) UNSIGNED NOT NULL,
  `program_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `short_description` text NOT NULL,
  `content` longtext NOT NULL,
  `modes` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `rating` double NOT NULL,
  `price` double NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `is_subject` tinyint(1) NOT NULL DEFAULT 0,
  `course_keys` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`course_keys`)),
  `faqs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`faqs`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `department_id`, `program_id`, `name`, `image`, `short_description`, `content`, `modes`, `duration`, `rating`, `price`, `status`, `is_subject`, `course_keys`, `faqs`, `created_at`, `updated_at`, `slug`) VALUES
(1, 3, 3, 'Excel', 'courses/HwYLf0PNQ0aIaGPqinLTLc8OYQcfu9wudvAoK4vd.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?', '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br><br><br><br><br><br><br><br><br></p>', 'month', '6', 4, 1200, 1, 1, '\"[\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\",\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\",\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\",\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\"]\"', '\"[{\\\"question\\\":\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\",\\\"answer\\\":\\\"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br><\\\\\\/p>\\\"},{\\\"question\\\":\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\",\\\"answer\\\":\\\"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br><br><br><br><\\\\\\/p>\\\"},{\\\"question\\\":\\\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\\\",\\\"answer\\\":\\\"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br><br><br><\\\\\\/p>\\\"}]\"', '2025-07-26 01:14:03', '2025-07-26 01:14:06', 'excel');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(3, 'IT', 1, '2025-07-26 01:11:54', '2025-07-26 01:12:00');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `name`, `title`, `description`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'ashdashdi', 'jcsdjcod', 'asojasc', 'feedback/5RNjWVBpFiiIqRLDLmCgDMo6FsQ4cppmkpbYOqNg.jpg', 1, '2025-05-07 06:23:35', '2025-07-26 01:21:29'),
(2, 'test1', 'Lorem ipsum dolor sit amet consectetur a', '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit.&nbsp;<br><br><br><br></p>', 'feedback/4y6xCRHQb7MHbXP42A0hZm8VAfVoRDpvOAHhPMzX.jpg', 1, '2025-07-26 01:22:20', '2025-07-26 01:22:23');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `name`, `email`, `phone`, `created_at`, `updated_at`) VALUES
(1, 'test', 'test@gmail.com', '09292199221', '2025-07-26 01:20:36', '2025-07-26 01:20:36');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_05_01_084117_create_permission_tables', 1),
(5, '2025_05_05_054331_create_banners_table', 1),
(6, '2025_05_05_073522_create_feedbacks_table', 1),
(7, '2025_05_05_112952_create_university_partners_table', 1),
(8, '2025_05_06_123937_create_weoffers_table', 1),
(16, '2025_05_06_160411_create_departments_table', 2),
(17, '2025_05_07_064739_create_programs_table', 2),
(18, '2025_05_07_101844_create_courses_table', 2),
(19, '2025_05_07_101845_create_units_table', 3),
(20, '2025_05_15_083704_create_blog_categories_table', 3),
(21, '2025_05_15_124921_create_blogs_table', 3),
(22, '2025_05_17_113737_create_rich_texts_table', 3),
(23, '2025_05_20_073717_create_topics_table', 3),
(24, '2025_05_22_115905_move_create_videos_table', 3),
(25, '2025_05_22_120338_create_videos_table', 3),
(26, '2025_05_24_092555_create_plans_table', 3),
(27, '2025_05_24_105333_create_web_plans_table', 3),
(28, '2025_05_26_071416_add_slug_to_blogs_table', 3),
(29, '2025_05_26_080000_add_slug_to_blog_categories_table', 3),
(30, '2025_05_27_114208_add_slug_to_courses_table', 3),
(31, '2025_05_30_050847_add_short_description_to_blogs_table', 3),
(32, '2025_05_30_064338_create_leads_table', 3),
(33, '2025_07_25_111758_add_status_to_users_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(70, 'view role permision', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(71, 'view permision', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(72, 'view role', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(73, 'view user', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(74, 'view web', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(75, 'view home component', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(76, 'view banner', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(77, 'create banner', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(78, 'edit banner', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(79, 'delete banner', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(80, 'view feedback', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(81, 'create feedback', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(82, 'edit feedback', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(83, 'delete feedback', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(84, 'view university partner', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(85, 'create university partner', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(86, 'edit university partner', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(87, 'delete university partner', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(88, 'view offer', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(89, 'create offer', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(90, 'edit offer', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(91, 'delete offer', 'web', '2025-07-26 04:57:26', '2025-07-26 04:57:26'),
(92, 'view course plans', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(93, 'create course plans', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(94, 'edit course plans', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(95, 'delete course plans', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(96, 'view department', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(97, 'create department', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(98, 'edit department', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(99, 'delete department', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(100, 'view program', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(101, 'create program', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(102, 'edit program', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(103, 'delete program', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(104, 'view course', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(105, 'create course', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(106, 'edit course', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(107, 'delete course', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(108, 'view unit', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(109, 'create unit', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(110, 'edit unit', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(111, 'delete unit', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(112, 'view topics', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(113, 'create topics', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(114, 'edit topics', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(115, 'delete topics', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(116, 'view course video', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(117, 'create course video', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(118, 'edit course video', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(119, 'delete course video', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(120, 'view blogs module', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(121, 'view blogs category', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(122, 'create blogs category', 'web', '2025-07-26 04:57:27', '2025-07-26 04:57:27'),
(123, 'edit blogs category', 'web', '2025-07-26 04:57:28', '2025-07-26 04:57:28'),
(124, 'delete blogs category', 'web', '2025-07-26 04:57:28', '2025-07-26 04:57:28'),
(125, 'view blogs', 'web', '2025-07-26 04:57:28', '2025-07-26 04:57:28'),
(126, 'create blogs', 'web', '2025-07-26 04:57:28', '2025-07-26 04:57:28'),
(127, 'edit blogs', 'web', '2025-07-26 04:57:28', '2025-07-26 04:57:28'),
(128, 'delete blogs', 'web', '2025-07-26 04:57:28', '2025-07-26 04:57:28'),
(129, 'view lead', 'web', '2025-07-26 04:57:28', '2025-07-26 04:57:28'),
(130, 'view-pdf lead', 'web', '2025-07-26 05:12:07', '2025-07-26 05:12:07'),
(131, 'view-excel lead', 'web', '2025-07-26 05:12:07', '2025-07-26 05:12:07');

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `frequency` varchar(255) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `disabled_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`disabled_features`)),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `department_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `name`, `status`, `department_id`, `created_at`, `updated_at`) VALUES
(3, 'ms office', 1, 3, '2025-07-26 01:12:22', '2025-07-26 01:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `rich_texts`
--

CREATE TABLE `rich_texts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `record_type` varchar(255) NOT NULL,
  `record_id` bigint(20) UNSIGNED NOT NULL,
  `field` varchar(255) NOT NULL,
  `body` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-05-07 01:29:06', '2025-05-07 01:29:06'),
(2, 'mentor', 'web', '2025-05-07 01:29:06', '2025-05-07 01:29:06'),
(3, 'student', 'web', '2025-05-07 01:29:06', '2025-05-07 01:29:06');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(70, 1),
(71, 1),
(72, 1),
(73, 1),
(74, 1),
(75, 1),
(76, 1),
(77, 1),
(78, 1),
(79, 1),
(80, 1),
(81, 1),
(82, 1),
(83, 1),
(84, 1),
(85, 1),
(86, 1),
(87, 1),
(88, 1),
(89, 1),
(90, 1),
(91, 1),
(92, 1),
(93, 1),
(94, 1),
(95, 1),
(96, 1),
(97, 1),
(98, 1),
(99, 1),
(100, 1),
(101, 1),
(102, 1),
(103, 1),
(104, 1),
(105, 1),
(106, 1),
(107, 1),
(108, 1),
(109, 1),
(110, 1),
(111, 1),
(112, 1),
(113, 1),
(114, 1),
(115, 1),
(116, 1),
(117, 1),
(118, 1),
(119, 1),
(120, 1),
(121, 1),
(122, 1),
(123, 1),
(124, 1),
(125, 1),
(126, 1),
(127, 1),
(128, 1),
(129, 1),
(130, 1),
(131, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('xiOcLU764B8CKlvT4QKNhD1Z0LzuviN4ceGumLKk', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiZUNDN1d1bHhTMnFpa2NTalFINTlRVGFOTnJBdk5EQjJMd2hCdHZPViI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvdXNlcnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1753531761);

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `unit_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `unit_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?', 1, '2025-07-26 01:15:05', '2025-07-26 01:15:05'),
(2, 2, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?', 1, '2025-07-26 01:15:12', '2025-07-26 01:15:12');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `course_id`, `title`, `description`, `order`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Lorem ipsum dolor sit amet consectetur', NULL, 1, 1, '2025-07-26 01:14:40', '2025-07-26 01:14:40'),
(2, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?', NULL, 2, 1, '2025-07-26 01:14:50', '2025-07-26 01:14:50');

-- --------------------------------------------------------

--
-- Table structure for table `university_partners`
--

CREATE TABLE `university_partners` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `university_partners`
--

INSERT INTO `university_partners` (`id`, `name`, `image`, `link`, `status`, `created_at`, `updated_at`) VALUES
(1, 'subharti university', 'university_partner/j2qIywyQ4sRpyfZd62xOQoOodnn4B3A7wL4hO1qt.jpg', NULL, 1, '2025-07-26 01:22:55', '2025-07-26 01:22:57'),
(2, 'glocal', 'university_partner/wuUJsa6CdsjSrtSLcyxIw3d03FJXzFzmquSBqJuW.png', NULL, 1, '2025-07-26 01:23:13', '2025-07-26 01:23:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Admin User', 'admin@example.com', NULL, '$2y$12$gAf1JrBeSTSyEDl8CoW9U.F.WyLBa1M/NqF0Pu4Lt2yebTSK4MkE.', NULL, '2025-05-07 01:29:15', '2025-07-25 05:55:40', 1),
(2, 'Mentor User', 'mentor@example.com', NULL, '$2y$12$kG6O81PO.VXXG/36bURJFezGrWTe1T9QB3e.G/bEhHK2IbMwxajFC', NULL, '2025-05-07 01:29:15', '2025-05-07 01:29:15', 1),
(3, 'Student User', 'student@example.com', NULL, '$2y$12$LN2AMLk24QljiOWAFHMtguhUwyJ1t16wbORPPShIbaPlYcP3adyHW', NULL, '2025-05-07 01:29:15', '2025-05-07 01:29:15', 1),
(7, 'test1', 'test1@gmail.com', NULL, '$2y$12$1rHVclkCKiQf07ZdEStd1ec2eQ3n8IxKsQwDqaDkdzDtcM4940TqS', NULL, '2025-07-25 04:30:02', '2025-07-25 04:30:02', 1),
(8, 'test2', 'test2@gmail.com', NULL, '$2y$12$/XQqGcB7jeRtTjm7W6kurOLYUpOQZ1TJItyqnmk7SORnIYcIkNJSK', NULL, '2025-07-25 04:30:28', '2025-07-25 04:30:28', 1),
(9, 'test3', 'test@gmail.com', NULL, '$2y$12$fjoVdjoZS22Taavj.5tVoeMUgw5IpCTACWT3e45ViRBlWR8NpIK5e', NULL, '2025-07-25 04:30:49', '2025-07-25 04:30:49', 1);

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED DEFAULT NULL,
  `unit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `topic_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `video_type` enum('local','embed') NOT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  `embed_url` varchar(255) DEFAULT NULL,
  `duration` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `course_id`, `unit_id`, `topic_id`, `name`, `video_type`, `video_path`, `embed_url`, `duration`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?', 'local', 'videos/1753512347_3195394-uhd_3840_2160_25fps.mp4', NULL, '00:13', 1, '2025-07-26 01:15:47', '2025-07-26 01:15:47');

-- --------------------------------------------------------

--
-- Table structure for table `web_plans`
--

CREATE TABLE `web_plans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `frequency` varchar(255) NOT NULL,
  `features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features`)),
  `disabled_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`disabled_features`)),
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `web_plans`
--

INSERT INTO `web_plans` (`id`, `title`, `price`, `frequency`, `features`, `disabled_features`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Standard', 20.00, 'monthly', '[\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\"]', '[\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\"]', 1, '2025-07-26 01:25:52', '2025-07-26 01:25:52'),
(2, 'Premium', 40.00, 'yearly', '[\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\"]', '[\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\"]', 1, '2025-07-26 01:26:27', '2025-07-26 01:26:27'),
(3, 'Premium Pro', 80.00, 'yearly', '[\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\",\"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?\"]', '[]', 1, '2025-07-26 01:26:56', '2025-07-26 01:26:56');

-- --------------------------------------------------------

--
-- Table structure for table `weoffers`
--

CREATE TABLE `weoffers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `link` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `weoffers`
--

INSERT INTO `weoffers` (`id`, `title`, `description`, `status`, `link`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?', '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit.<br><br><br><br></p>', 1, NULL, 'weoffer/llWNjeZw9Nn8hmeI5mnhBKxv8y4edN8WXfopx2vA.jpg', '2025-07-26 01:24:13', '2025-07-26 01:24:16'),
(2, 'Lorem ipsum dolor sit amet consectetur adip', '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum provident unde et?<br><br></p>', 1, NULL, 'weoffer/rbKri1XzdB36WS3OCGuBWVb7sh5jiPZq3JM9tK9Z.jpg', '2025-07-26 01:24:47', '2025-07-26 01:24:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blogs_blog_category_id_foreign` (`blog_category_id`);

--
-- Indexes for table `blog_categories`
--
ALTER TABLE `blog_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses_department_id_foreign` (`department_id`),
  ADD KEY `courses_program_id_foreign` (`program_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `leads_email_unique` (`email`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `programs_department_id_foreign` (`department_id`);

--
-- Indexes for table `rich_texts`
--
ALTER TABLE `rich_texts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rich_texts_field_record_type_record_id_unique` (`field`,`record_type`,`record_id`),
  ADD KEY `rich_texts_record_type_record_id_index` (`record_type`,`record_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topics_unit_id_foreign` (`unit_id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD KEY `units_course_id_foreign` (`course_id`);

--
-- Indexes for table `university_partners`
--
ALTER TABLE `university_partners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_course_id_foreign` (`course_id`),
  ADD KEY `videos_unit_id_foreign` (`unit_id`),
  ADD KEY `videos_topic_id_foreign` (`topic_id`);

--
-- Indexes for table `web_plans`
--
ALTER TABLE `web_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weoffers`
--
ALTER TABLE `weoffers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blog_categories`
--
ALTER TABLE `blog_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rich_texts`
--
ALTER TABLE `rich_texts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `university_partners`
--
ALTER TABLE `university_partners`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `web_plans`
--
ALTER TABLE `web_plans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `weoffers`
--
ALTER TABLE `weoffers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_blog_category_id_foreign` FOREIGN KEY (`blog_category_id`) REFERENCES `blog_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `courses_program_id_foreign` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `topics_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `units`
--
ALTER TABLE `units`
  ADD CONSTRAINT `units_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `videos_topic_id_foreign` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `videos_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
