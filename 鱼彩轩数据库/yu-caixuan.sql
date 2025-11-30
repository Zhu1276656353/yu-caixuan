-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2025-10-31 14:55:46
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
-- 表的结构 `abouthistory`
--

CREATE TABLE `abouthistory` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `abouthistory`
--

INSERT INTO `abouthistory` (`id`, `year`, `content`) VALUES
(1, 2022, '鱼彩轩的故事始于一次偶然邂逅。创始人是一位热爱水族的新手鱼友，在花鸟鱼虫市场被成千上万尾鱼儿在水中翩翩起舞的绚丽景象深深打动。那一刻，他萌生了一个梦想：要把这份水中的诗意与色彩，带到更多爱鱼人身边。'),
(2, 2023, '从最初在自家阳台的小型鱼房起步，我们专注养殖和分享高品质的灯鱼与热带鱼，凭借对水质管理、鱼只健康和运输技术的不断钻研，逐渐积累了良好的口碑。'),
(3, 2024, '我们始终坚持“只卖健康鱼”的原则，与国内优质养殖场深度合作，建立稳定的种源供应体系，并逐步完善了恒温养殖、病害防控、专业打包和冷链物流等全流程服务体系'),
(4, 2025, '鱼彩轩已服务超过2千名水族爱好者，足迹遍布全国。我们不仅是一家卖鱼的店铺，更希望成为连接人与自然、传递宁静与美好的桥梁。未来，我们将继续深耕水族领域，不断引进新品种，提升服务品质，让每一只从鱼彩轩出发的鱼儿，都能在您的鱼缸中绽放生命的光彩。');

-- --------------------------------------------------------

--
-- 表的结构 `aboutintro`
--

CREATE TABLE `aboutintro` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `aboutintro`
--

INSERT INTO `aboutintro` (`id`, `title`, `content`) VALUES
(1, '鱼彩轩', '以鱼为媒，传递自然之美；以诚为本，守护每一份热爱。我们相信，养鱼不仅是 hobby，更是一种生活态度。鱼彩轩始终秉持“健康为先、服务为本、诚信经营、客户至上”的理念，用心对待每一条生命，用专业解答每一个疑问，致力于打造值得信赖的观赏鱼品牌。');

-- --------------------------------------------------------

--
-- 表的结构 `aboutmission`
--

CREATE TABLE `aboutmission` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `aboutmission`
--

INSERT INTO `aboutmission` (`id`, `title`, `content`) VALUES
(1, '守护每一条生命的健康与活力', '我们致力于从源头把控品质，科学养殖、严格检疫，确保售出的每一尾观赏鱼都健康活泼，让客户收到的不仅是鱼，更是值得托付的信任与喜悦。'),
(2, '传播水族生活的美好与智慧', '我们不仅售卖观赏鱼，更愿成为水族文化的传递者，通过专业指导、养护知识分享，帮助每一位爱好者轻松入门、安心养鱼，享受鱼水相伴的宁静与治愈。'),
(3, '推动观赏鱼行业的诚信与可持续发展\r\n', '我们坚持透明经营，拒绝药水鱼、激素鱼，倡导生态养殖与绿色运输，以负责任的态度对待生命与环境，为行业树立值得信赖的标杆。');

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
-- 表的结构 `fishtool`
--

