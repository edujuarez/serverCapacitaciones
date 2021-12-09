-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-11-2021 a las 00:59:27
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `capacitacionesdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistentes`
--

CREATE TABLE `asistentes` (
  `idasistente` int(4) NOT NULL,
  `nombre` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `legajo` int(4) NOT NULL,
  `tipodoc` varchar(5) COLLATE utf8_spanish2_ci NOT NULL,
  `dni` int(8) NOT NULL,
  `cargo` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `sector` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `fechaingreso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `asistentes`
--

INSERT INTO `asistentes` (`idasistente`, `nombre`, `legajo`, `tipodoc`, `dni`, `cargo`, `sector`, `fechaingreso`) VALUES
(3, 'eduardo juarez', 150, 'dni', 37270547, 'soporte', 'HelpDesk', '2021-03-01'),
(15, 'test1', 1, '1', 1, '1', '1', '1111-11-11'),
(16, 'tefi', 111, '1', 1, '1', '1', '2021-10-05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capacitaciones`
--

CREATE TABLE `capacitaciones` (
  `idcapacitacion` int(5) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `temario` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `tipo` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `certificacion` varchar(4) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `plan` varchar(4) COLLATE utf8_spanish2_ci NOT NULL,
  `material` varchar(4) COLLATE utf8_spanish2_ci NOT NULL,
  `observaciones` text COLLATE utf8_spanish2_ci NOT NULL,
  `asistentes` varchar(250) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `capacitaciones`
--

INSERT INTO `capacitaciones` (`idcapacitacion`, `nombre`, `temario`, `tipo`, `certificacion`, `fecha`, `plan`, `material`, `observaciones`, `asistentes`) VALUES
(3, '12', '12', '12', '12', '2021-10-12', '12', 'no', '12', '12'),
(4, '1', '1', '1', '1', '2021-10-12', '1', 'no', '1', '1'),
(5, 'Ruben Eduardo', '1234', '', '', '0000-00-00', '', '', '2222', 'ejemplo2'),
(6, '333', '333', 'Preventiva', 'No', '0000-00-00', '', '', '333', 'ejemplo'),
(7, '333', '333', 'Preventiva', 'No', '0000-00-00', '', '', '333', 'ejemplo'),
(8, 'Ruben Eduardo', '1234', 'Preventiva', 'No', '2025-05-05', 'HyS', 'No', 'Observaciones', 'ejemplo2'),
(9, 'Capacitacion n1', 'n1', 'Preventiva', 'No', '2020-09-25', 'HyS', 'No', 'Capacitacion n1', 'ejemplo2'),
(10, 'Capacitacion numero 1 de tecnicas bla bl', 'bla bla bla', '', 'No', '2021-12-31', '', 'No', '123456', ''),
(11, '2', '2', '', '', '0000-00-00', 'HyS', '', '22222', ''),
(12, '3', '33', '', '', '0333-03-06', '', '', '3333', ''),
(13, '44', '44', '', '', '2021-10-22', '', '', '4444', ''),
(14, '555', '555', '', '', '2021-10-13', '', '', '555', ''),
(15, '666', '666', '', '', '2021-09-27', '', '', '666', ''),
(16, '777', '777', 'Preventiva', '', '2021-10-07', 'Otro', '', '7777', 'ejemplo2'),
(17, 'hola soy una capacitacion nueva', 'es un temario muy interesante', 'Desarrollo', 'No', '2021-12-31', 'HyS', 'No', 'hayyyy cuantas observaciones', 'Etc'),
(18, 'hola que talll hola que talll hola que t', 'hola que talll hola que talll hola que t', '', '', '1010-10-10', '', '', 'hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll ', ''),
(19, 'hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que t', 'hola que talll hola que talll hola que t', '', '', '0000-00-00', '', '', 'hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll hola que talll ', ''),
(20, 'capacitacion capacitacion', 'temario temario', 'Preventiva', 'No', '2021-12-31', 'HyS', 'No', 'observacion observacion', 'ejemplo2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cronograma`
--

CREATE TABLE `cronograma` (
  `idcapacitacion` int(5) NOT NULL,
  `nombrecapacitacion` varchar(40) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha` date NOT NULL,
  `asistentes` text COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistentes`
--
ALTER TABLE `asistentes`
  ADD PRIMARY KEY (`idasistente`);

--
-- Indices de la tabla `capacitaciones`
--
ALTER TABLE `capacitaciones`
  ADD PRIMARY KEY (`idcapacitacion`);

--
-- Indices de la tabla `cronograma`
--
ALTER TABLE `cronograma`
  ADD KEY `idcapacitacion` (`idcapacitacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistentes`
--
ALTER TABLE `asistentes`
  MODIFY `idasistente` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `capacitaciones`
--
ALTER TABLE `capacitaciones`
  MODIFY `idcapacitacion` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cronograma`
--
ALTER TABLE `cronograma`
  ADD CONSTRAINT `cronograma_ibfk_1` FOREIGN KEY (`idcapacitacion`) REFERENCES `capacitaciones` (`idcapacitacion`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
