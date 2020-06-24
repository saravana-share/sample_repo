-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 13, 2020 at 04:11 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.1.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pofi_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `status` varchar(191) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL DEFAULT '0',
  `created_by` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `from_date`, `to_date`, `status`, `price`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Event1', '2020-06-02', '2020-06-03', 'Booked', '0', 1, '2020-06-13 10:31:46', '2020-06-13 07:41:08'),
(2, 'Event2', '2020-06-10', '2020-06-12', 'Blocked', '0', 1, '2020-06-13 10:31:46', '2020-06-13 05:38:01'),
(3, 'Event2', '2020-06-19', '2020-06-20', 'Blocked', '0', 1, '2020-06-13 10:31:46', '2020-06-13 05:38:01'),
(4, 'sample', '2020-05-16', '2020-05-17', 'Book', '500', 1, '2020-06-13 08:18:25', '2020-06-13 13:50:32'),
(5, 'test', '2020-05-23', '2020-05-24', 'Block', '1234', 1, '2020-06-13 08:19:32', '2020-06-13 13:50:38'),
(6, 'ddd', '2020-06-24', '2020-06-24', 'Book', '568', 1, '2020-06-13 08:30:23', '2020-06-13 08:30:23'),
(7, 'dddd', '2020-06-30', '2020-06-30', 'Book', '750', 1, '2020-06-13 08:30:56', '2020-06-13 08:30:56'),
(8, 'rrrr', '2020-06-15', '2020-06-15', 'Book', '852', 1, '2020-06-13 08:31:14', '2020-06-13 14:11:10'),
(9, 'tttt', '2020-06-17', '2020-06-17', 'Book', '456', 1, '2020-06-13 08:31:29', '2020-06-13 14:11:12'),
(10, 'ssss', '2020-06-22', '2020-06-22', 'Book', '345', 1, '2020-06-13 08:32:57', '2020-06-13 14:11:15'),
(11, 'testing', '2020-06-16', '2020-06-16', 'Book', '500', 1, '2020-06-13 08:33:42', '2020-06-13 08:33:42');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'saravanan', 'saravana@gmail.com', '$2y$10$qCmq.XTS7yzBorQuS3vyFO3N8/j7eBV1hsEUGm0zIGIjASJlBgT8i', 'LZ3FH82j4U0CiETV6nnfGCjXgOjdWHmTv53ghnUDMFd05LrD0R89h4u1ug0j', '2020-06-13 02:24:35', '2020-06-13 02:24:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