CREATE TABLE `fishtool` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` int(11) NOT NULL,
  `image` text NOT NULL,
  `introduce` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `fishtool`
--

INSERT INTO `fishtool` (`id`, `name`, `price`, `image`, `introduce`) VALUES
(30001, '过滤桶cf1200', 247, '/uploads/img_1761913223374_182747499.jpg', '创星CF1200鱼缸过滤器，绝对是养鱼新手和老手心中的“宝藏”。它的设计非常人性化，过滤桶容量大，能容纳多种滤材，如生化棉、陶瓷环等，给水体提供充足的净化空间。而且它的进水口和出水口设计得很科学，水流顺畅，噪音也控制得不错。无论是大型观赏鱼缸，还是中小型生态缸，它都能轻松胜任'),
(30002, '创星除油膜器', 27, '/uploads/img_1761913539660_507845205.jpg', '安装简单，直接吸附在鱼缸玻璃上就行，完全不占空间。开机后水流非常稳定，油膜和水面浮尘被迅速吸走，几分钟内整个水面就变得清澈透亮，像镜子一样！现在每天看到鱼儿在干净的水面上游动，心情都变好了。它运行特别安静，几乎听不到声音，完全不影响生活。'),
(30003, '创星加温棒', 45, '/uploads/img_1761913650763_914837393.jpg', '一款专为水族爱好者设计的高品质恒温加热设备，凭借其卓越的稳定性与安全性，成为众多鱼友信赖的选择。它采用先进的温控技术，能够精准感应水温并自动调节，确保鱼缸内温度始终保持在设定范围内，为热带鱼、虾类及水草提供稳定适宜的生长环境。产品外壳选用高强度耐腐蚀的石英玻璃材质，透光性好且抗冲击，内置高品质发热元件，加热均匀迅速，同时具备良好的节能特性。其独特的隐藏式感温探头设计有效避免误触，配合双重过热保护机制，大大提升了使用安全性。'),
(30004, '创星at101S水泵', 62, '/uploads/img_1761913723132_265451452.jpg', '一款专为中小型水族箱设计的高性能、低能耗微型潜水泵，以其稳定可靠的运行表现和紧凑实用的设计赢得了广大水族爱好者的青睐。这款水泵运行时极为安静，几乎不会产生干扰生活的噪音，非常适合放置在室内或卧室的鱼缸中使用。其强劲而稳定的水流输出能够有效促进水体循环，提升溶氧量，帮助维持水质清洁，特别适用于驱动过滤系统、造景水循环或配合增氧石等设备使用。'),
(30005, '创星UV过滤泵', 70, '/uploads/img_1761913803981_695879592.jpg', '集物理过滤、水体循环与紫外线杀菌功能于一体的高效水族净水系统，专为追求清澈水质和健康水环境的鱼友设计。该设备通过强劲而稳定的水泵动力推动水流，经过内置的多层滤材仓，有效拦截水中的残饵、鱼粪等悬浮杂质，实现高效的物理过滤，保持水体通透。同时，其核心配备的UV-C紫外线杀菌灯管能够在水流经过杀菌腔时，快速破坏藻类孢子、细菌、病毒及单细胞病原体的DNA结构，有效抑制绿藻爆发、防止白点病等传染性疾病传播，显著提升水体透明度并降低鱼类患病风险。'),
(30006, '鱼缸过滤棉', 12, '/uploads/img_1761913884492_681092307.jpg', '拦截水中的悬浮颗粒、鱼粪、残饵、藻类碎片等物理性杂质，起到初步净化水质的作用。它通常被放置在过滤系统的最前端，如上滤槽、滤筒或底滤的第一格中，通过密集的纤维结构形成一道物理屏障，有效防止大颗粒污物进入后续的生化滤材区域，避免堵塞和污染。优质的过滤棉应具备良好的透水性和较高的纳污能力，在保证水流顺畅的同时，能长时间保持过滤效率。'),
(30007, 'OEM加热棒', 241, '/uploads/img_1761913987361_628065436.jpg', '独特的隐藏式感温探头设计有效避免误触，配合双重过热保护机制，大大提升了使用安全性，即使在意外低水位或空开情况下也能自动断电，防止干烧。无论是新手入门还是资深玩家，创星加温棒都以其可靠的性能、简洁的外观和长久的使用寿命，成为维持水族箱生态平衡不可或缺的得力助手。'),
(30008, '创星智能过滤桶', 675, '/uploads/img_1761914061942_451934157.jpg', '一款集高效过滤、智能控制与节能环保于一体的高端外置滤筒设备，专为中大型水族箱打造，致力于为水族爱好者提供稳定、洁净、低维护的水体解决方案。该过滤桶采用先进的变频技术，用户可通过智能面板或遥控器无级调节水泵流量，根据鱼缸的生物负载、水流需求及季节变化灵活设定水流强度，既可满足高流量下的强力过滤，也能在夜间或需要静音时调低流速，实现真正的按需运行。其大容量多层滤室设计支持丰富的滤材组合，可分层放置物理过滤棉、生化棉、陶瓷环、细菌屋、活性炭等，全面实现物理拦截、生物降解和化学净化三重过滤效果，有效去除杂质、分解有害物质、稳定水质指标。');

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
(2, 'Call', '18226254503', 'phone-filled'),
(3, 'Email', '1276656353@qq.com', 'comment');

-- --------------------------------------------------------

--
-- 表的结构 `freshwaterfish`
--

CREATE TABLE `freshwaterfish` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` int(11) NOT NULL,
  `image` text NOT NULL,
  `introduce` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `freshwaterfish`
