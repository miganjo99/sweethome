-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2024 a las 21:21:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fotocasav2`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `procedure_like` (IN `nombre` VARCHAR(255), IN `num_vivienda` INT)   BEGIN
    DECLARE user_id INT;
    DECLARE like_exists BOOLEAN;

    SELECT id_user INTO user_id
    FROM users
    WHERE username = nombre;

    SELECT COUNT(*) INTO like_exists
    FROM likes
    WHERE id_user = user_id AND id_vivienda = num_vivienda;

    IF like_exists THEN
        DELETE FROM likes WHERE id_user = user_id AND id_vivienda = num_vivienda;
        SELECT 'borrar' AS result;
    ELSE
        INSERT INTO likes (id_user, id_vivienda) VALUES (user_id, num_vivienda);
        SELECT 'add' AS result;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(10) NOT NULL,
  `name_categoria` varchar(25) NOT NULL,
  `img_categoria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `name_categoria`, `img_categoria`) VALUES
(1, 'Obra nueva', 'view/img/categoria/obra_nueva.jpg'),
(2, 'Buen estado', 'view/img/categoria/buen_estado.jpg'),
(3, 'A reformar', 'view/img/categoria/a_reformar.jpg'),
(4, 'Terreno', 'view/img/categoria/terreno.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `id_ciudad` int(10) NOT NULL,
  `name_ciudad` varchar(25) NOT NULL,
  `img_ciudad` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id_ciudad`, `name_ciudad`, `img_ciudad`) VALUES
(1, 'Valencia', 'view/img/ciudad/valencia.jpg'),
(2, 'Madrid', 'view/img/ciudad/madrid.jpg'),
(3, 'Barcelona', 'view/img/ciudad/barcelona.jpg'),
(4, 'Santander', 'view/img/ciudad/santander.jpg'),
(5, 'Ontinyent', 'view/img/ciudad/ontinyent.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exceptions`
--

CREATE TABLE `exceptions` (
  `type_error` int(10) NOT NULL,
  `spot` varchar(100) NOT NULL,
  `current_date_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `exceptions`
--

INSERT INTO `exceptions` (`type_error`, `spot`, `current_date_time`) VALUES
(503, 'Carrusel_Categoria HOME', '2022-03-18 23:54:35'),
(503, 'Carrusel_Categoria HOME', '2022-03-18 23:54:39'),
(503, 'Carrusel_Categoria HOME', '2022-03-18 23:54:40'),
(503, 'Carrusel_Categoria HOME', '2022-03-18 23:54:41'),
(503, 'Carrusel_Categoria HOME', '2022-03-18 23:54:41'),
(503, 'Carrusel_Categoria HOME', '2022-03-18 23:56:23'),
(503, 'Carrusel_Categoria HOME', '2022-03-18 23:56:29'),
(503, 'Carrusel_Categoria HOME', '2022-03-18 23:57:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extras`
--

CREATE TABLE `extras` (
  `id_extra` int(11) NOT NULL,
  `name_extra` varchar(30) NOT NULL,
  `img_extra` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_vivienda`
--

CREATE TABLE `img_vivienda` (
  `id_img` int(10) NOT NULL,
  `id_vivienda` int(10) DEFAULT NULL,
  `img_vivienda` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `img_vivienda`
--

INSERT INTO `img_vivienda` (`id_img`, `id_vivienda`, `img_vivienda`) VALUES
(1, 1, 'view/img/vivienda/vivienda1.1.jpg'),
(2, 1, 'view/img/vivienda/vivienda1.2.jpg'),
(3, 1, 'view/img/vivienda/vivienda1.3.jpg'),
(4, 1, 'view/img/vivienda/vivienda1.4.jpg'),
(5, 2, 'view/img/vivienda/vivienda2.1.jpg'),
(6, 2, 'view/img/vivienda/vivienda2.2.jpg'),
(7, 2, 'view/img/vivienda/vivienda2.3.jpg'),
(8, 2, 'view/img/vivienda/vivienda2.4.jpg'),
(9, 3, 'view/img/vivienda/vivienda3.1.jpg'),
(10, 3, 'view/img/vivienda/vivienda3.2.jpg'),
(11, 3, 'view/img/vivienda/vivienda3.3.jpg'),
(12, 3, 'view/img/vivienda/vivienda3.4.jpg'),
(13, 4, 'view/img/vivienda/vivienda4.1.jpg'),
(14, 4, 'view/img/vivienda/vivienda4.2.jpg'),
(15, 4, 'view/img/vivienda/vivienda4.3.jpg'),
(16, 4, 'view/img/vivienda/vivienda4.4.jpg'),
(17, 5, 'view/img/vivienda/vivienda5.1.jpg'),
(18, 5, 'view/img/vivienda/vivienda5.2.jpg'),
(19, 5, 'view/img/vivienda/vivienda5.3.jpg'),
(20, 5, 'view/img/vivienda/vivienda5.4.jpg'),
(21, 6, 'view/img/vivienda/vivienda6.1.jpg'),
(22, 6, 'view/img/vivienda/vivienda6.2.jpg'),
(23, 6, 'view/img/vivienda/vivienda6.3.jpg'),
(24, 6, 'view/img/vivienda/vivienda6.4.jpg'),
(25, 7, 'view/img/vivienda/vivienda7.1.jpg'),
(26, 7, 'view/img/vivienda/vivienda7.2.jpg'),
(27, 7, 'view/img/vivienda/vivienda7.3.jpg'),
(28, 7, 'view/img/vivienda/vivienda7.4.jpg'),
(29, 8, 'view/img/vivienda/vivienda8.1.jpg'),
(30, 8, 'view/img/vivienda/vivienda8.2.jpg'),
(31, 8, 'view/img/vivienda/vivienda8.3.jpg'),
(32, 8, 'view/img/vivienda/vivienda8.4.jpg'),
(33, 9, 'view/img/vivienda/vivienda9.1.jpg'),
(34, 9, 'view/img/vivienda/vivienda9.2.jpg'),
(35, 9, 'view/img/vivienda/vivienda9.3.jpg'),
(36, 9, 'view/img/vivienda/vivienda9.4.jpg'),
(37, 10, 'view/img/vivienda/vivienda10.1.jpg'),
(38, 10, 'view/img/vivienda/vivienda10.2.jpg'),
(39, 10, 'view/img/vivienda/vivienda10.3.jpg'),
(40, 10, 'view/img/vivienda/vivienda10.4.jpg'),
(41, 11, 'view/img/vivienda/vivienda11.1.jpg'),
(42, 11, 'view/img/vivienda/vivienda11.2.jpg'),
(43, 11, 'view/img/vivienda/vivienda11.3.jpg'),
(44, 11, 'view/img/vivienda/vivienda11.4.jpg'),
(45, 12, 'view/img/vivienda/vivienda12.1.jpg'),
(46, 12, 'view/img/vivienda/vivienda12.2.jpg'),
(47, 12, 'view/img/vivienda/vivienda12.3.jpg'),
(48, 12, 'view/img/vivienda/vivienda12.4.jpg'),
(49, 13, 'view/img/vivienda/vivienda13.1.jpg'),
(50, 13, 'view/img/vivienda/vivienda13.2.jpg'),
(51, 13, 'view/img/vivienda/vivienda13.3.jpg'),
(52, 13, 'view/img/vivienda/vivienda13.4.jpg'),
(53, 14, 'view/img/vivienda/vivienda14.1.jpg'),
(54, 14, 'view/img/vivienda/vivienda14.2.jpg'),
(55, 14, 'view/img/vivienda/vivienda14.3.jpg'),
(56, 14, 'view/img/vivienda/vivienda14.4.jpg'),
(57, 15, 'view/img/vivienda/vivienda15.1.jpg'),
(58, 15, 'view/img/vivienda/vivienda15.2.jpg'),
(59, 15, 'view/img/vivienda/vivienda15.3.jpg'),
(60, 15, 'view/img/vivienda/vivienda15.4.jpg'),
(61, 16, 'view/img/vivienda/vivienda16.1.jpg'),
(62, 16, 'view/img/vivienda/vivienda16.2.jpg'),
(63, 16, 'view/img/vivienda/vivienda16.3.jpg'),
(64, 16, 'view/img/vivienda/vivienda16.4.jpg'),
(65, 17, 'view/img/vivienda/vivienda17.1.jpg'),
(66, 17, 'view/img/vivienda/vivienda17.2.jpg'),
(67, 17, 'view/img/vivienda/vivienda17.3.jpg'),
(68, 17, 'view/img/vivienda/vivienda17.4.jpg'),
(69, 18, 'view/img/vivienda/vivienda18.1.jpg'),
(70, 18, 'view/img/vivienda/vivienda18.2.jpg'),
(71, 18, 'view/img/vivienda/vivienda18.3.jpg'),
(72, 18, 'view/img/vivienda/vivienda18.4.jpg'),
(73, 19, 'view/img/vivienda/vivienda19.1.jpg'),
(74, 19, 'view/img/vivienda/vivienda19.2.jpg'),
(75, 19, 'view/img/vivienda/vivienda19.3.jpg'),
(76, 19, 'view/img/vivienda/vivienda19.4.jpg'),
(77, 20, 'view/img/vivienda/vivienda20.1.jpg'),
(78, 20, 'view/img/vivienda/vivienda20.2.jpg'),
(79, 20, 'view/img/vivienda/vivienda20.3.jpg'),
(80, 20, 'view/img/vivienda/vivienda20.4.jpg'),
(81, 21, 'view/img/vivienda/vivienda21.1.jpg'),
(82, 21, 'view/img/vivienda/vivienda21.2.jpg'),
(83, 21, 'view/img/vivienda/vivienda21.3.jpg'),
(84, 21, 'view/img/vivienda/vivienda21.4.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `innovacion`
--

CREATE TABLE `innovacion` (
  `id_innovacion` int(10) NOT NULL,
  `name_innovacion` varchar(30) NOT NULL,
  `img_innovacion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `innovacion`
--

INSERT INTO `innovacion` (`id_innovacion`, `name_innovacion`, `img_innovacion`) VALUES
(1, 'Sostenible', 'view/img/innovacion/sostenible.jpg'),
(2, 'Multifuncional', 'view/img/innovacion/multifuncional.jpg'),
(3, 'Domótica', 'view/img/innovacion/domotica.jpg'),
(4, 'Comunitaria', 'view/img/innovacion/comunitarias.jpg'),
(5, 'Vanguardista', 'view/img/innovacion/vanguardista.jpg'),
(6, 'Adaptada', 'view/img/innovacion/adaptado.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_vivienda` int(10) NOT NULL,
  `id_user` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id_vivienda`, `id_user`) VALUES
(2, 14),
(10, 41),
(18, 41),
(2, 47),
(3, 47),
(9, 47),
(2, 41),
(1, 41);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operacion`
--

CREATE TABLE `operacion` (
  `id_operacion` int(10) NOT NULL,
  `name_operacion` varchar(30) NOT NULL,
  `img_operacion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `operacion`
--

INSERT INTO `operacion` (`id_operacion`, `name_operacion`, `img_operacion`) VALUES
(1, 'Compra', 'view/img/operacion/compra.jpg'),
(2, 'Alquiler', 'view/img/operacion/alquiler.jpg'),
(3, 'Compartir', 'view/img/operacion/compartir.jpg'),
(4, 'Alquiler de habitación', 'view/img/operacion/alquiler_habitacion.jpg'),
(5, 'Alquiler con compra', 'view/img/operacion/alquiler_con_compra.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orientacion`
--

CREATE TABLE `orientacion` (
  `id_orientacion` int(10) NOT NULL,
  `name_orientacion` varchar(30) NOT NULL,
  `img_orientacion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orientacion`
--

INSERT INTO `orientacion` (`id_orientacion`, `name_orientacion`, `img_orientacion`) VALUES
(1, 'Norte', ''),
(2, 'Sur', ''),
(3, 'Este', ''),
(4, 'Oeste', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `id_tipo` int(10) NOT NULL,
  `name_tipo` varchar(25) NOT NULL,
  `img_tipo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo`
--

INSERT INTO `tipo` (`id_tipo`, `name_tipo`, `img_tipo`) VALUES
(1, 'chalet', 'view/img/tipo/chalet.png'),
(2, 'finca', 'view/img/tipo/finca.png'),
(3, 'piso', 'view/img/tipo/piso.png'),
(4, 'casa', 'view/img/tipo/casa.png'),
(5, 'apartamento', 'view/img/tipo/apartamento.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(30) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `type_user`, `avatar`) VALUES
(1, 'Manolo12', '$2y$12$m1NUfknCHduyTPIviIcyd.IWz8N6EqPsBHYaUy1fWJ9MN3E032G/y', 'manolo@gamil.com', 'client', 'https://i.pravatar.cc/500?u=84288f04b18fdd9897d5d1053c344583'),
(14, 'Miguel99', '$2y$12$qjen7QF.pQ4S6CLAR/WzuuuI1uvhSTpnK.lpNnaq0VUsX0EKKRXQi', 'miguelgandiajorda@gmail.com', 'admin', 'https://robohash.org/bcad65cbb7e72b2c3eb99b8f4a4d41ee'),
(31, 'Carlos29', '$2y$12$DUmul1bagMdxtsqur.jNK.u01rZ.sKC3nBfs58PmUwgBZm.pxV.Wi', 'carlos@gmail.com', 'client', 'https://robohash.org/db1e0a3750e0399df3eeee808187d9b4'),
(38, 'Carla29 ', '$2y$12$ArMAmb7UPHEbzxo9so1BWOSjCzgBhqL0TtgzZJgmmy42q7UuJi4LO', 'carla@gmail.com', 'client', 'https://i.pravatar.cc/400?u=62779a64d5b24b7fd3d5026977b7a87a'),
(39, 'Juan29', '$2y$12$dbwGopIYSRfpSu5qRkF.3uLq1kQUxSMmVbjUBSdJqGjJOr.hhaxfi', 'juan@gmail.com', 'client', 'https://i.pravatar.cc/500?u=7038663cc684aa330956752c7e6fe7d4'),
(40, 'miganjo99', '$2y$12$.qe1rYh9uSBJyVq/W67PsuB.N4fBRtHkQktYeXJJbqQSV68crQoai', 'miganjo99@gmail.com', 'client', 'https://i.pravatar.cc/500?u=2614a9856a92e818548944f7483827d8'),
(41, 'Manolo', '$2y$12$M9PVCDlhn2xpimxq6h1DzeCQSnSDIUtrAFx2bCmH9S3of8sezLJCK', 'manolo99@gamil.com', 'client', 'https://i.pravatar.cc/500?u=366162d0d822352e012caabf289a0469'),
(42, 'Paquito', '$2y$12$zHjdTLVYXOQG3j0A9S2lQu6DALEwvWagQ/py/m42JSAxLmeFEF.SK', 'paco@gmail.com', 'client', 'https://i.pravatar.cc/500?u=9433c7805a2182412b8b731b5b26a78f'),
(43, 'Gorrino', '$2y$12$MF0Kv8ZDwQIKdwoUvLKR3Op9QuGqSB8JAeGRZm.q4t/EDRZ..t7Xm', 'gorrino@gmail.com', 'client', 'https://i.pravatar.cc/500?u=9de89f7ed823616ded4c624e5a47c220'),
(44, 'Alejandro', '$2y$12$b/7dDBShXKBXWhrweupJAeVVXFKCPzczwZ3jdTgghyJ0wfkecB18y', 'alejandro@gmail.com', 'client', 'https://i.pravatar.cc/500?u=18b4e9b9450c05debf46e47fe56d80f0'),
(45, 'angelines', '$2y$12$T6zDTa8h2bLCjH.Q5aH.ku2BwtN4xY.BYtaGvebX2gWsNORG3geHe', 'ange@gmail.com', 'client', 'https://i.pravatar.cc/500?u=5350ca9e5893fa2517aebbdb316bd6dd'),
(46, 'Vicentin', '$2y$12$bwtjbZOp7yC9ubN22puPB.Rd0yJxex7YcmIIsWjcI6ltALz.ZQV3K', 'vicentin@gmail.com', 'client', 'https://i.pravatar.cc/500?u=23cf535d0ead00784a9ebe0de8c35f0b'),
(47, 'Vicent', '$2y$12$jdpuRR3WEeiC6goUHqLmTeqLWVauI5JjEEWAfBvfhzW2K84wHQphW', 'vicent@gmail.com', 'client', 'https://i.pravatar.cc/500?u=16213c6eafa5426b47488474294cad0a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `id_vivienda` int(10) NOT NULL,
  `num_visitas` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `visitas`
--

INSERT INTO `visitas` (`id_vivienda`, `num_visitas`) VALUES
(1, 64),
(2, 38),
(3, 20),
(4, 14),
(5, 13),
(6, 14),
(7, 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda`
--

CREATE TABLE `vivienda` (
  `id_vivienda` int(10) NOT NULL,
  `estado` varchar(30) DEFAULT NULL,
  `antiguedad` int(8) DEFAULT NULL,
  `num_habs` varchar(20) DEFAULT NULL,
  `fecha_publicacion` varchar(10) DEFAULT NULL,
  `precio` int(8) DEFAULT NULL,
  `img_vivienda` varchar(300) NOT NULL,
  `aseos` int(3) NOT NULL,
  `m2` int(8) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `long` float NOT NULL,
  `lat` float NOT NULL,
  `id_tipo` int(10) NOT NULL,
  `id_operacion` int(10) NOT NULL,
  `id_categoria` int(10) NOT NULL,
  `id_ciudad` int(10) NOT NULL,
  `id_img` int(10) NOT NULL,
  `id_extra` int(10) NOT NULL,
  `id_orientacion` int(10) NOT NULL,
  `id_innovacion` int(10) NOT NULL,
  `num_likes` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vivienda`
--

INSERT INTO `vivienda` (`id_vivienda`, `estado`, `antiguedad`, `num_habs`, `fecha_publicacion`, `precio`, `img_vivienda`, `aseos`, `m2`, `descripcion`, `long`, `lat`, `id_tipo`, `id_operacion`, `id_categoria`, `id_ciudad`, `id_img`, `id_extra`, `id_orientacion`, `id_innovacion`, `num_likes`) VALUES
(1, 'a reformar', 50, '4', '10/01/2015', 150000, 'view/img/vivienda/vivienda1.1.jpg', 3, 200, 'Encantadora casa rústica en colinas, con vigas de madera, chimenea de piedra y jardín de flores. Invita a vivir en serenidad y conexión con la naturaleza.', -0.3773, 39.46, 1, 1, 1, 1, 1, 0, 1, 2, 0),
(2, 'reformado', 30, '5', '10/01/2019', 35000, 'view/img/vivienda/vivienda2.1.jpg', 1, 100, 'Moderna residencia en el centro urbano con diseño vanguardista, grandes ventanales y terraza en la azotea. Interior minimalista y tecnológico para un estilo de vida contemporáneo.', -3.703, 40.419, 2, 2, 2, 2, 5, 0, 1, 2, 0),
(3, 'nuevo', 0, '3', '10/01/2020', 122000, 'view/img/vivienda/vivienda3.1.jpg', 3, 90, 'Majestuosa mansión del siglo XIX frente al océano, con columnas ornamentadas, balcones con vistas al mar y jardines exuberantes. Elegancia y distinción histórica.', 2.155, 41.37, 3, 3, 3, 3, 9, 0, 1, 1, 0),
(4, 'reformado', 25, '4', '10/01/2023', 200000, 'view/img/vivienda/vivienda4.1.jpg', 1, 190, 'Cabaña acogedora en medio del bosque, con paredes de madera, chimenea de piedra y ventanales panorámicos. Refugio perfecto para amantes de la naturaleza.', -3.703, 40.41, 2, 2, 2, 2, 13, 0, 1, 3, 0),
(5, 'a reformar', 45, '5', '10/01/2022', 55000, 'view/img/vivienda/vivienda5.1.jpg', 2, 80, 'Amplio loft en distrito artístico, con techos altos, paredes de ladrillo y suelos de concreto. Grandes ventanales permiten luz natural, creando un espacio inspirador para residentes creativos.', -0.37739, 39.4697, 1, 1, 1, 1, 17, 0, 1, 6, 0),
(6, 'correcto', 10, '4', '14/02/2024', 300000, 'view/img/vivienda/vivienda6.1.jpg', 2, 90, 'Excelente oportunidad de compra. En la zona de S-20 (Monte) encontramos a la venta este piso, distribuido en  2 habitaciones, salón comedor, cocina con tendedero y baño. Cabe destacar que cuenta con doble plaza de garaje y un gran trastero.', -3.80793, 43.461, 3, 1, 2, 4, 21, 2, 1, 5, 0),
(7, 'correcto', 0, '0', '16/02/2024', 70000, 'view/img/vivienda/vivienda7.1.jpg', 0, 4500, 'venta de parcela urbana residencial plurifamiliar para vivienda protegida ubicada en barrio de expansion de valencia, zona sociopolis, se encuentra en la zona mas consolidada y de mejor acceso del pai', -0.663732, 38.8197, 2, 5, 4, 5, 25, 2, 1, 4, 0),
(8, 'a reformar', 5, '3', '2024-03-24', 150000, 'view/img/vivienda/vivienda8.1.jpg', 2, 100, 'Cómoda casa familiar en excelente ubicación.', -3.7098, 40.4128, 3, 2, 1, 1, 29, 0, 2, 4, 0),
(9, 'reformado', 8, '4', '2024-03-24', 200000, 'view/img/vivienda/vivienda9.1.jpg', 3, 120, 'Amplia casa con jardín y garaje.', -3.7492, 40.4637, 1, 3, 2, 3, 33, 0, 3, 2, 0),
(10, 'nuevo', 10, '2', '2024-03-24', 120000, 'view/img/vivienda/vivienda10.1.jpg', 1, 80, 'Acogedor apartamento en el centro de la ciudad.', -3.7038, 40.4168, 2, 1, 3, 5, 37, 0, 1, 5, 0),
(11, 'correcto', 6, '5', '2024-03-24', 250000, 'view/img/vivienda/vivienda11.1.jpg', 4, 150, 'Espaciosa casa con vistas panorámicas.', -2.7492, 38.4637, 1, 4, 1, 2, 41, 0, 4, 3, 0),
(12, 'a reformar', 3, '3', '2024-03-24', 180000, 'view/img/vivienda/vivienda12.1.jpg', 2, 110, 'Encantadora casa adosada con patio privado.', -3.7018, 40.4118, 3, 2, 2, 4, 45, 0, 3, 6, 0),
(13, 'reformado', 7, '4', '2024-03-24', 220000, 'view/img/vivienda/vivienda13.1.jpg', 3, 130, 'Casa moderna con piscina y zona de barbacoa.', -3.7492, 40.4637, 1, 3, 3, 1, 49, 0, 2, 2, 0),
(14, 'nuevo', 4, '2', '2024-03-24', 130000, 'view/img/vivienda/vivienda14.1.jpg', 1, 90, 'Apartamento luminoso con balcón y vistas al mar.', -3.7038, 40.4168, 2, 2, 2, 5, 53, 0, 4, 4, 0),
(15, 'correcto', 9, '3', '2024-03-24', 190000, 'view/img/vivienda/vivienda15.1.jpg', 2, 120, 'Casa adosada con terraza y vistas al mar. Ubicada en una comunidad con zonas verdes y parque infantil.', -3.7738, 40.4468, 3, 1, 4, 3, 57, 0, 1, 2, 0),
(16, 'a reformar', 5, '4', '2024-03-24', 210000, 'view/img/vivienda/vivienda16.1.jpg', 3, 140, 'Casa de estilo rústico con encanto, rodeada de naturaleza y cerca de rutas de senderismo.', -3.7038, 40.4168, 3, 4, 1, 4, 61, 0, 2, 5, 0),
(17, 'reformado', 6, '3', '2024-03-24', 160000, 'view/img/vivienda/vivienda17.1.jpg', 2, 100, 'Casa adosada con patio y terraza en una comunidad tranquila. Ideal para parejas o familias pequeñas.', -2.7492, 35.4637, 1, 2, 2, 1, 65, 0, 3, 3, 0),
(18, 'nuevo', 8, '2', '2024-03-24', 140000, 'view/img/vivienda/vivienda18.1.jpg', 1, 80, 'Apartamento en urbanización con piscina comunitaria. Ideal como segunda residencia o inversión.', -3.8538, 40.4448, 2, 3, 3, 2, 69, 0, 4, 6, 0),
(19, 'correcto', 7, '5', '2024-03-24', 230000, 'view/img/vivienda/vivienda19.1.jpg', 4, 150, 'Casa de diseño con grandes ventanales y vistas.', -3.7492, 40.4637, 1, 4, 1, 3, 73, 0, 1, 2, 0),
(20, 'a reformar', 4, '3', '2024-03-24', 170000, 'view/img/vivienda/vivienda20.1.jpg', 2, 110, 'Casa luminosa con patio interior y trastero.', -3.7038, 40.4168, 3, 2, 2, 5, 77, 0, 3, 5, 0),
(21, 'correcto', 2, '3', '2024-04-05', 200000, 'view/img/vivienda/vivienda21.1.jpg', 2, 80, 'El piso cuenta con 2 habitaciones individuales, una doble y un baño, ideal para parejas jóvenes, familias pequeñas o inversores. Además, se encuentra en proceso de semireforma, lo que brinda la oportunidad perfecta para personalizar y adaptar el espacio según tus necesidades y gustos.', -0.31111, 39.222, 1, 3, 2, 1, 81, 0, 2, 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda_categoria`
--

CREATE TABLE `vivienda_categoria` (
  `id_vivienda` int(8) NOT NULL,
  `id_categoria` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vivienda_categoria`
--

INSERT INTO `vivienda_categoria` (`id_vivienda`, `id_categoria`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda_extra`
--

CREATE TABLE `vivienda_extra` (
  `id_vivienda` int(8) NOT NULL,
  `id_extra` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda_operacion`
--

CREATE TABLE `vivienda_operacion` (
  `id_vivienda` int(8) NOT NULL,
  `id_operacion` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vivienda_tipo`
--

CREATE TABLE `vivienda_tipo` (
  `id_vivienda` int(8) NOT NULL,
  `id_tipo` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id_ciudad`);

--
-- Indices de la tabla `extras`
--
ALTER TABLE `extras`
  ADD PRIMARY KEY (`id_extra`);

--
-- Indices de la tabla `img_vivienda`
--
ALTER TABLE `img_vivienda`
  ADD PRIMARY KEY (`id_img`),
  ADD KEY `id_vivienda` (`id_vivienda`);

--
-- Indices de la tabla `innovacion`
--
ALTER TABLE `innovacion`
  ADD PRIMARY KEY (`id_innovacion`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD KEY `id_vivienda` (`id_vivienda`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `operacion`
--
ALTER TABLE `operacion`
  ADD PRIMARY KEY (`id_operacion`);

--
-- Indices de la tabla `orientacion`
--
ALTER TABLE `orientacion`
  ADD PRIMARY KEY (`id_orientacion`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `id_user` (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`id_vivienda`);

--
-- Indices de la tabla `vivienda`
--
ALTER TABLE `vivienda`
  ADD PRIMARY KEY (`id_vivienda`),
  ADD KEY `id_tipo` (`id_tipo`),
  ADD KEY `id_img` (`id_img`),
  ADD KEY `id_ciudad` (`id_ciudad`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_operacion` (`id_operacion`),
  ADD KEY `id_extra` (`id_extra`),
  ADD KEY `id_orientacion` (`id_orientacion`),
  ADD KEY `id_innovacion` (`id_innovacion`);

--
-- Indices de la tabla `vivienda_categoria`
--
ALTER TABLE `vivienda_categoria`
  ADD PRIMARY KEY (`id_vivienda`,`id_categoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `vivienda_extra`
--
ALTER TABLE `vivienda_extra`
  ADD PRIMARY KEY (`id_vivienda`,`id_extra`),
  ADD KEY `id_extra` (`id_extra`);

--
-- Indices de la tabla `vivienda_operacion`
--
ALTER TABLE `vivienda_operacion`
  ADD PRIMARY KEY (`id_vivienda`,`id_operacion`),
  ADD KEY `id_operacion` (`id_operacion`);

--
-- Indices de la tabla `vivienda_tipo`
--
ALTER TABLE `vivienda_tipo`
  ADD PRIMARY KEY (`id_vivienda`,`id_tipo`),
  ADD KEY `id_tipo` (`id_tipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id_ciudad` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `extras`
--
ALTER TABLE `extras`
  MODIFY `id_extra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `img_vivienda`
--
ALTER TABLE `img_vivienda`
  MODIFY `id_img` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `operacion`
--
ALTER TABLE `operacion`
  MODIFY `id_operacion` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `orientacion`
--
ALTER TABLE `orientacion`
  MODIFY `id_orientacion` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tipo`
--
ALTER TABLE `tipo`
  MODIFY `id_tipo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `vivienda`
--
ALTER TABLE `vivienda`
  MODIFY `id_vivienda` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `extras`
--
ALTER TABLE `extras`
  ADD CONSTRAINT `extras_ibfk_1` FOREIGN KEY (`id_extra`) REFERENCES `vivienda` (`id_extra`);

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Filtros para la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD CONSTRAINT `visitas_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`);

--
-- Filtros para la tabla `vivienda`
--
ALTER TABLE `vivienda`
  ADD CONSTRAINT `vivienda_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `img_vivienda` (`id_vivienda`),
  ADD CONSTRAINT `vivienda_ibfk_2` FOREIGN KEY (`id_operacion`) REFERENCES `operacion` (`id_operacion`),
  ADD CONSTRAINT `vivienda_ibfk_3` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `vivienda_ibfk_4` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id_ciudad`),
  ADD CONSTRAINT `vivienda_ibfk_5` FOREIGN KEY (`id_img`) REFERENCES `img_vivienda` (`id_img`),
  ADD CONSTRAINT `vivienda_ibfk_6` FOREIGN KEY (`id_tipo`) REFERENCES `tipo` (`id_tipo`),
  ADD CONSTRAINT `vivienda_ibfk_7` FOREIGN KEY (`id_orientacion`) REFERENCES `orientacion` (`id_orientacion`),
  ADD CONSTRAINT `vivienda_ibfk_8` FOREIGN KEY (`id_innovacion`) REFERENCES `innovacion` (`id_innovacion`);

--
-- Filtros para la tabla `vivienda_categoria`
--
ALTER TABLE `vivienda_categoria`
  ADD CONSTRAINT `vivienda_categoria_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`),
  ADD CONSTRAINT `vivienda_categoria_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `vivienda_operacion`
--
ALTER TABLE `vivienda_operacion`
  ADD CONSTRAINT `vivienda_operacion_ibfk_1` FOREIGN KEY (`id_operacion`) REFERENCES `operacion` (`id_operacion`),
  ADD CONSTRAINT `vivienda_operacion_ibfk_2` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`);

--
-- Filtros para la tabla `vivienda_tipo`
--
ALTER TABLE `vivienda_tipo`
  ADD CONSTRAINT `vivienda_tipo_ibfk_1` FOREIGN KEY (`id_vivienda`) REFERENCES `vivienda` (`id_vivienda`),
  ADD CONSTRAINT `vivienda_tipo_ibfk_2` FOREIGN KEY (`id_tipo`) REFERENCES `tipo` (`id_tipo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
