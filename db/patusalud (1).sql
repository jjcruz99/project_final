-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-02-2025 a las 23:02:51
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
-- Base de datos: `patusalud`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda_citas`
--

CREATE TABLE `agenda_citas` (
  `id_agenda_cita` int(11) NOT NULL,
  `id_usuario_FK` int(11) DEFAULT NULL,
  `id_psicologo_FK` int(11) DEFAULT NULL,
  `id_cita_FK` int(11) DEFAULT NULL,
  `fecha_cita` datetime NOT NULL,
  `id_estado_cita_FK` int(11) DEFAULT NULL,
  `observacion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `agenda_citas`
--

INSERT INTO `agenda_citas` (`id_agenda_cita`, `id_usuario_FK`, `id_psicologo_FK`, `id_cita_FK`, `fecha_cita`, `id_estado_cita_FK`, `observacion`) VALUES
(1, 7, 1, 1, '2025-02-20 09:00:00', 1, 'Primera sesión'),
(2, 8, 1, 2, '2025-02-20 10:00:00', 2, 'Confirmada por el cliente'),
(3, 9, 1, 3, '2025-02-21 11:30:00', 3, 'Cliente no asistió'),
(4, 10, 1, 4, '2025-02-21 14:00:00', 4, 'Evaluación realizada'),
(5, 11, 1, 5, '2025-02-22 16:00:00', 2, 'Confirmada por el cliente'),
(6, 12, 1, 6, '2025-02-23 09:00:00', 1, 'Primera sesión'),
(7, 7, 1, 7, '2025-02-23 11:00:00', 5, 'Cliente no asistió'),
(8, 8, 1, 8, '2025-02-24 15:30:00', 6, 'Reprogramada'),
(9, 9, 1, 1, '2025-02-24 17:00:00', 2, 'Confirmada por el cliente'),
(10, 10, 1, 2, '2025-02-25 08:00:00', 4, 'Evaluación realizada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `id_cita` int(11) NOT NULL,
  `descripcion` varchar(20) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`id_cita`, `descripcion`, `precio`) VALUES
