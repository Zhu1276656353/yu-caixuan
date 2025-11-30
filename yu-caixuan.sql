-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2025-08-24 05:10:24
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
-- 表的结构 `hotproducts`
--

CREATE TABLE `hotproducts` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` int(11) NOT NULL,
  `sales` int(11) NOT NULL,
  `image` text NOT NULL,
  `introduce` text NOT NULL,
  `cid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `hotproducts`
--

INSERT INTO `hotproducts` (`id`, `name`, `price`, `sales`, `image`, `introduce`, `cid`) VALUES
(1, '紫雷达虾虎', 58, 1024, '/uploads/img_1755928700694_358285223.jpg', '体态修长，体长最大可达9cm。背鳍有7条棘刺和27-32条软骨辐条，臀鳍有28-31条软骨辐条。体色由黄色过渡到白色，头部紫色，身体浅黄，从头部至尾部颜色渐变为灰紫色。条状的背鳍和臀鳍为紫红色或橙色，纵向边缘为紫色。尾鳍为正尾形，上下鳍红色，中间为灰紫色。', 1001),
(2, '蓝线虾虎', 98, 435, '/uploads/img_1755928721796_664998974.jpg', '喜欢藏身于丰茂的珊瑚礁石中。可接受18-26℃的水温，喜欢温度低一些，20-24℃状态最佳，如果水温太高，会很快死去。野生情况下未杂食性，觅食各类有机质碎屑。作为观赏鱼饲养，对饲料没有特殊要求，可投喂大多数的动物性饵料，像糠虾、富含营养的海虾，建议一天投喂两次。', 1002),
(3, '紫玉雷达', 98, 3410, '/uploads/img_1755928740467_570553707.jpg', '最大体长6cm。体型条形，鱼身呈淡紫色，但头部、吻部为黄色，第一背鳍的第一鳍条较雷达短。对其他品种的鱼很少有攻击行为，但有领地意识，会与同类为争夺领地打架，但如果是一对就不会发生这样的事。', 1003),
(4, '云雀鲷', 24, 5142, '/uploads/img_1755928778007_124829668.jpg', '体长6-7cm。身体前部为黄褐色，中间带有一条深色纵带，后部浅褐色，各鳍黑褐色，尾巴白色,野生情况下，以浮游生物为食。', 1004),
(5, '安汶光鳃鱼', 18, 6402, '/uploads/img_1755928839762_553680301.jpg', '体长7-9cm。体色为相对深沉的棕灰色，在胸鳍基部有一个大的黄色斑点，深色的尾鳍鳍片，白色腹鳍和臀鳍，细长的背鳍，臀鳍和尾鳍的末梢有细丝，以及白色或半透明的区域。', 1005),
(6, '澳大利亚雀鲷', 42, 1024, '/uploads/img_1755928884920_96873706.jpg', '体长9-11cm。蓝色的头部和身体，有明亮的蓝色垂直伸长的鳞片中心。成鱼后，下半部会逐步变为黄白色。', 1006),
(7, '爱琴鱼', 13, 5714, '/uploads/img_1755928935566_253666500.jpg', '体色基调为淡绿、黄色，常随环境发生变化。背、臀鳍上有黑色带。生命力较强，体健壮，易饲养。喜弱酸性软水，水质波动不宜过大，喜食活饵', 2001),
(8, '二线琴尾鳉鱼', 24, 0, '/uploads/img_1755929098291_749468554.jpg', '二线琴尾鳉是辐鳍亚纲鳉形目动物，又称双带琴尾鳉。成鱼体长约5.0厘米，雄鱼体表具橘黄色光泽，分布于腹部、背鳍、臀鳍及尾鳍，体型纤巧且色泽艳丽。', 2002),
(9, '漂亮宝贝鳉鱼', 14, 5412, '/uploads/img_1755929139404_647487444.jpg', '喜弱酸性软水，对水质变化极为敏感，对水质，水质太硬，鱼鳃会动个不停，并浮在水面游动，不久即死亡。可投喂水蚤、蚯蚓或颗粒饲料等。要小心呵护，稍有不慎就可能导致大批死亡', 2003),
(11, '埃及神仙鱼', 48, 2365, '/uploads/img_1755929306418_994959717.jpg', '喜高溶氧的弱酸性软水、水草茂盛的宽阔明亮环境。爱静胆小，易受惊。受惊后，能迅速作出愤怒抗争的反应。食性杂，喜食活饵，有时会欺侮弱小的其他鱼类。不耐寒，水温低于25℃易生病。', 2004),
(12, '红眼钻石神仙', 8, 5412, '/uploads/img_1755929339653_465957624.jpg', '体质强健，喜弱酸性软水，水温22-26℃。pH6-7，硬度5-20，对水环境波动也有一定的适应能力。性情温和，喜好群居，可以和很多品种的鱼类混养，也可伴养在水草缸中', 2005),
(13, '阿卡西短鲷', 45, 0, '/uploads/img_1755929380592_326976163.jpg', '体侧由眼至尾柄有一条黑色纵带。常见品种有：野生阿卡西、黄尾、红尾、白尾等。经过颜色体型的筛选的艳丽品种，价位较高，例如超红尾阿卡西、双红尾阿卡西等。选购时要观察游姿、体色是否正常', 2006);