--

INSERT INTO `freshwaterfish` (`id`, `name`, `price`, `image`, `introduce`) VALUES
(10001, '彩虹绿苹果鱼', 15, '/uploads/img_1761906696067_830644543.jpg', '体色虽然和常见的红美人有点相似，但本种雄鱼和大帆绿苹果一样，进入成熟阶段后，不但背部会逐渐隆起，并会发展出格外大片的臀鳍鳍面，论观赏价值可一点不输大帆绿苹果。'),
(10002, '钻石彩虹鱼', 26, '/uploads/img_1761906983164_51031164.jpg', '在银汉鱼科中属于较为细长的小型彩虹鱼品种，带有黑边，大大的鳞片，质感十足，基色为发亮的天蓝色，发情期，颜色更是鲜艳亮眼。进口量较少，市面非常少见。'),
(10003, '侏虹银汉鱼', 12, '/uploads/img_1761907042518_858267189.jpg', '是已知彩虹美人鱼系列观赏鱼中体形最小的品种，所以被冠以侏儒，雄鱼体长最大仅6-7cm，具有冰蓝色的亮丽体色，鱼鳍有时会有淡黄色。雌鱼约4-5cm，体型较小且体色不如雄鱼亮眼。'),
(10004, '石美人鱼', 17, '/uploads/img_1761907284091_957500832.jpg', '属彩虹鱼系列中体色较不艳丽的品种，因前半身的蓝色与后半身的橙色搭配而备受欢迎，色彩可随光线及环境的变化呈粉红色、淡黄色、浅紫色或银白色。'),
(10005, '阿帕玛三色灯鱼', 13, '/uploads/img_1761907346581_35838742.jpg', '外形与红鼻剪刀有些相似，但体侧红线较鲜明华丽。非常温和，适合在草缸造景中混养与群养，可搭配尺寸相近的脂鲤、胸斧鱼、短嘴脂鲤、小型美洲鲶鱼或骨甲鲶、非掠食性中小型慈鲷饲养。'),
(10006, '超级黄魔鬼灯', 25, '/uploads/img_1761907380968_470309677.jpg', '超级魔鬼灯在水族市场非常罕见，是灯鱼中的珍品，有红、黄、彩三种色型，性格有些凶悍，甚至会驱赶比其体型较大的鱼类。超级红魔鬼灯、超级黄魔鬼灯、彩虹魔鬼灯这超级魔鬼三兄弟，有着各不相同的美艳色彩，近年在灯鱼圈中非常受欢迎。'),
(10007, '帝王黑灯', 45, '/uploads/img_1761907411261_362025521.jpg', '2004年才被发表的南美小型灯鱼新品种。它能被冠上帝王之名，可见它的身上具备王者特质，体侧那深蓝色的宽带，十分引人注目。当对手间互相展示或发情时，鳍翅上的红色斑纹更加鲜艳。'),
(10008, '恶魔火焰灯', 54, '/uploads/img_1761907442131_622514454.jpg', '凯蒂灯家族经典的代表之一，体型小巧，个性温和，没有任何不良嗜好，也没有什么领地意识，发色时鱼如其名，仿佛一抹火焰般光彩照人。它的红色质感很强，更像红火蚁的红色质感，感觉上十分霸气。'),
(10009, '白边燕尾鱼', 24, '/uploads/img_1761909224823_623250647.jpg', '面部位置有浅蓝色斑纹，鱼体尾鳍部位长且尖。属中型三湖慈鲷品种，较为常见，在水族市场价格也较为适中。它性情温和，胆子较小，易受惊吓，可选择与其体型相近的鱼类混养。'),
(10010, '阿卡西短鲷', 23, '/uploads/img_1761909274532_403809834.jpg', '尾鳍呈茅状，外缘白色，上有V字型的斑纹，是南美短鲷花色最多的品种，人工变异品种有：白尾、蓝尾、红尾等。不同地域颜色和图案都不相同，目前已发现60个变异品种。'),
(10011, '宝莲灯鱼', 5, '/uploads/img_1761909344784_130031091.jpg', '它体型、色彩、习性都与红绿灯非常相似，但体型略大，群游特性比红绿灯强很多，鱼体蓝色少一些、红色纵带更宽且更鲜艳。是草缸造景最常见，也最受草缸爱好者追捧的群游品种之一，草缸宠儿，被誉为顶配版红绿灯。'),
(10012, '七彩水晶旗', 16, '/uploads/img_1761909376801_407413385.jpg', '是最小的观赏鱼品种之一，非常弱小但非常美丽，饲养难度极大，观赏性极高，但较少见，是灯鱼发烧友的进阶鱼种，堪称美丽与娇小的完美结合。'),
(10013, '绿莲灯鱼', 12, '/uploads/img_1761909426644_204636394.jpg', '属小型灯鱼，纤细、美丽，极富魅力，且性情十分温和。外表素雅，虽没有红绿灯鱼的艳丽，却自有其独特的风采。天性喜爱群游，很适合群养，群游时的蓝色基调，闪亮的颜色配上灵动的身影十分壮观美丽，给人一种沉静的感受。'),
(10014, '花豹灯', 14, '/uploads/img_1761909466304_527874810.jpg', '红唇金眼，体色黄褐，身体上遍布紫红色的斑点，看起来犹如陆上猫科动物花豹一般，故此而得俗名花豹灯。因体型较大，成鱼可达8cm，外观又太过低调，且性格并不是十分温顺，如今在玩家圈子中热度度已越来越低。'),
(10015, '图卡诺火灵灯', 52, '/uploads/img_1761909561434_965076598.jpg', '2009年被发现的新品种，极为罕有、非常珍稀，价格昂贵的奢侈品，群游时如火光攒动，美丽非凡，是灯鱼迷眼中的超级梦幻灯鱼。'),
(10016, '蓝法拉利灯', 15, '/uploads/img_1761909595678_774422731.jpg', '是比较少见的南美小型脂鲤，它体型修长，与红尾法拉利灯极为相似，但却又拥有与蓝灯相仿的亮蓝体色，全身晶莹剔透，湛蓝如天空，幽幽似美玉，梦幻般的色彩，焕发出一种引人遐想的神秘气质。'),
(10017, '红战狗斗鱼', 58, '/uploads/img_1761909657102_776645299.jpg', '最漂亮的斗鱼品种之一，颜色艳丽，长相凶悍，拥有斗鱼品种中罕见的大嘴，跳跃能力很强，是斗鱼迷心中的梦幻品种。'),
(10018, '虹斗鱼', 34, '/uploads/img_1761909687417_945007675.jpg', '很早就受到青睐的野生斗鱼品种，与泰国斗鱼的外观十分相似，亲缘性极高，甚至杂交的后代还有生育能力。战斗力并不如泰斗那么强，所以也被称为和平斗鱼，不过不要以为雄鱼之间可和平相处，在狭小或无掩蔽物的环境中，还是会打斗受伤破鳍的。'),
(10019, '科琪娜斗鱼', 24, '/uploads/img_1761909725419_663834765.jpg', '野生红色系斗鱼品种，且同种的雄鱼之间比较温和，素有文斗鱼的美称。但对异类却相当凶猛。'),
(10020, '红翅珍珠鼠', 8, '/uploads/img_1761909788390_637248991.jpg', '性情温和，可与小型鱼混养。食性杂，可投喂活饵或人工锭状饲料。建议在有水草和沉木的水族箱内饲养。建议底床铺暗色细底砂，以保护其触须。'),
(10021, '印第安鼠', 12, '/uploads/img_1761909840926_625204881.jpg', '和弓箭鼠一样比较害羞，喜水草和沉木水族箱，可混养。食性杂，喜欢晚上出来觅食，建议夜间投食。建议饲养于有水草和沉木的水族箱，可与大部分小型鱼混养。'),
(10022, '藩王食土鲷', 38, '/uploads/img_1761909868931_203921821.jpg', '属较小的食土鲷品种，是番王系列中最漂亮的，体形椭圆形，鱼体艳黄，头部及体侧身体中央有纵向黑色斑纹，体形虽小，脾气却很大，目前市面上还比较少见。'),
(10023, '斑马贝', 24, '/uploads/img_1761909926996_64105811.jpg', '细致鲜明纵纹布满各鳍，体侧纵纹的数量远多于九间贝，第一道纵纹贯穿额头上方。状态稳定时体色厚重，纹路清晰，美丽异常。'),
(10024, '虎皮天堂鸟', 31, '/uploads/img_1761909988187_477553054.jpg', '基色金黄，体侧分布白色或橙色不规则斑纹，背鳍明黄色，眼睛呈现迷人的淡蓝色，有很多地域变种，形态有所差异，状态好的情况下，十分漂亮。');

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `remark` text DEFAULT NULL,
  `items` text NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- 表的结构 `saltwaterfish`
