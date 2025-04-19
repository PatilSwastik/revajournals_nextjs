-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2024 at 04:55 PM
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
-- Database: `revajournals`
--

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `paper_title` varchar(255) NOT NULL,
  `short_title` varchar(255) NOT NULL,
  `keywords` text NOT NULL,
  `abstract` text NOT NULL,
  `major_domain` varchar(255) NOT NULL,
  `additional_comments` text DEFAULT NULL,
  `file_upload` text NOT NULL,
  `plagiarism_upload` varchar(255) NOT NULL,
  `access_type` enum('open','closed') NOT NULL,
  `status` enum('approved','request_changes','published') DEFAULT 'request_changes',
  `feedback` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author1_name` varchar(255) NOT NULL,
  `author2_name` varchar(255) NOT NULL,
  `author3_name` varchar(255) NOT NULL,
  `author4_name` varchar(255) NOT NULL,
  `author5_name` varchar(255) NOT NULL,
  `author6_name` varchar(255) DEFAULT NULL,
  `author7_name` varchar(255) DEFAULT NULL,
  `author8_name` varchar(255) DEFAULT NULL,
  `author9_name` varchar(255) DEFAULT NULL,
  `author10_name` varchar(255) DEFAULT NULL,
  `reviewer1_name` varchar(255) NOT NULL,
  `reviewer2_name` varchar(255) NOT NULL,
  `reviewer3_name` varchar(255) NOT NULL,
  `reviewer4_name` varchar(255) DEFAULT NULL,
  `reviewer5_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`id`, `paper_title`, `short_title`, `keywords`, `abstract`, `major_domain`, `additional_comments`, `file_upload`, `plagiarism_upload`, `access_type`, `status`, `feedback`, `created_at`, `author1_name`, `author2_name`, `author3_name`, `author4_name`, `author5_name`, `author6_name`, `author7_name`, `author8_name`, `author9_name`, `author10_name`, `reviewer1_name`, `reviewer2_name`, `reviewer3_name`, `reviewer4_name`, `reviewer5_name`) VALUES