-- --------------------------------------------------------

--
-- 表的结构 `newproducts`
--

CREATE TABLE `newproducts` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` int(11) NOT NULL,
  `image` text NOT NULL,
  `introduce` text NOT NULL,
  `cid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `newproducts`
--

INSERT INTO `newproducts` (`id`, `name`, `price`, `image`, `introduce`, `cid`) VALUES
(2, '安东尼灯鱼', 12, '/uploads/img_1755955223939_161578907.jpg', '喜弱酸性软水及茂盛水草，非常适合草缸饲养。建议使用草泥丸进行水质酸碱度调节。属于爱好和平、性情温驯的鱼种。属肉食性鱼类，可投喂小型活饵及细碎的冷冻干燥饵料。', 2008),
(3, '珍珠灯鱼', 28, '/uploads/img_1755955263736_606016247.jpg', '对水质要求较高，喜弱酸性软水，适合草缸与小型灯鱼混养。喜欢天然活饵，但对人工饲料亦不抗拒，唯在抢食方面比较逊色，在这方面须多加照顾。', 2009),
(4, '宝莲灯鱼', 4, '/uploads/img_1755955369372_15525662.jpg', '喜弱酸软水，光照不宜过强。性情温和，不食水草，群游特性很强，用字欢快活泼，宜群养，可混养，泳姿欢快活泼，十分讨人喜爱，是草缸的最佳伴侣之一。投喂线虫、水蚤等小型活饵', 2010),
(5, '七彩水晶旗', 12, '/uploads/img_1755955423913_546682009.jpg', '野生于亚马逊黑水流域，腐植酸较高，需酸性较高的极软水养殖。环境光照不宜过强，并密植水草已供其躲避，建议群养10尾以上，可适度消除其紧迫感。对水质波动极为敏感', 2011),
(6, '布氏非洲鲑鲤', 10, '/uploads/img_1755955500723_485327000.jpg', '布氏非洲鲑鲤是脂鲤科非洲鲑鲤属的热带淡水鱼类。其尾柄具有脂鳍，属于典型的卵生鱼类，繁殖时产黏性卵附着于水生植物或基质表面', 2012),
(7, '七彩凤凰', 22, '/uploads/img_1755955156281_37468893.jpg', '易饲养，喜有水草及底砂的弱酸性的清澈水质。性情温和，活泼好动，喜不停地游动，可促使灯鱼群游，但无法追上灯鱼。同类间有较强领地意识，可与其他品种混养。幼鱼群养成熟后，自行配对离开群体，占据相对安全的位置作为产卵繁殖的巢穴', 2007);

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
  `phone` int(11) NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `phone`, `email`) VALUES
(1, 'admin', 123456, 1888888888, '666666@qq.com'),
(2, '李四', 123456, 166666666, '123456789@qq.com');

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
-- 表的索引 `hotproducts`
--
ALTER TABLE `hotproducts`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `newproducts`
--
ALTER TABLE `newproducts`
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
-- 使用表AUTO_INCREMENT `hotproducts`
--
ALTER TABLE `hotproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `newproducts`
--
ALTER TABLE `newproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `picture`
--
ALTER TABLE `picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
