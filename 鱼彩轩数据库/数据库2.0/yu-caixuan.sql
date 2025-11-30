-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2025-09-16 16:45:21
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `yu-caixuan`
--

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryName` text NOT NULL,
  `categoryContent` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `categoryName`, `categoryContent`, `image`) VALUES
(1, '淡水生物', '淡水鱼是指生活在盐度含量低于0.05%的水域的鱼类，主要分为原生和次生两大类。世界上有超过8400种淡水鱼，按适应水温可分为暖水性、温水性和冷水性鱼类。', '/uploads/img_1755928283973_769139875.jpg'),
(2, '海洋生物', '海水鱼是生活在海洋中的鱼，因此，我们要饲养它，必须要有相关的设备，采取相关的措施，来摸拟大洋中的生活环境。温度应控制在25℃左右，盐度1·020%～1·023%之间，并需摆上海里的动植物', '/uploads/img_1755928431659_134102058.jpg'),
(3, '精选器材', '为了让观赏鱼健康成长，其他的增氧器材、过滤材料、鱼缸清洁用品、照明灯具、还有鱼饲料等等都要配备齐全', '/uploads/img_1755928448927_363058415.png');

-- --------------------------------------------------------

--
-- 表的结构 `discount`
--

CREATE TABLE `discount` (
  `id` int(11) NOT NULL,
  `originalPrice` int(11) NOT NULL,
  `discountedPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `discount`
--

INSERT INTO `discount` (`id`, `originalPrice`, `discountedPrice`) VALUES
(1, 58, 8),
(2, 88, 28),
(3, 128, 38),
(4, 168, 58);

-- --------------------------------------------------------

--
-- 表的结构 `footer`
--

CREATE TABLE `footer` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `content` text NOT NULL,
  `icon` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `footer`
--

INSERT INTO `footer` (`id`, `name`, `content`, `icon`) VALUES
(1, 'Address', '安徽省合肥市', 'location-filled'),
(2, 'Call', '0558-888888', 'phone-filled'),
(3, 'Email', '666666@qq.com', 'comment');

-- --------------------------------------------------------

--
-- 表的结构 `picture`
--

CREATE TABLE `picture` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `picture`
--

INSERT INTO `picture` (`id`, `name`, `image`) VALUES
(1, 'logo', '/uploads/img_1755928520035_992284251.png');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` int(11) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `email` text NOT NULL,
  `permission` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `phone`, `email`, `permission`) VALUES
(1, 'admin', 123456, '1888888888', '666666@qq.com', 'admin'),
(3, '张三', 123456, '15855555555', '11111111@qq.com', 'vip'),
(9, '王五', 666666, '18226254503', '1276656353@qq.com', 'vip'),
(11, '李四', 123456, '18255556666', '11111111@qq.com', 'vip');

--
-- 转储表的索引
--

--
-- 表的索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `footer`
--
ALTER TABLE `footer`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `picture`
--
ALTER TABLE `picture`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `discount`
--
ALTER TABLE `discount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `footer`
--
ALTER TABLE `footer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `picture`
--
ALTER TABLE `picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