(6, 'mahabharat', 'MAHABHARAT', 'vishnu avatar vasudeva gopal balarama bhagavad gita radha mahabharata rama lakshmi', 'This article is about the Sanskrit epic. For other uses, see Mahabharata (disambiguation).\r\nMahabharata\r\nMahabharata\r\nManuscript illustration of the Battle of Kurukshetra\r\nInformation\r\nReligion	Hinduism\r\nAuthor	Vyasa\r\nLanguage	Sanskrit\r\nPeriod	Principally compiled in 3rd century BCE–4th century CE\r\nChapters	18 Parvas\r\nVerses	200,000\r\nFull text\r\nMahabharata at Sanskrit Wikisource\r\n Mahabharata at English Wikisource\r\nPart of a series on\r\nHindu scriptures and texts\r\n\r\nShrutiSmriti\r\nList\r\nVedas\r\nUpanishads\r\nOther scriptures\r\nRelated Hindu texts\r\nVedangas\r\nPuranas\r\nItihasa\r\nSangam literature\r\nShastras and sutras\r\nTimeline\r\nvte\r\nThis article is a part of the series on\r\nIndonesian\r\nmythology and folklore\r\n\r\nCultural mythologies\r\nTraditional folk religions\r\nDeities\r\nMythological and folkloric creatures\r\nWayang characters\r\nRituals and traditions\r\nMythical and sacred locations\r\nSacred objects\r\nSee also\r\nflag Indonesia portal\r\n Mythology portal\r\nvte\r\nThe Mahābhārata (/məˌhɑːˈbɑːrətə, ˌmɑːhə-/ mə-HAH-BAR-ə-tə, MAH-hə-;[1][2][3][4] Sanskrit: महाभारतम्, IAST: Mahābhāratam, pronounced [mɐɦaːˈbʱaːrɐt̪ɐm]) is one of the two major Smriti texts and Sanskrit epics of ancient India revered in Hinduism, the other being the Rāmāyaṇa.[5] It narrates the events and aftermath of the Kurukshetra War, a war of succession between two groups of princely cousins, the Kauravas and the Pāṇḍavas.', 'mahabharat', '-', 'uploads/intership_report.pdf', 'uploads/intership_report.docx', 'open', 'published', '-\r\n', '2024-07-14 07:58:06', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL),
(7, 'THE MAHABHARATA', 'mahabharat', 'vyasa bhagavad gita ramayana iliad puranas pandava gandhari arjuna kaurava krishna duryodhana ', 'The Mahābhārata (/məˌhɑːˈbɑːrətə, ˌmɑːhə-/ mə-HAH-BAR-ə-tə, MAH-hə-;[1][2][3][4] Sanskrit: महाभारतम्, IAST: Mahābhāratam, pronounced [mɐɦaːˈbʱaːrɐt̪ɐm]) is one of the two major Smriti texts and Sanskrit epics of ancient India revered in Hinduism, the other being the Rāmāyaṇa.[5] It narrates the events and aftermath of the Kurukshetra War, a war of succession between two groups of princely cousins, the Kauravas and the Pāṇḍavas.\r\n\r\nIt also contains philosophical and devotional material, such as a discussion of the four \"goals of life\" or puruṣārtha (12.161). Among the principal works and stories in the Mahābhārata are the Bhagavad Gita, the story of Damayanti, the story of Shakuntala, the story of Pururava and Urvashi, the story of Savitri and Satyavan, the story of Kacha and Devayani, the story of Rishyasringa and an abbreviated version of the Rāmāyaṇa, often considered as works in their own right.', 'mahabharat', '', 'uploads/intership_report.pdf', 'uploads/intership_report.docx', 'open', 'published', 'nice article', '2024-07-21 06:15:13', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL),
(8, 'checking', 'abc', 'def', 'hello', 'check', '', 'uploads/intership_report.pdf', 'uploads/intership_report.docx', 'open', 'published', '', '2024-07-31 08:31:24', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL),
(9, 'my name', 'name', 'names are there', 'hello my name', 'name world', '-', 'uploads/intership_report.pdf', 'uploads/intership_report.docx', 'open', 'request_changes', '', '2024-07-31 08:46:50', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL),
(10, 'Hello', 'h', 'he', 'abcd h', 'hello world', '-', 'uploads/intership_report.pdf', 'uploads/intership_report.docx', 'open', 'request_changes', '', '2024-08-18 07:09:10', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL),
(11, 'new article ', 'article ', 'abcdefghijklmn', 'hi my name is hello ', 'article ', '--', 'uploads/intership_report.docx', 'uploads/intership_report.pdf', 'open', 'request_changes', '', '2024-08-18 10:24:21', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL),
(12, 'The Ride ', 'ride ', 'r e d   k m l f d ', 'the ride is so beatiful ', 'ride ', '--', 'uploads/intership_report.pdf', 'uploads/intership_report.docx', 'open', 'request_changes', '', '2024-08-18 11:14:11', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, '', '', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `article_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `department` varchar(255) NOT NULL,
  `position` enum('UG','PG','Researcher','PostDoc') NOT NULL,
  `institution` varchar(255) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(255) NOT NULL,
  `article_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `article_id`, `name`, `email`, `phone`, `department`, `position`, `institution`, `postal_code`, `country`, `article_name`) VALUES
(1, 6, 'suraj mane', 'suraj@123gmail.com', '1234567890', 'comp', 'UG', 'pillai HOC college of engineering and technology', '410206', 'india', ''),
(2, 7, 'suraj suryakant mane', 'ved@123gmail.com', '1234567890', 'comp', 'UG', 'pillai HOC college of engineering and technology', '410206', 'india', ''),
(3, 8, 'suraj suryakant mane', 'suraj@123gmail.com', '1234567890', 'comp', 'UG', 'pillai HOC college of engineering and technology', '410206', 'india', ''),
(4, 9, 'dinesh mane', 'dinesh@123gmail.com', '2013654789', 'comp', 'UG', 'pillai HOC college of engineering and technology', '512206', 'india', ''),
(5, 10, 'suraj mane', 'suraj@123gmail.com', '9347586321', 'comp', 'UG', 'pillai HOC college of engineering and technology', '410206', 'india', ''),
(6, 11, 'dinesh mane', 'dinesh@123gmail.com', '2013654789', 'comp', 'UG', 'pillai HOC college of engineering and technology', '410206', 'india', ''),
(7, 12, 'deepak mane ', 'deepalk123@gmail.com', '8620314579', 'comp', 'UG', 'pillai HOC college of engineering and technology', '410206', 'india', '');

