-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 24 2018 г., 09:36
-- Версия сервера: 5.6.38
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `LogDocs`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Incoming`
--

CREATE TABLE `Incoming` (
  `id` int(11) NOT NULL,
  `Исходящий № документа` int(11) NOT NULL,
  `Дата отправки` datetime NOT NULL,
  `Кому` varchar(60) NOT NULL,
  `От кого` varchar(60) NOT NULL,
  `О чем` varchar(200) NOT NULL,
  `file` varchar(200) DEFAULT 'null_',
  `№ дела, в котором хранится копия` varchar(60) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Outgoing`
--

CREATE TABLE `Outgoing` (
  `id` int(11) NOT NULL,
  `Исходящий № документа` int(11) NOT NULL,
  `Дата отправки` datetime NOT NULL,
  `Кому` varchar(60) NOT NULL,
  `От кого` varchar(60) NOT NULL,
  `О чем` varchar(200) NOT NULL,
  `file` varchar(200) DEFAULT 'null_',
  `№ дела, в котором хранится копия` varchar(60) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Incoming`
--
ALTER TABLE `Incoming`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Outgoing`
--
ALTER TABLE `Outgoing`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Incoming`
--
ALTER TABLE `Incoming`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Outgoing`
--
ALTER TABLE `Outgoing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