--

CREATE TABLE `saltwaterfish` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` int(11) NOT NULL,
  `image` text NOT NULL,
  `introduce` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `saltwaterfish`
--

INSERT INTO `saltwaterfish` (`id`, `name`, `price`, `image`, `introduce`) VALUES
(20001, '非洲草莓鱼', 48, '/uploads/img_1761910293055_481130202.jpg', '有蓝有红，非常漂亮，还吃钢毛虫，是清洁鱼缸小能手。有性别转变的特性，通常先雌后雄，且人工养殖环境下有雄转雌的记录，是水族贸易中最受欢迎的拟雀鲷品种之一。'),
(20002, '闪电鬼王鱼', 34, '/uploads/img_1761910329219_77692717.jpg', '是可以发生变性的海鱼品种之一，鱼体呈黄色，覆盖着深褐色水平斑纹，腹鳍呈黑色，前缘有蓝边。尾鳍呈明亮的黄色，眼部有一条黑色纵纹贯穿。因体形较小，所以可微缸饲养，但不要混养过小的虾和鱼。'),
(20003, '环眼草莓鱼', 36, '/uploads/img_1761910366074_172902974.jpg', '不太活跃的草莓鱼品种，水族贸易中不常见，雌雄鱼颜色不一样，雌鱼淡粉色，雄鱼颜色更红一些。在水族箱中，一般多躲藏起来，在驯化后，投食的时候会迅速冲出来抢食。'),
(20004, '红长身草莓鱼', 78, '/uploads/img_1761910441407_695094652.jpg', '野生于海洋较深水域，很耐寒，行动迅速，很难被发现，不易捕捞，非常罕见。它的发现对水族爱好者来说，像是宝藏一样。在水族箱中偶尔出现，会增加许多乐趣。迷你的尺寸加上温和的脾气使之成为纳米礁系统中最受欢迎的品种之一。'),
(20005, '黄草莓鱼', 45, '/uploads/img_1761910476580_335392807.jpg', '普及度较高，很流行的草莓品种，鱼体呈亮黄到亮褐色。不会因鱼龄增长而颜色变暗，其颜色的变化主要是原因为食物改变，高质量的食物及均衡的营养会让它的颜色变成亮黄色，如食物质量不好，它的颜色会变得很暗淡。'),
(20006, '霓虹草莓鱼', 47, '/uploads/img_1761912052212_111886736.jpg', '形态颜色与非洲草莓鱼非常相似，只是体型略大，颜色较深，身体颜色变化较大，通常由绿色、黄色和红色组成，身体上部和各鳍有蓝色条纹。'),
(20007, '斑面倒吊', 184, '/uploads/img_1761912088646_61003599.jpg', '鱼体呈黄褐色至淡紫色，分布着细密的白色纹路。头部及面部均匀散落着橙黄色的小圆斑。黑色的腹鳍带着荧光蓝边，尾鳍呈燕尾状，并带有白边。尾柄处有纵向排列的三块黑斑。'),
(20008, '天狗倒吊', 118, '/uploads/img_1761912127181_432651102.jpg', '亚成鱼基色暗灰，背鳍带蓝色条纹，尾鳍带橘色条纹。成鱼后颜色变深，身体呈红褐色，各鳍条纹也会增加额外的颜色。尾部成竖琴形状，尾柄上有两个黄色圆斑，两侧有刺尾钩。'),
(20009, '金毛倒吊', 198, '/uploads/img_1761912167426_904873434.jpg', '与天狗吊外形和颜色非常相似，但其背鳍黄色更多，天狗吊黑色较多，尾鳍有明显的燕尾丝。亚成鱼呈灰白色，胸鳍和腹鳍为黄色的。随着鱼龄增加，颜色变深，变成深蓝灰色。'),
(20010, '橙线倒吊', 147, '/uploads/img_1761912275403_790977032.jpg', '成鱼后身体为暗黄褐色，身体布满深色不规则条纹，形态与橙眼鲷相似，但眼睛处没有橙色斑块；不会伤害珊瑚，适合350升以上珊瑚缸饲养。对同类有攻击行为，最好一个缸只放一条。'),
(20011, '珍珠倒吊', 68, '/uploads/img_1761912302274_704540205.jpg', '鱼体基色深黑，尾鳍艳黄或白色，体侧均匀分布着珍珠般细小的白色斑点，对比十分强烈，因此得名。价格十分昂贵，是不折不扣的土豪海水鱼品种。'),
(20012, '白尾倒吊', 76, '/uploads/img_1761912329912_115766095.jpg', '属体形较小的倒吊类海洋观赏鱼品种。幼鱼呈鲜黄色，成鱼后颜色逐渐转为橘褐色，头部分布着淡黄色斑点，体侧均匀分布着漂亮的暗色水平条纹。因成鱼尾鳍的一抹亮白色而得名。'),
(20013, '多彩神仙鱼', 74, '/uploads/img_1761912383041_221482464.jpg', '鱼体从灰到橘色又过渡到黄色，背鳍及臀鳍是黑蓝色，尾鳍是黄色。头部亮蓝色的迷宫花纹显得神秘感十足。身体中部有一亮白色块。产量很大，价格适中，但很少有人进口，一直被错误地认为是很难饲养的品种。'),
(20014, '黑尾神仙鱼', 60, '/uploads/img_1761912421171_990267020.jpg', '鱼体前2/3部分为乳白银金属色，后1/3为黑色，黑色部分的边缘为荧光的亮蓝色，非常抢眼。胸鳍附近有淡黄条纹，眼睛带有橘红色的圈。鳞片大而且立体感与质感都非常的强。'),
(20015, '黄肚神仙鱼', 520, '/uploads/img_1761912465263_81337073.jpg', '胆子很小，在市面上少见。吻部沿腹部到臀鳍均为鲜黄色，其他部分为亮蓝色，靓丽的颜色很容易吸引人们注意力。饲养难度很大，鱼友常笑称半月仙的含义就是半个月就升仙。'),
(20016, '火焰神仙鱼', 240, '/uploads/img_1761912497723_975139626.jpg', '鱼体及背鳍、臀鳍主要为橘红色，体侧鳃后至尾鳍为金黄色，分布5-6条黑色垂直纵纹。背鳍及臀鳍末端有蓝紫色边纹，酷似火箭喷射出来的火焰，动感十足。在海缸中非常的抢眼，绝对是万众瞩目的主角。'),
(20017, '虎纹神仙鱼', 169, '/uploads/img_1761912558060_389239020.jpg', '外形美丽，体侧拥有橘黄色虎斑状纵向条纹，鱼体末端及尾鳍为黑色，并有蓝白色边缘。产量很高，较为常见，价格相对较低。成体不容易适应新环境，选购时尽量不要挑选太大的个体。'),
(20018, '波斯蝴蝶鱼', 84, '/uploads/img_1761912599977_582977302.jpg', '与坦克系列蝴蝶鱼血缘很近，十分相似，且均生活于深海地带。身体主要以黑白两色构成，体侧分布三条黑色斜纹，第一条位于眼部，第二条在鳃盖末端，第三条在尾部覆盖了后半部分。是饲养相对容易一些的鲽鱼品种。'),
(20019, '怪蝴蝶鱼', 324, '/uploads/img_1761912638871_708098443.jpg', '属于热带海水鱼，水族贸易中非常少见，在自然界中仅取食鹿角珊瑚属的活珊瑚虫，人工饲养难度很高，在鱼缸里可能会拒绝任何食物，包括自然食谱中的珊瑚。'),
(20020, '暗带蝴蝶鱼', 57, '/uploads/img_1761912674647_170219069.jpg', '不属于可食用的经济鱼种，也少见于水族贸易，仅在日本的水族馆中可见饲养，据说很容易适应鱼缸环境。可放置于冷水鱼类的纯鱼缸中，布置岩石造景同时保证有足够的开阔空间供其有用。'),
(20021, '白帽小丑鱼', 42, '/uploads/img_1761912712228_761877819.jpg', '鱼体呈桔黄色，头顶白色斑块像帽子一样，因此得名。与银背小丑、咖啡小丑、伯爵小丑在外表及行为上很相似。喜欢与地毯海葵或紫点海葵共生，是海缸裸缸及珊瑚缸非常理想的饲养品种。'),
(20022, '查戈斯双带小丑鱼', 65, '/uploads/img_1761912746541_633471047.jpg', '身体颜色与玫瑰小丑相近，但浅橘色的身体有两条带黑边的白色条纹，野生于海岸边的岩礁地区，偶尔也出现在10到25米深的岩礁上部，适合饲养于珊瑚缸及纯鱼缸。'),
(20023, '公子小丑鱼', 18, '/uploads/img_1761912781985_973622751.jpg', '栖息于珊瑚礁与海葵共生，体表黏液可保护其不被海葵伤害，非常活泼可爱，适应能力很强，很适合家庭水族饲养，迪士尼经典动画海底总动员中的主角尼莫，几乎已经成为了海水观赏鱼的代名词。'),
(20024, '黑单带小丑鱼', 45, '/uploads/img_1761912809361_963353476.jpg', '体色深棕至黑色，吻部浅灰，眼部后鳃盖附近有一条白色纵纹，但两边不会相连，颜色形态有些像是电影里的金刚，因此得名。喜与奶嘴海葵和紫点海葵伴生，但不是必须。');

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
(11, '李四', 123456, '18255556666', '11111111@qq.com', 'vip'),
(12, '李华', 123456, '18226254503', '1276656353@qq.com', 'admin');

--
-- 转储表的索引
--

--
-- 表的索引 `abouthistory`
--
ALTER TABLE `abouthistory`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `aboutintro`
--
ALTER TABLE `aboutintro`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `aboutmission`
--
ALTER TABLE `aboutmission`
  ADD PRIMARY KEY (`id`);

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
-- 表的索引 `fishtool`
--
ALTER TABLE `fishtool`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `footer`
--
ALTER TABLE `footer`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `freshwaterfish`
--
ALTER TABLE `freshwaterfish`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `picture`
--
ALTER TABLE `picture`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `saltwaterfish`
--
ALTER TABLE `saltwaterfish`
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
-- 使用表AUTO_INCREMENT `abouthistory`
--
ALTER TABLE `abouthistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `aboutintro`
--
ALTER TABLE `aboutintro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `aboutmission`
--
ALTER TABLE `aboutmission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- 使用表AUTO_INCREMENT `fishtool`
--
ALTER TABLE `fishtool`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30009;

--
-- 使用表AUTO_INCREMENT `footer`
--
ALTER TABLE `footer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `freshwaterfish`
--
ALTER TABLE `freshwaterfish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10025;

--
-- 使用表AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `picture`
--
ALTER TABLE `picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `saltwaterfish`
--
ALTER TABLE `saltwaterfish`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20025;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