-- --------------------------------------------------------

--
-- Table structure for table `authorslogindetails`
--

CREATE TABLE `authorslogindetails` (
  `AuthorID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `ContactNo` varchar(15) DEFAULT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authorslogindetails`
--

INSERT INTO `authorslogindetails` (`AuthorID`, `Username`, `Email`, `ContactNo`, `Password`) VALUES
(1, 'suraj mane', 'surajmane4857@gmail.com', '9321674857', '$2y$10$AsU2.iU8OWqxc.Jz5U/RfujZTPxTCtklgMX6NyITIXgEWN0Jb/tLC'),
(2, 'suraj mane', 'surajphcet.genai@gmail.com', '9321674857', '$2y$10$sI1K6Xy9rUHUE88EqnjeweZ50Xl/ZZPbHqVF542FYfcdclkzQrodi');

-- --------------------------------------------------------

--
-- Table structure for table `editors`
--

CREATE TABLE `editors` (
  `EditorID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `ContactNo` varchar(15) DEFAULT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `editorslogindetails`
--

CREATE TABLE `editorslogindetails` (
  `EditorID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `ContactNo` varchar(15) DEFAULT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `user_name` varchar(50) NOT NULL,
  `document` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`document`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviewer`
--

CREATE TABLE `reviewer` (
  `id` int(11) NOT NULL,
  `article_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `article_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviewer`
--

INSERT INTO `reviewer` (`id`, `article_id`, `name`, `email`, `position`, `degree`, `institution`, `department`, `article_name`) VALUES
(1, 6, 'suraj suryakant mane', 'surajmane4857@gmail.com', 'UG', '', 'pillai HOC college of enginnering and technology', 'comp', ''),
(2, 7, 'suraj suryakant mane', 'surajmane4857@gmail.com', 'UG', '', 'pillai HOC college of enginnering and technology', 'comp', ''),
(3, 7, 'dinesh', 'dinesh123@gmail.com', 'UG', '', 'pillai', 'comp', ''),
(4, 8, 'suraj suryakant mane', 'surajmane4857@gmail.com', 'UG', '', 'pillai HOC college of enginnering and technology', 'comp', ''),
(5, 9, 'rohan kamlesh mhatre', 'rohan@123gmail.com', 'UG', '', 'CKT college panvel', 'comp', ''),
(6, 10, 'rohan kamlesh mhatre', 'rohan@123gmail.com', 'PG', '', 'CKT college panvel', 'comp', ''),
(7, 11, 'suraj suryakant mane', 'surajmane4857@gmail.com', 'UG', '', 'pillai HOC college of enginnering and technology', 'comp', ''),
(8, 12, 'suraj suryakant mane', 'surajmane4857@gmail.com', 'UG', '', 'pillai HOC college of enginnering and technology', 'comp', '');

-- --------------------------------------------------------

--
-- Table structure for table `reviewerslogindetails`
--

CREATE TABLE `reviewerslogindetails` (
  `ReviewerID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `ContactNo` varchar(15) DEFAULT NULL,
  `Password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('author','reviewer','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `authorslogindetails`
--
ALTER TABLE `authorslogindetails`
  ADD PRIMARY KEY (`AuthorID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `editors`
--
ALTER TABLE `editors`
  ADD PRIMARY KEY (`EditorID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `editorslogindetails`
--
ALTER TABLE `editorslogindetails`
  ADD PRIMARY KEY (`EditorID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `reviewer`
--
ALTER TABLE `reviewer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `reviewerslogindetails`
--
ALTER TABLE `reviewerslogindetails`
  ADD PRIMARY KEY (`ReviewerID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `authorslogindetails`
--
ALTER TABLE `authorslogindetails`
  MODIFY `AuthorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `editors`
--
ALTER TABLE `editors`
  MODIFY `EditorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1002;

--
-- AUTO_INCREMENT for table `editorslogindetails`
--
ALTER TABLE `editorslogindetails`
  MODIFY `EditorID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviewer`
--
ALTER TABLE `reviewer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `reviewerslogindetails`
--
ALTER TABLE `reviewerslogindetails`
  MODIFY `ReviewerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `author`
--
ALTER TABLE `author`
  ADD CONSTRAINT `author_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`);

--
-- Constraints for table `reviewer`
--
ALTER TABLE `reviewer`
  ADD CONSTRAINT `reviewer_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