(1, 'Psicoterapia Individ', 80000.00),
(2, 'Psicoterapia de Pare', 120000.00),
(3, 'Terapia Familiar', 100000.00),
(4, 'Evaluación Psicológi', 90000.00),
(5, 'Terapia en Línea', 70000.00),
(6, 'Terapia Infantil', 85000.00),
(7, 'Mindfulness y Reducc', 95000.00),
(8, 'Coaching Psicológico', 110000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedido`
--

CREATE TABLE `detalles_pedido` (
  `id_detalles_pedido` int(11) NOT NULL,
  `id_pedido_FK` int(11) DEFAULT NULL,
  `id_producto_FK` int(11) DEFAULT NULL,
  `id_agenda_cita_FK` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_cantidad` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `detalles_pedido`
--

INSERT INTO `detalles_pedido` (`id_detalles_pedido`, `id_pedido_FK`, `id_producto_FK`, `id_agenda_cita_FK`, `cantidad`, `precio_cantidad`) VALUES
(11, 1, 1, 1, 2, 153000.00),
(12, 1, 2, 2, 3, 77970.00),
(13, 2, 3, 3, 1, 99908.00),
(14, 3, 4, 4, 5, 670000.00),
(15, 4, 5, 5, 2, 240000.00),
(16, 5, 6, 6, 3, 300000.00),
(17, 6, 7, 7, 1, 173000.00),
(18, 7, 8, 8, 4, 520000.00),
(19, 8, 9, 9, 2, 586000.00),
(20, 9, 10, 10, 3, 249000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_cita`
--

CREATE TABLE `estado_cita` (
  `id_estado_cita` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `estado_cita`
--

INSERT INTO `estado_cita` (`id_estado_cita`, `descripcion`) VALUES
(1, 'Programada'),
(2, 'Confirmada'),
(3, 'Cancelada'),
(4, 'Completada'),
(5, 'No asistida'),
(6, 'Reprogramada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pedido`
--

CREATE TABLE `estado_pedido` (
  `id_estado_pedido` int(11) NOT NULL,
  `descripcion` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `estado_pedido`
--

INSERT INTO `estado_pedido` (`id_estado_pedido`, `descripcion`) VALUES
(1, 'Pendiente'),
(2, 'Procesando'),
(3, 'Enviado'),
(4, 'Entregado'),
(5, 'Cancelado'),
(6, 'Devuelto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario_FK` int(11) DEFAULT NULL,
  `id_estado_pedido_FK` int(11) DEFAULT NULL,
  `precio_total` decimal(10,2) DEFAULT NULL,
  `fecha_pedido` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_usuario_FK`, `id_estado_pedido_FK`, `precio_total`, `fecha_pedido`) VALUES
(1, 7, 1, 430000.00, '2025-02-19 08:00:00'),
(2, 8, 2, 225000.00, '2025-02-20 10:00:00'),
(3, 9, 3, 99908.00, '2025-02-21 11:30:00'),
(4, 10, 4, 670000.00, '2025-02-21 14:00:00'),
(5, 11, 5, 240000.00, '2025-02-22 16:00:00'),
(6, 12, 6, 300000.00, '2025-02-23 09:00:00'),
(7, 7, 1, 173000.00, '2025-02-23 11:00:00'),
(8, 8, 2, 520000.00, '2025-02-24 15:30:00'),
(9, 9, 3, 586000.00, '2025-02-24 17:00:00'),
(10, 10, 4, 249000.00, '2025-02-25 08:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `referencia` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `cantidad_disponible` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) DEFAULT NULL,
  `observacion` varchar(100) DEFAULT NULL,
  `imagen_url` varchar(250) DEFAULT NULL,
  `nombreProducto` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `referencia`, `descripcion`, `cantidad_disponible`, `precio_unitario`, `observacion`, `imagen_url`, `nombreProducto`) VALUES
(1, 1000, 'antideslizantes, ecológicos, gruesos, de viaje', 10, 76500.00, NULL, 'https://sanisidrolonasar.vtexassets.com/arquivos/ids/157509-800-auto?v=637645485170970000&width=800&height=auto&aspect=true', 'Mats de yoga'),
(2, 1001, 'Bloque en espuma máximo confort', 10, 25990.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_698449-MCO79483193632_102024-F.webp', 'Bloques de yoga'),
(3, 1002, 'Para mejorar la flexibilidad y las posturas', 10, 99908.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_703884-CBT53971320157_022023-F.webp', 'Cinturones de yoga'),
(4, 1003, 'Ideales para hot yoga o prácticas intensas', 10, 134000.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_719791-CBT75865046604_042024-F.webp', 'Toallas antideslizantes'),
(5, 1004, 'Cuerda para saltar', 10, 120000.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_773055-MLU72821422833_112023-F.webp', 'Cuerdas con contador de saltos'),
(6, 1005, 'Step graduable', 10, 100000.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_688844-MLU78042982993_072024-F.webp', 'Step aeróbico'),
(7, 1006, 'Mancuernas con discos ajustables', 10, 173000.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_777274-MCO77416833165_072024-F.webp', 'Mancuernas ajustables'),
(8, 1007, 'Mancuernas', 10, 130000.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_878000-MCO76758005007_052024-F.webp', 'Pesa rusa'),
(9, 1008, 'Difusores aromatizar para el ambiente', 10, 293000.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_945007-MCO79604865176_102024-F.webp', 'Difusores'),
(10, 1009, 'Aceites para aromaterapia', 10, 83000.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_641157-MLU75760879157_042024-F.webp', 'Aceites esenciales'),
(11, 1010, 'Suplemento', 10, 105000.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_859986-MLA76200796666_052024-F.webp', 'Omega 3'),
(12, 1011, 'Fragancias calmantes como lavanda o eucalipto', 10, 38000.00, NULL, 'https://http2.mlstatic.com/D_NQ_NP_2X_688223-MCO79579552278_102024-F.webp', 'Velas aromáticas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `psicologo`
--

CREATE TABLE `psicologo` (
  `id_psicologo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `identificacion` bigint(20) NOT NULL,
  `celular` bigint(20) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `observacion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `psicologo`
--

INSERT INTO `psicologo` (`id_psicologo`, `nombre`, `apellido`, `identificacion`, `celular`, `correo`, `ciudad`, `observacion`) VALUES
(1, 'Luis Henrique', 'Torres', 5566778899, 3067890123, 'luis.torres@example.com', 'Bogotá', 'Sin observaciones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `identificacion` bigint(20) NOT NULL,
  `celular` bigint(20) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `observacion` varchar(100) DEFAULT NULL,
  `contraseña` varchar(50) DEFAULT NULL,
  `foto` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `identificacion`, `celular`, `correo`, `ciudad`, `direccion`, `observacion`, `contraseña`, `foto`) VALUES
(7, 'Patu', 'Salud', 1234567890, 3001234567, 'Patusalud@gmail.com', 'Bogotá', 'Calle 1 #23-45', 'Sin observaciones', '09477be701749a213c8ed019958c34c89ed98adc0903917676', 0x2e2e2f696d672f4c6f676f2e706e67),
(8, 'Yulian', 'Vargas', 987654321, 3012345678, 'yulian.vargas@patusalud.com', 'Medellín', 'Carrera 2 #34-56', 'Sin observaciones', 'c9d5ccc74daa5fde8c763865889179b81660fee8e23b43e5d6', 0x2e2e2f696d672f79756c69616e2e6a7067),
(9, 'Angie', 'Barón', 1122334455, 3023456789, 'angie.baron@patusalud.com', 'Cali', 'Avenida 3 #45-67', 'Sin observaciones', '1ff5a4bf7c51d94751e1266eb5fbf4f8788d40820814b7cc2c', 0x2e2e2f696d672f416e6769652e706e67),
(10, 'John', 'Cruz', 2233445566, 3034567890, 'john.cruz@patusalud.com', 'Barranquilla', 'Diagonal 4 #56-78', 'Sin observaciones', 'bf2564434ac3d32e514cecb7dde158d9c26b8a91b0166cbc21', 0x2e2e2f696d672f6a6f686e2e6a7067),
(11, 'Katherinne', 'Cárdenas', 3344556677, 3045678901, 'katherinne.cardenas@patusalud.com', 'Cartagena', 'Transversal 5 #67-89', 'Sin observaciones', 'ca1f454d33e153d1c1d10a8ec1872b57ecee67a460f1271315', 0x2e2e2f696d672f6b617468652e6a7067),
(12, 'Gissell', 'Trejos', 4455667788, 3056789012, 'gissell.trejos@patusalud.com', 'Pereira', 'Calle 6 #78-90', 'Sin observaciones', '91162bc5ec49fe3dd56302595f79a4571065ad00e8c762cc50', 0x2e2e2f696d672f47697373656c6c2e706e67);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agenda_citas`
--
ALTER TABLE `agenda_citas`
  ADD PRIMARY KEY (`id_agenda_cita`),
  ADD KEY `id_usuario_FK` (`id_usuario_FK`),
  ADD KEY `id_psicologo_FK` (`id_psicologo_FK`),
  ADD KEY `id_cita_FK` (`id_cita_FK`),
  ADD KEY `id_estado_cita_FK` (`id_estado_cita_FK`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id_cita`);

--
-- Indices de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD PRIMARY KEY (`id_detalles_pedido`),
  ADD KEY `id_pedido_FK` (`id_pedido_FK`),
  ADD KEY `id_producto_FK` (`id_producto_FK`),
  ADD KEY `id_agenda_cita_FK` (`id_agenda_cita_FK`);

--
-- Indices de la tabla `estado_cita`
--
ALTER TABLE `estado_cita`
  ADD PRIMARY KEY (`id_estado_cita`);

--
-- Indices de la tabla `estado_pedido`
--
ALTER TABLE `estado_pedido`
  ADD PRIMARY KEY (`id_estado_pedido`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario_FK` (`id_usuario_FK`),
  ADD KEY `id_estado_pedido_FK` (`id_estado_pedido_FK`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `psicologo`
--
ALTER TABLE `psicologo`
  ADD PRIMARY KEY (`id_psicologo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agenda_citas`
--
ALTER TABLE `agenda_citas`
  MODIFY `id_agenda_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  MODIFY `id_detalles_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `estado_cita`
--
ALTER TABLE `estado_cita`
  MODIFY `id_estado_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `estado_pedido`
--
ALTER TABLE `estado_pedido`
  MODIFY `id_estado_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `psicologo`
--
ALTER TABLE `psicologo`
  MODIFY `id_psicologo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agenda_citas`
--
ALTER TABLE `agenda_citas`
  ADD CONSTRAINT `agenda_citas_ibfk_1` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `agenda_citas_ibfk_2` FOREIGN KEY (`id_psicologo_FK`) REFERENCES `psicologo` (`id_psicologo`),
  ADD CONSTRAINT `agenda_citas_ibfk_3` FOREIGN KEY (`id_cita_FK`) REFERENCES `cita` (`id_cita`),
  ADD CONSTRAINT `agenda_citas_ibfk_4` FOREIGN KEY (`id_estado_cita_FK`) REFERENCES `estado_cita` (`id_estado_cita`);

--
-- Filtros para la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD CONSTRAINT `detalles_pedido_ibfk_1` FOREIGN KEY (`id_pedido_FK`) REFERENCES `pedido` (`id_pedido`),
  ADD CONSTRAINT `detalles_pedido_ibfk_2` FOREIGN KEY (`id_producto_FK`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `detalles_pedido_ibfk_3` FOREIGN KEY (`id_agenda_cita_FK`) REFERENCES `agenda_citas` (`id_agenda_cita`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario_FK`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`id_estado_pedido_FK`) REFERENCES `estado_pedido` (`id_estado_pedido`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
