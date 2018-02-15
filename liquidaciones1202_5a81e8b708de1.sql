-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-02-2018 a las 19:08:36
-- Versión del servidor: 10.1.9-MariaDB
-- Versión de PHP: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `liquidaciones1202_5a81e8b708de1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bonificacion`
--

CREATE TABLE `bonificacion` (
  `idbonificacion` int(11) NOT NULL COMMENT '0|',
  `cantidad` float DEFAULT NULL COMMENT '1|Cantidad',
  `validado` tinyint(4) DEFAULT NULL COMMENT '1|Validado',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `concepto` varchar(45) DEFAULT NULL COMMENT '1|Concepto',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Bonificaciones||chofer_chofer_idchofer.Nombre del Chofer,estado_estado_idestado.Estado,concepto.Concepto';

--
-- Volcado de datos para la tabla `bonificacion`
--

INSERT INTO `bonificacion` (`idbonificacion`, `cantidad`, `validado`, `fecha`, `estado_idestado`, `concepto`, `chofer_idchofer`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(7, 123, 1, '2018-02-07', 6, 'ENVÍO A TALLER', 10, NULL, 1, '2018-02-12 20:34:32', '2018-02-13 19:50:14'),
(8, 0.625, 0, '2018-02-13', 6, 'BONIFICACIÓN POR TIEMPO EN CORRALÓN', 10, NULL, NULL, '2018-02-13 19:16:16', '2018-02-13 19:50:01'),
(9, 19.9306, 0, '2018-02-14', 6, 'BONIFICACIÓN POR TIEMPO EN CORRALÓN', 11, NULL, NULL, '2018-02-14 20:56:55', '2018-02-14 20:56:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chofer`
--

CREATE TABLE `chofer` (
  `idchofer` int(11) NOT NULL COMMENT '0|',
  `licencia` varchar(40) DEFAULT NULL COMMENT '1|Licencia',
  `fianza` int(11) DEFAULT NULL COMMENT '1|Fianza',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `estado_idestado_fianza` int(3) NOT NULL COMMENT '1|Estado Fianza|nombre',
  `chofer` int(11) NOT NULL COMMENT '1|Chofer|nombre',
  `aval1` int(11) NOT NULL COMMENT '1|Aval 1|nombre',
  `aval2` int(11) NOT NULL COMMENT '1|Aval 2|nombre',
  `aval3` int(11) NOT NULL COMMENT '1|Aval 3|nombre',
  `aval4` int(11) NOT NULL COMMENT '1|Aval 4|nombre',
  `deudafianza` float DEFAULT NULL COMMENT '1|Deuda Fianza',
  `deudaliquidacion` float DEFAULT NULL COMMENT '1|Deuda Liquidación',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|2|Choferes||persona_chofer.Nombre de Chofer,estado_estado_idestado.Estado del Chofer,estado_estado_idestado_fianza.Estado de la Fianza';

--
-- Volcado de datos para la tabla `chofer`
--

INSERT INTO `chofer` (`idchofer`, `licencia`, `fianza`, `estado_idestado`, `estado_idestado_fianza`, `chofer`, `aval1`, `aval2`, `aval3`, `aval4`, `deudafianza`, `deudaliquidacion`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(10, '123456', 2500, 5, 20, 64, 64, 64, 64, 64, NULL, NULL, NULL, 1, '2018-02-12 20:34:29', '2018-02-13 19:16:16'),
(11, '666', 2500, 19, 8, 65, 65, 65, 65, 65, 200, 2400, NULL, 2, '2018-02-14 16:31:46', '2018-02-14 21:01:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concepto`
--

CREATE TABLE `concepto` (
  `idconcepto` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|3|Conceptos||nombre.Concepto';

--
-- Volcado de datos para la tabla `concepto`
--

INSERT INTO `concepto` (`idconcepto`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(2, 'Papel Higienicos', NULL, 1, '2018-02-12 20:55:27', '2018-02-12 20:55:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corralon`
--

CREATE TABLE `corralon` (
  `idcorralon` int(11) NOT NULL COMMENT '0|',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha de Ingreso',
  `hora` time DEFAULT NULL COMMENT '1|Hora de Ingreso',
  `fechaSalida` date DEFAULT NULL COMMENT '1|Fecha de Salida',
  `horaSalida` time DEFAULT NULL COMMENT '1|Hora de Salida',
  `infraccionNumero` int(11) DEFAULT NULL COMMENT '1|No. Infracción',
  `corralonNombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre Corralon',
  `motivo` varchar(150) DEFAULT NULL COMMENT '1|Motivo',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `permisotaxiasignado_idpermisotaxiasignado` int(11) NOT NULL COMMENT '1|Permiso Taxi Asignado|**numero permisotaxi.idpermisotaxi permisotaxiasignado.permisotaxi_idpermisotaxi',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|5|Corralones||motivo.Motivo,corralonNombre.Corralón,permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado.Número de Permiso,fecha.Fecha de Ingreso';

--
-- Volcado de datos para la tabla `corralon`
--

INSERT INTO `corralon` (`idcorralon`, `fecha`, `hora`, `fechaSalida`, `horaSalida`, `infraccionNumero`, `corralonNombre`, `motivo`, `estado_idestado`, `permisotaxiasignado_idpermisotaxiasignado`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(2, '2018-02-13', '13:13:00', '2018-02-13', '13:16:00', 123, 'x', 'X', 1, 13, NULL, 1, '2018-02-13 19:13:22', '2018-02-13 19:16:16'),
(3, '2018-02-14', '13:34:00', '2018-02-14', '14:56:00', 666677, 'SAN JUAN', 'SE ESTACIONÓ MAL', 1, 14, NULL, 2, '2018-02-14 19:34:19', '2018-02-14 20:56:55'),
(4, '2018-02-15', '12:31:00', NULL, NULL, 123456, 'X', 'POR CHOQUES', 18, 15, NULL, 2, '2018-02-15 17:00:25', '2018-02-15 17:00:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresoconcepto`
--

CREATE TABLE `egresoconcepto` (
  `idegresoconcepto` int(11) NOT NULL COMMENT '0|',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `total` int(11) DEFAULT NULL COMMENT '1|Total',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `concepto_idconcepto` int(11) NOT NULL COMMENT '1|Concepto|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|6|Egreso Conceptos||fecha.Fecha,taller_taller_idtaller.Nombre del Taller,concepto_concepto_idconcepto.Concepto';

--
-- Volcado de datos para la tabla `egresoconcepto`
--

INSERT INTO `egresoconcepto` (`idegresoconcepto`, `fecha`, `hora`, `total`, `taller_idtaller`, `concepto_idconcepto`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, '2018-02-16', '00:32:00', 500, 5, 2, NULL, 1, '2018-02-12 20:55:35', '2018-02-12 20:55:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enviotaller`
--

CREATE TABLE `enviotaller` (
  `idenviotaller` int(11) NOT NULL COMMENT '0|',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `motivo` varchar(80) DEFAULT NULL COMMENT '1|Motivo',
  `permisotaxiasignado_idpermisotaxiasignado` int(11) NOT NULL COMMENT '1|Permiso Taxi|**numero permisotaxi.idpermisotaxi permisotaxiasignado.permisotaxi_idpermisotaxi',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|',
  `mantenimiento_idmantenimiento` varchar(25) DEFAULT 'NO ES MANTENIMIENTO' COMMENT '1|Mantenimientos|idmantenimiento'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|7|Envios Taller||motivo.Motivo,permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado.Número de Permiso,taller_taller_idtaller.Nombre del Taller,fecha.Fecha de Envío';

--
-- Volcado de datos para la tabla `enviotaller`
--

INSERT INTO `enviotaller` (`idenviotaller`, `fecha`, `hora`, `motivo`, `permisotaxiasignado_idpermisotaxiasignado`, `taller_idtaller`, `baja`, `created_by`, `created_at`, `modified_at`, `mantenimiento_idmantenimiento`) VALUES
(13, '2018-02-19', '11:11:00', 'CHOCA', 10, 5, NULL, 1, '2018-02-12 20:42:58', '2018-02-12 20:42:58', ''),
(14, NULL, '02:34:00', 'X', 13, 5, NULL, 1, '2018-02-13 16:42:42', '2018-02-13 16:42:42', 'PRIMER'),
(15, '2018-02-01', '11:11:00', 'X', 10, 5, NULL, 1, '2018-02-13 16:52:18', '2018-02-13 16:52:18', 'PRIMER');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idestado` int(3) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Estado',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|9|Estados|nombre.Estado';

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idestado`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'FUERA', NULL, NULL, '2018-01-18 11:45:06', '2018-01-18 11:45:06'),
(5, 'ACTIVO', NULL, 1, '2018-01-17 02:47:18', '2018-01-17 02:47:18'),
(6, 'NOAPLICADA', NULL, 1, '2018-01-17 02:59:01', '2018-01-17 02:59:01'),
(7, 'APLICADA', NULL, 1, '2018-01-17 02:59:07', '2018-01-17 02:59:07'),
(8, 'PAGADA', NULL, 1, '2018-01-17 05:20:05', '2018-01-17 05:20:05'),
(9, 'ADEUDANDO', NULL, 1, '2018-01-17 05:20:11', '2018-01-17 05:20:11'),
(10, 'INACTIVO', NULL, 1, '2018-01-17 22:17:28', '2018-01-17 22:17:28'),
(11, 'REPARANDO', NULL, 1, '2018-01-17 22:31:58', '2018-01-17 22:31:58'),
(12, 'ASIGNADO', NULL, 1, '2018-01-17 22:56:44', '2018-01-17 22:56:44'),
(13, 'NOASIGNADO', NULL, 1, '2018-01-17 22:56:51', '2018-01-17 22:56:51'),
(14, 'ASIGNADO-REPARANDO', NULL, 1, '2018-01-17 22:58:06', '2018-01-17 22:58:06'),
(15, 'TALLER', NULL, 1, '2018-01-17 23:02:51', '2018-01-17 23:02:51'),
(16, 'REPARADO', NULL, 1, '2018-01-17 23:39:18', '2018-01-17 23:39:18'),
(17, 'ASIGNADO-CORRALÓN', NULL, 1, '2018-01-17 23:54:57', '2018-01-17 23:54:57'),
(18, 'CORRALON', NULL, 1, '2018-01-18 00:00:16', '2018-01-18 12:02:59'),
(19, 'DISPONIBLE', NULL, 1, '2018-01-18 00:01:54', '2018-01-18 00:01:54'),
(20, 'ACTIVO', NULL, 1, '2018-02-12 20:29:32', '2018-02-12 20:29:32'),
(21, 'ACTIVO-ALERTAMANTENIMIENTO', NULL, 1, '2018-02-13 19:39:16', '2018-02-13 19:39:16'),
(22, 'NODISPONIBLE', NULL, 1, '2018-02-13 19:39:28', '2018-02-13 19:39:49'),
(23, 'SEBAJAACHOFER', NULL, NULL, '2018-02-14 16:12:13', '2018-02-14 16:12:13'),
(24, 'ENVIADOATALLER', NULL, NULL, '2018-02-15 16:57:03', '2018-02-15 16:57:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `liquidacion`
--

CREATE TABLE `liquidacion` (
  `idliquidacion` int(11) NOT NULL COMMENT '0|',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `saldoanterior` float DEFAULT NULL COMMENT '1|Saldo Anterior',
  `saldoactual` float NOT NULL COMMENT '1|Saldo Actual',
  `montopagado` float NOT NULL COMMENT '1|Monto Pagado',
  `bonificado` float DEFAULT NULL COMMENT '1|Cantidad Bonificada',
  `h_corte` time NOT NULL COMMENT '1|Hora de Corte',
  `permisotaxiasignado_idpermisotaxiasignado` int(11) NOT NULL COMMENT '1|Permiso',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `liquidacion`
--

INSERT INTO `liquidacion` (`idliquidacion`, `fecha`, `saldoanterior`, `saldoactual`, `montopagado`, `bonificado`, `h_corte`, `permisotaxiasignado_idpermisotaxiasignado`, `chofer_idchofer`, `estado_idestado`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(6, '2018-02-14', NULL, 0, 0, 0, '14:13:00', 13, 10, 9, NULL, 1, '2018-02-13 16:06:08', '2018-02-13 16:06:08'),
(7, '2018-02-14', NULL, 0, 0, 0, '12:34:00', 14, 11, 9, NULL, 2, '2018-02-14 16:39:51', '2018-02-14 20:37:01'),
(8, '2018-02-15', NULL, 0, 0, 0, '00:00:00', 20, 11, 9, NULL, 2, '2018-02-14 20:37:59', '2018-02-14 20:37:59'),
(9, '2018-02-14', NULL, 0, 0, 0, '00:00:00', 21, 11, 9, NULL, 2, '2018-02-14 20:40:43', '2018-02-14 20:40:43'),
(10, '2018-02-14', NULL, 0, 0, 0, '00:00:00', 22, 11, 9, NULL, 2, '2018-02-14 20:42:08', '2018-02-14 20:42:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento`
--

CREATE TABLE `mantenimiento` (
  `idmantenimiento` varchar(25) NOT NULL COMMENT '1|Mantenimiento',
  `kminicial` int(11) DEFAULT NULL COMMENT '1|Kilometraje Inicial',
  `kmfinal` int(11) DEFAULT NULL COMMENT '1|Kilometraje Final',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|20|Mantenimientos';

--
-- Volcado de datos para la tabla `mantenimiento`
--

INSERT INTO `mantenimiento` (`idmantenimiento`, `kminicial`, `kmfinal`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
('PRIMER', 0, 5000, NULL, 1, '2018-02-13 16:34:07', '2018-02-13 16:34:07'),
('SEGUNDO', 5000, 10000, NULL, 1, '2018-02-13 16:38:57', '2018-02-13 16:38:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mecanico`
--

CREATE TABLE `mecanico` (
  `idmecanico` int(11) NOT NULL COMMENT '0|',
  `persona_idpersona` int(11) NOT NULL COMMENT '1|Persona|nombre',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|11|Mecánicos||persona_persona_idpersona.Nombre,taller_taller_idtaller.Nombre de Taller';

--
-- Volcado de datos para la tabla `mecanico`
--

INSERT INTO `mecanico` (`idmecanico`, `persona_idpersona`, `taller_idtaller`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(4, 64, 5, NULL, 1, '2018-02-12 20:43:41', '2018-02-12 20:43:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `idorden` int(11) NOT NULL COMMENT '0|',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `manoObra` int(11) DEFAULT NULL COMMENT '1|Mano de Obra',
  `subtotal` int(11) DEFAULT NULL COMMENT '1|Subtotal',
  `total` int(11) DEFAULT NULL COMMENT '1|Total',
  `anticipo` int(11) DEFAULT NULL COMMENT '1|Anticipo',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `descripcion` varchar(200) DEFAULT NULL COMMENT '1|Descripción',
  `vehiculoreparando_idvehiculoreparando` int(11) NOT NULL COMMENT '1|Vehículo Reparando|motivo',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Ordenes|orden_has_refaccion.orden_idorden.refaccion_idrefaccion.refaccion.idrefaccion.nombre.Refacciones|fecha.Fecha,estado_estado_idestado.Estado,descripcion.Descripción,vehiculoreparando_vehiculoreparando_idvehiculoreparando.Motivo de Reparación\n';

--
-- Volcado de datos para la tabla `orden`
--

INSERT INTO `orden` (`idorden`, `fecha`, `hora`, `manoObra`, `subtotal`, `total`, `anticipo`, `estado_idestado`, `descripcion`, `vehiculoreparando_idvehiculoreparando`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(5, '2018-02-21', '00:33:00', 400, 500, 600, 300, 20, 'X', 8, NULL, 1, '2018-02-12 20:46:48', '2018-02-12 20:46:48'),
(6, '2018-02-13', '11:13:00', 0, 0, 0, 0, 6, 'x', 9, NULL, 1, '2018-02-13 17:14:33', '2018-02-13 17:14:33'),
(7, '2018-02-13', '12:40:00', 3000, 140859, 143759, 100, 6, 'XXXX', 8, NULL, 1, '2018-02-13 18:40:53', '2018-02-13 18:42:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_has_refaccion`
--

CREATE TABLE `orden_has_refaccion` (
  `idorden_has_refaccion` int(11) NOT NULL,
  `orden_idorden` int(11) NOT NULL COMMENT '1|Orden|idorden',
  `refaccion_idrefaccion` int(11) NOT NULL COMMENT '1|Refacción|nombre',
  `cantidad` int(11) DEFAULT NULL COMMENT '1|Cantidad',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Refacciones de ordenes||refaccion_refaccion_idrefaccion.Nombre de Refacción';

--
-- Volcado de datos para la tabla `orden_has_refaccion`
--

INSERT INTO `orden_has_refaccion` (`idorden_has_refaccion`, `orden_idorden`, `refaccion_idrefaccion`, `cantidad`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(2, 5, 6, 5463465, NULL, 1, '2018-02-12 20:50:16', '2018-02-12 20:50:16'),
(3, 5, 5, 500, NULL, 1, '2018-02-12 20:46:48', '2018-02-12 20:49:34'),
(4, 7, 5, 1, NULL, 1, '2018-02-13 18:40:53', '2018-02-13 18:40:53'),
(5, 7, 6, 3, NULL, 1, '2018-02-13 18:40:53', '2018-02-13 18:40:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `idpago` int(11) NOT NULL COMMENT '0|',
  `cantidadRecibida` int(11) NOT NULL COMMENT '1|Cantidad Recibida',
  `cambio` int(11) NOT NULL COMMENT '1|Cambio',
  `kilometraje` int(11) NOT NULL COMMENT '1|Kilometraje',
  `fecha` date NOT NULL COMMENT '1|Fecha',
  `hora` time NOT NULL COMMENT '1|Hora',
  `nota` varchar(60) NOT NULL COMMENT '1|Nota',
  `cantPagada` int(11) NOT NULL COMMENT '1|Cantidad Pagada',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `descripcion` varchar(200) DEFAULT NULL COMMENT '1|Descripción',
  `folio` varchar(30) NOT NULL COMMENT '1|Folio Liquidación',
  `liquidacion` float NOT NULL COMMENT '1|Liquidación',
  `foliofianza` varchar(30) DEFAULT NULL COMMENT '1|Folio Fianza',
  `fianza` float DEFAULT NULL COMMENT '1|Fianza',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|10|Pagos|pagobonificacion.pago_idpago.bonificacion_idbonificacion.bonificacion.idbonificacion.concepto.Bonificaciones por Conceptos|chofer_chofer_idchofer.Chofer,fecha.Fecha,nota.Nota,estado_estado_idestado.Estado';

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`idpago`, `cantidadRecibida`, `cambio`, `kilometraje`, `fecha`, `hora`, `nota`, `cantPagada`, `estado_idestado`, `descripcion`, `folio`, `liquidacion`, `foliofianza`, `fianza`, `chofer_idchofer`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(7, 123123, 123, 25000, '2018-02-06', '11:11:00', 'X', 123231, 20, 'X', '123', 123, '123', 123, 10, NULL, 1, '2018-02-12 20:36:37', '2018-02-12 20:36:37'),
(8, 500, 13, 63565432, '2018-02-16', '12:31:00', 'X', 213123, 20, 'X', 'X', 5000, '123', 54756, 10, NULL, 1, '2018-02-12 20:53:45', '2018-02-12 20:53:45'),
(9, 1095, 5, 437877, '2018-02-14', '14:57:00', 'xxxxx', 1100, 6, NULL, '123', 500, '2123', 600, 11, NULL, 2, '2018-02-14 20:58:01', '2018-02-14 20:58:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagobonificacion`
--

CREATE TABLE `pagobonificacion` (
  `idpagobonificacion` int(11) NOT NULL,
  `bonificacion_idbonificacion` int(11) NOT NULL COMMENT '1|Bonificación|concepto',
  `pago_idpago` int(11) NOT NULL COMMENT '1|Pago|folio',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Pago de Bonificaciones';

--
-- Volcado de datos para la tabla `pagobonificacion`
--

INSERT INTO `pagobonificacion` (`idpagobonificacion`, `bonificacion_idbonificacion`, `pago_idpago`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 7, 7, NULL, 1, '2018-02-12 20:36:37', '2018-02-12 20:36:37'),
(2, 7, 7, NULL, 1, '2018-02-12 20:37:15', '2018-02-12 20:37:15'),
(3, 7, 8, NULL, 1, '2018-02-12 20:53:45', '2018-02-12 20:53:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagofianza`
--

CREATE TABLE `pagofianza` (
  `idpagofianza` int(11) NOT NULL COMMENT '0|',
  `saldoanterior` float DEFAULT NULL COMMENT '1|Saldo Anterior',
  `montopagado` float DEFAULT NULL COMMENT '1|Monto Pagado',
  `saldoactual` float DEFAULT NULL COMMENT '1|Saldo Actual',
  `pago_idpago` int(11) NOT NULL COMMENT '1|Pago|folio',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Pago de Fianzas';

--
-- Volcado de datos para la tabla `pagofianza`
--

INSERT INTO `pagofianza` (`idpagofianza`, `saldoanterior`, `montopagado`, `saldoactual`, `pago_idpago`, `chofer_idchofer`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, NULL, 600, NULL, 9, 11, NULL, 2, '2018-02-14 20:58:01', '2018-02-14 20:58:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagoliquidacion`
--

CREATE TABLE `pagoliquidacion` (
  `idpagoliquidacion` int(11) NOT NULL COMMENT '0|',
  `saldoanterior` float DEFAULT NULL COMMENT '1|Saldo Anterior',
  `montopagado` float DEFAULT NULL COMMENT '1|Monto Pagado',
  `saldoactual` float DEFAULT NULL COMMENT '1|Saldo Actual',
  `pago_idpago` int(11) NOT NULL COMMENT '1|Pago|folio',
  `liquidacion_idliquidacion` int(11) NOT NULL COMMENT '1|Liquidación|fecha',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Pago de Liquidaciones';

--
-- Volcado de datos para la tabla `pagoliquidacion`
--

INSERT INTO `pagoliquidacion` (`idpagoliquidacion`, `saldoanterior`, `montopagado`, `saldoactual`, `pago_idpago`, `liquidacion_idliquidacion`, `chofer_idchofer`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(6, 200, 400, 500, 7, 1, 10, NULL, 1, '2018-02-12 20:38:51', '2018-02-12 20:39:02'),
(7, NULL, NULL, NULL, 9, 7, 11, NULL, 2, '2018-02-14 20:58:01', '2018-02-14 20:58:01'),
(8, NULL, NULL, NULL, 9, 8, 11, NULL, 2, '2018-02-14 20:58:01', '2018-02-14 20:58:01'),
(9, NULL, NULL, NULL, 9, 9, 11, NULL, 2, '2018-02-14 20:58:01', '2018-02-14 20:58:01'),
(10, NULL, NULL, NULL, 9, 10, 11, NULL, 2, '2018-02-14 20:58:01', '2018-02-14 20:58:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisotaxi`
--

CREATE TABLE `permisotaxi` (
  `idpermisotaxi` int(11) NOT NULL COMMENT '0|',
  `numero` varchar(45) NOT NULL COMMENT '1|Número',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `fechaAlta` date DEFAULT NULL COMMENT '1|Fecha Alta',
  `vigencia` date DEFAULT NULL COMMENT '1|Vigencia',
  `liquidez` int(11) DEFAULT NULL COMMENT '1|Liquidez',
  `liquidezDom` int(11) DEFAULT NULL COMMENT '1|Liquidez Domingo',
  `propietario` int(11) NOT NULL COMMENT '1|Propietario|nombre',
  `vehiculo_idvehiculo` int(11) NOT NULL COMMENT '1|Vehículo|marca',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|13|Permisos Taxi||numero.Número,persona_propietario.Nombre del Propietario';

--
-- Volcado de datos para la tabla `permisotaxi`
--

INSERT INTO `permisotaxi` (`idpermisotaxi`, `numero`, `estado_idestado`, `fechaAlta`, `vigencia`, `liquidez`, `liquidezDom`, `propietario`, `vehiculo_idvehiculo`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(6, '12345678', 20, '2018-02-13', '2018-02-03', 300, 350, 64, 5, NULL, 1, '2018-02-12 20:41:23', '2018-02-12 20:41:23'),
(7, '55/22', 19, '2018-02-14', '2018-02-14', 350, 250, 66, 6, NULL, 2, '2018-02-14 16:37:39', '2018-02-15 17:08:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisotaxiasignado`
--

CREATE TABLE `permisotaxiasignado` (
  `idpermisotaxiasignado` int(11) NOT NULL COMMENT '0|',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `permisotaxi_idpermisotaxi` int(11) NOT NULL COMMENT '1|Permiso Taxi|numero',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|14|Asignador Vehículo a Chofer||vehiculo_vehiculo_idvehiculo.Placa de Vehiculo,permisotaxi_permisotaxi_idpermisotaxi.Número de Permiso,chofer_chofer_idchofer.Nombre de Chofer,fecha.Fecha,estado_estado_idestado.Estado';

--
-- Volcado de datos para la tabla `permisotaxiasignado`
--

INSERT INTO `permisotaxiasignado` (`idpermisotaxiasignado`, `estado_idestado`, `fecha`, `hora`, `chofer_idchofer`, `permisotaxi_idpermisotaxi`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(10, 14, '2018-02-21', '11:21:00', 10, 6, NULL, 1, '2018-02-12 20:42:12', '2018-02-13 16:52:18'),
(13, 17, '2018-02-14', '14:13:00', 10, 6, NULL, 1, '2018-02-13 16:06:08', '2018-02-13 19:13:22'),
(14, 23, '2018-02-15', '12:34:00', 11, 7, NULL, 2, '2018-02-14 16:39:51', '2018-02-14 19:49:18'),
(15, 18, '2018-02-23', '02:13:00', 11, 7, NULL, 2, '2018-02-14 19:51:58', '2018-02-15 17:00:25'),
(16, 23, '2018-02-15', '16:35:00', 11, 7, NULL, 2, '2018-02-14 20:17:35', '2018-02-15 17:06:02'),
(17, 23, '2018-02-09', '04:34:00', 11, 7, NULL, 2, '2018-02-14 20:22:10', '2018-02-15 17:06:06'),
(18, 23, '2018-02-09', '04:34:00', 11, 7, NULL, 2, '2018-02-14 20:24:37', '2018-02-15 17:08:13'),
(19, 12, '2018-02-15', '00:34:00', 11, 7, NULL, 2, '2018-02-14 20:34:45', '2018-02-14 20:34:45'),
(20, 12, '2018-02-15', '00:34:00', 11, 7, NULL, 2, '2018-02-14 20:37:59', '2018-02-14 20:37:59'),
(21, 12, '2018-02-14', '00:34:00', 11, 7, NULL, 2, '2018-02-14 20:40:42', '2018-02-14 20:40:42'),
(22, 12, '2018-02-14', '12:31:00', 11, 7, NULL, 2, '2018-02-14 20:42:08', '2018-02-14 20:42:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idpersona` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `edad` int(11) DEFAULT NULL COMMENT '1|Edad',
  `sexo` varchar(15) DEFAULT NULL COMMENT '1|Sexo',
  `rfc` varchar(45) DEFAULT NULL COMMENT '1|RFC',
  `telefono` int(11) DEFAULT NULL COMMENT '1|Télefono',
  `domicilio` varchar(60) DEFAULT NULL COMMENT '1|Domicilio',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|15|Personas||nombre.Nombre,rfc.RFC,domicilio.Domicilio';

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idpersona`, `nombre`, `edad`, `sexo`, `rfc`, `telefono`, `domicilio`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(64, 'CESAR', 35, 'MASCULINO', '23452345245', 2147483647, 'COLON', NULL, 1, '2018-02-12 20:34:23', '2018-02-12 20:34:23'),
(65, 'x', 45, 'x', 'x', 1, 'x', NULL, 2, '2018-02-14 16:31:29', '2018-02-14 16:31:29'),
(66, 'Agustin', 66, 'MASCULINO', '44355654', 31241234, 'TOMAS ESCOBEDO 123', NULL, 2, '2018-02-14 16:35:18', '2018-02-14 16:35:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refaccion`
--

CREATE TABLE `refaccion` (
  `idrefaccion` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `precioCompra` int(11) DEFAULT NULL COMMENT '1|Precio Compra',
  `precioVenta` int(11) DEFAULT NULL COMMENT '1|Precio Venta',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|16|Refacciones||nombre.Nombre de Refacción,taller_taller_idtaller.Nombre de Taller';

--
-- Volcado de datos para la tabla `refaccion`
--

INSERT INTO `refaccion` (`idrefaccion`, `nombre`, `precioCompra`, `precioVenta`, `taller_idtaller`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(5, 'Llanta Michelin 4x4', 400, 600, 5, NULL, 1, '2018-02-12 20:46:47', '2018-02-12 20:46:47'),
(6, 'PALANCA', 124325, 46753, 5, NULL, 1, '2018-02-12 20:50:11', '2018-02-12 20:50:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_modulo`
--

CREATE TABLE `si_modulo` (
  `idsi_modulo` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Módulos||nombre.Módulo';

--
-- Volcado de datos para la tabla `si_modulo`
--

INSERT INTO `si_modulo` (`idsi_modulo`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(55, 'bonificacion', 0, NULL, '2018-02-12 19:20:03', '2018-02-12 19:20:03'),
(56, 'chofer', 0, NULL, '2018-02-12 19:20:04', '2018-02-12 19:20:04'),
(57, 'concepto', 0, NULL, '2018-02-12 19:20:04', '2018-02-12 19:20:04'),
(58, 'corralon', 0, NULL, '2018-02-12 19:20:04', '2018-02-12 19:20:04'),
(59, 'egresoconcepto', 0, NULL, '2018-02-12 19:20:04', '2018-02-12 19:20:04'),
(60, 'enviotaller', 0, NULL, '2018-02-12 19:20:04', '2018-02-12 19:20:04'),
(61, 'estado', 0, NULL, '2018-02-12 19:20:04', '2018-02-12 19:20:04'),
(62, 'liquidacion', 0, NULL, '2018-02-12 19:20:05', '2018-02-12 19:20:05'),
(63, 'mecanico', 0, NULL, '2018-02-12 19:20:05', '2018-02-12 19:20:05'),
(64, 'orden', 0, NULL, '2018-02-12 19:20:05', '2018-02-12 19:20:05'),
(65, 'orden_has_refaccion', 0, NULL, '2018-02-12 19:20:05', '2018-02-12 19:20:05'),
(66, 'pago', 0, NULL, '2018-02-12 19:20:05', '2018-02-12 19:20:05'),
(67, 'pagobonificacion', 0, NULL, '2018-02-12 19:20:06', '2018-02-12 19:20:06'),
(68, 'pagofianza', 0, NULL, '2018-02-12 19:20:06', '2018-02-12 19:20:06'),
(69, 'pagoliquidacion', 0, NULL, '2018-02-12 19:20:06', '2018-02-12 19:20:06'),
(70, 'permisotaxi', 0, NULL, '2018-02-12 19:20:06', '2018-02-12 19:20:06'),
(71, 'permisotaxiasignado', 0, NULL, '2018-02-12 19:20:06', '2018-02-12 19:20:06'),
(72, 'persona', 0, NULL, '2018-02-12 19:20:06', '2018-02-12 19:20:06'),
(73, 'refaccion', 0, NULL, '2018-02-12 19:20:06', '2018-02-12 19:20:06'),
(74, 'si_modulo', 0, NULL, '2018-02-12 19:20:07', '2018-02-12 19:20:07'),
(75, 'si_permiso', 0, NULL, '2018-02-12 19:20:07', '2018-02-12 19:20:07'),
(76, 'si_reporte', 0, NULL, '2018-02-12 19:20:07', '2018-02-12 19:20:07'),
(77, 'si_rol', 0, NULL, '2018-02-12 19:20:07', '2018-02-12 19:20:07'),
(78, 'si_user', 0, NULL, '2018-02-12 19:20:07', '2018-02-12 19:20:07'),
(79, 'taller', 0, NULL, '2018-02-12 19:20:08', '2018-02-12 19:20:08'),
(80, 'vehiculo', 0, NULL, '2018-02-12 19:20:08', '2018-02-12 19:20:08'),
(81, 'vehiculoreparando', 0, NULL, '2018-02-12 19:20:08', '2018-02-12 19:20:08'),
(82, 'mantenimiento', 0, 1, '2018-02-13 15:30:45', '2018-02-13 16:36:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_permiso`
--

CREATE TABLE `si_permiso` (
  `idsi_permiso` int(4) NOT NULL,
  `acceso` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Acceso',
  `si_rol_idsi_rol` int(4) NOT NULL COMMENT '1|Rol|nombre',
  `si_modulo_idsi_modulo` int(4) NOT NULL COMMENT '1|Módulo|nombre',
  `readable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Lectura',
  `writeable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Escritura',
  `updateable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Edición',
  `deleteable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Eliminación',
  `read_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Leer Propios',
  `write_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Escribir Propios',
  `update_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Editar Propios',
  `delete_own` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Eliminar Propios',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|2|Permisos||modulo_Modulo_idsi_modulo.Módulo';

--
-- Volcado de datos para la tabla `si_permiso`
--

INSERT INTO `si_permiso` (`idsi_permiso`, `acceso`, `si_rol_idsi_rol`, `si_modulo_idsi_modulo`, `readable`, `writeable`, `updateable`, `deleteable`, `read_own`, `write_own`, `update_own`, `delete_own`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 1, 2, 66, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:36:19', '2018-02-14 15:36:19'),
(2, 0, 2, 67, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:36:35', '2018-02-14 15:56:43'),
(3, 0, 2, 68, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:36:52', '2018-02-14 15:56:47'),
(4, 0, 2, 69, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:37:18', '2018-02-14 15:56:51'),
(5, 1, 2, 70, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:37:47', '2018-02-14 15:57:04'),
(6, 1, 2, 71, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:38:26', '2018-02-14 15:38:26'),
(7, 1, 2, 81, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:39:11', '2018-02-14 15:39:11'),
(8, 0, 2, 60, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, '2018-02-14 15:39:25', '2018-02-14 21:13:57'),
(9, 1, 2, 56, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:39:47', '2018-02-14 15:39:47'),
(10, 1, 2, 58, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:40:10', '2018-02-14 15:40:10'),
(11, 0, 2, 62, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:40:40', '2018-02-14 15:58:13'),
(12, 1, 2, 75, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, '2018-02-14 15:41:04', '2018-02-14 15:41:04'),
(13, 0, 2, 80, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:41:22', '2018-02-14 16:14:41'),
(14, 0, 2, 72, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '2018-02-14 15:41:45', '2018-02-14 15:59:24'),
(15, 0, 2, 74, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-02-14 16:20:23', '2018-02-14 16:20:23'),
(16, 0, 2, 77, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-02-14 16:20:33', '2018-02-14 16:20:33'),
(17, 1, 2, 55, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, '2018-02-14 16:20:50', '2018-02-14 19:48:37'),
(18, 0, 2, 61, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, '2018-02-14 16:21:04', '2018-02-14 16:21:04'),
(19, 0, 2, 82, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, '2018-02-14 19:44:31', '2018-02-14 19:44:31'),
(22, 0, 2, 79, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, '2018-02-14 21:11:54', '2018-02-14 21:11:54'),
(23, 0, 2, 63, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, '2018-02-14 21:12:20', '2018-02-14 21:12:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_reporte`
--

CREATE TABLE `si_reporte` (
  `idsi_reporte` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `consulta` varchar(400) NOT NULL COMMENT '1|Consulta',
  `campos` varchar(140) NOT NULL COMMENT '1|Campos a mostrar',
  `si_modulo_idsi_modulo` int(4) NOT NULL COMMENT '1|Módulo|nombre',
  `pfd` tinyint(1) DEFAULT '0' COMMENT '1|Exportar a PDF',
  `excel` tinyint(1) DEFAULT '0' COMMENT '1|Exportar a Excel',
  `print` tinyint(1) DEFAULT '0' COMMENT '1|Impresión',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|5|Reportes||nombre.Nombre';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_rol`
--

CREATE TABLE `si_rol` (
  `idsi_rol` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|3|Roles||nombre.Rol';

--
-- Volcado de datos para la tabla `si_rol`
--

INSERT INTO `si_rol` (`idsi_rol`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'ADMINISTRADOR', 0, NULL, '2018-02-12 19:20:08', '2018-02-12 19:20:08'),
(2, 'LIQUIDACIONES', 0, 1, '2018-02-14 15:34:17', '2018-02-14 15:34:17'),
(3, 'TALLER', 0, 1, '2018-02-14 15:35:03', '2018-02-14 15:35:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_user`
--

CREATE TABLE `si_user` (
  `idsi_user` int(4) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL COMMENT '1|Usuario',
  `email` varchar(60) NOT NULL COMMENT '1|Email',
  `password` binary(60) DEFAULT NULL COMMENT '1|Password',
  `si_rol_idsi_rol` int(4) NOT NULL COMMENT '1|Rol|nombre',
  `super` tinyint(1) DEFAULT '0' COMMENT '0|',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|4|Usuarios||usuario.Usuario,email.Email,rol_Rol_idsi_rol.Rol';

--
-- Volcado de datos para la tabla `si_user`
--

INSERT INTO `si_user` (`idsi_user`, `usuario`, `email`, `password`, `si_rol_idsi_rol`, `super`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'SuperUsuario', 'admin@liquidacion1601.com', 0x243261243130246362766c3943474b4d525146327a564a4a577945747549676c4f4651384f5056517951436c4c6d344e50314e386e4d4a6175476b47, 1, 1, 0, NULL, '2018-01-17 01:42:33', '2018-01-18 10:02:07'),
(2, 'liquidacion1', 'liquidacion1@vieliquidaciones.com', 0x243261243130245456445867662e704c74514d48585964655a4d557a2e483032494c56394f6874697a556779624c7979445170764d5235523744632e, 2, 0, 0, 1, '2018-02-14 15:34:22', '2018-02-14 15:34:22'),
(3, 'Taller1', 'taller1@vieliquidaciones.com', 0x243261243130246e42796c5563783253793161522f6a554b783751417576504c32454b6c2f54335a6f58414c58316f6131556e61483146594a774c65, 3, 0, 0, 1, '2018-02-14 15:35:06', '2018-02-14 15:35:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller`
--

CREATE TABLE `taller` (
  `idtaller` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `direccion` varchar(80) DEFAULT NULL COMMENT '1|Dirección',
  `telefono` int(11) DEFAULT NULL COMMENT '1|Teléfono',
  `descripcion` varchar(80) DEFAULT NULL COMMENT '1|Descripción',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|17|Talleres||nombre.Nombre,direccion.Dirección';

--
-- Volcado de datos para la tabla `taller`
--

INSERT INTO `taller` (`idtaller`, `nombre`, `direccion`, `telefono`, `descripcion`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(5, 'JUANITOS', 'X', 12312, 'X', NULL, 1, '2018-02-12 20:42:55', '2018-02-12 20:42:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `idvehiculo` int(11) NOT NULL COMMENT '0|',
  `marca` varchar(20) DEFAULT NULL COMMENT '1|Marca',
  `modelo` varchar(20) DEFAULT NULL COMMENT '1|Modelo',
  `anio` int(11) DEFAULT NULL COMMENT '1|Año',
  `serie` varchar(30) DEFAULT NULL COMMENT '1|Serie',
  `serieMotor` varchar(40) DEFAULT NULL COMMENT '1|Serie Motor',
  `placa` varchar(10) DEFAULT NULL COMMENT '1|Placa',
  `kilometraje` int(11) DEFAULT NULL COMMENT '1|Kilometraje',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `poliza` varchar(15) DEFAULT NULL COMMENT '1|Póliza',
  `polizaTipo` varchar(15) DEFAULT NULL COMMENT '1|Póliza Tipo',
  `color` varchar(20) DEFAULT NULL COMMENT '1|Color',
  `propietario` int(11) NOT NULL COMMENT '1|Propietario|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|18|Vehículos||marca.Marca,modelo.Modelo,placa.Placa,color.Color,persona_propietario.Nombre de Propietario';

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`idvehiculo`, `marca`, `modelo`, `anio`, `serie`, `serieMotor`, `placa`, `kilometraje`, `estado_idestado`, `poliza`, `polizaTipo`, `color`, `propietario`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(5, 'X', 'X', 1, '1', 'X', '1X', 1, 19, '1', '1', 'ROJO', 64, NULL, 1, '2018-02-12 20:41:21', '2018-02-13 19:16:16'),
(6, 'FORD', 'KA', 2014, 'x21', '2436536436', 'HJS-ACB-DE', 20000, 19, '32464', 'CHOFER', 'ROJO', 66, NULL, 2, '2018-02-14 16:36:54', '2018-02-14 16:36:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculoreparando`
--

CREATE TABLE `vehiculoreparando` (
  `idvehiculoreparando` int(11) NOT NULL COMMENT '0|',
  `fechaIngresa` date DEFAULT NULL COMMENT '1|Fecha Ingreso',
  `horaIngresa` time DEFAULT NULL COMMENT '1|Hora Ingresa',
  `fechaSalida` date DEFAULT NULL COMMENT '1|Fecha Salida',
  `horaSalida` time DEFAULT NULL COMMENT '1|Hora Salida',
  `fechaEstimada` date DEFAULT NULL COMMENT '1|Fecha Estimada de Salida',
  `horaEstimada` time DEFAULT NULL COMMENT '1|Hora Estimada de Salida',
  `inventario` varchar(80) DEFAULT NULL COMMENT '1|Inventario',
  `motivo` varchar(80) DEFAULT NULL COMMENT '1|Motivo',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `enviotaller_idenviotaller` int(11) DEFAULT NULL COMMENT '1|Envio Taller|motivo',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `mecanico_idmecanico` int(11) NOT NULL COMMENT '1|Mecánico|**nombre persona.idpersona mecanico.persona_idpersona',
  `permisotaxiasignado_idpermisotaxiasignado` int(11) DEFAULT NULL COMMENT '1|Permiso Taxi|**numero permisotaxi.idpermisotaxi permisotaxiasignado.permisotaxi_idpermisotaxi',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|19|Vehículos Reparando||fechaIngresa.Fecha Ingreso,fechaSalida.Fecha Salida,inventario.Inventario,motivo.Motivo de Reparación,enviotaller_enviotaller_idenviotaller.Motivo Envío a Taller,mecanico_mecanico_idmecanico.Mecánico,permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado.Permiso,estado_estado_idestado.Estado';

--
-- Volcado de datos para la tabla `vehiculoreparando`
--

INSERT INTO `vehiculoreparando` (`idvehiculoreparando`, `fechaIngresa`, `horaIngresa`, `fechaSalida`, `horaSalida`, `fechaEstimada`, `horaEstimada`, `inventario`, `motivo`, `estado_idestado`, `enviotaller_idenviotaller`, `taller_idtaller`, `mecanico_idmecanico`, `permisotaxiasignado_idpermisotaxiasignado`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(8, '2018-02-14', '00:12:00', '2018-02-21', '00:12:00', '2018-02-13', '12:21:00', 'X', 'CHOCAX', 20, 13, 5, 4, 10, NULL, 1, '2018-02-12 20:44:05', '2018-02-12 20:44:05'),
(9, '2018-02-25', NULL, '2018-02-13', '14:29:00', '2018-02-07', '12:31:00', 'x', 'CHOCA..', 16, 15, 5, 4, 10, NULL, 1, '2018-02-13 16:53:19', '2018-02-13 20:29:24'),
(10, '2018-02-07', '03:42:00', '2018-02-17', '02:34:00', '2018-02-08', '00:31:00', 'x', 'x', 5, 14, 5, 4, 15, NULL, 2, '2018-02-14 21:14:28', '2018-02-14 21:14:28');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bonificacion`
--
ALTER TABLE `bonificacion`
  ADD PRIMARY KEY (`idbonificacion`),
  ADD KEY `fk_bonificacion_chofer1_idx` (`chofer_idchofer`),
  ADD KEY `fk_bonificacion_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `chofer`
--
ALTER TABLE `chofer`
  ADD PRIMARY KEY (`idchofer`),
  ADD KEY `fk_chofer_persona1_idx` (`chofer`),
  ADD KEY `fk_chofer_persona2_idx` (`aval1`),
  ADD KEY `fk_chofer_persona3_idx` (`aval2`),
  ADD KEY `fk_chofer_persona4_idx` (`aval3`),
  ADD KEY `fk_chofer_persona5_idx` (`aval4`),
  ADD KEY `fk_chofer_estado1_idx` (`estado_idestado`),
  ADD KEY `fk_chofer_estado2_idx` (`estado_idestado_fianza`);

--
-- Indices de la tabla `concepto`
--
ALTER TABLE `concepto`
  ADD PRIMARY KEY (`idconcepto`);

--
-- Indices de la tabla `corralon`
--
ALTER TABLE `corralon`
  ADD PRIMARY KEY (`idcorralon`),
  ADD KEY `fk_corralon_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado`),
  ADD KEY `fk_corralon_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  ADD PRIMARY KEY (`idegresoconcepto`),
  ADD KEY `fk_egresoconcepto_taller1_idx` (`taller_idtaller`),
  ADD KEY `fk_egresoconcepto_concepto1_idx` (`concepto_idconcepto`);

--
-- Indices de la tabla `enviotaller`
--
ALTER TABLE `enviotaller`
  ADD PRIMARY KEY (`idenviotaller`),
  ADD KEY `fk_enviotaller_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado`),
  ADD KEY `fk_enviotaller_taller1_idx` (`taller_idtaller`),
  ADD KEY `fk_enviotaller_mantenimiento1_idx` (`mantenimiento_idmantenimiento`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`idestado`);

--
-- Indices de la tabla `liquidacion`
--
ALTER TABLE `liquidacion`
  ADD PRIMARY KEY (`idliquidacion`),
  ADD KEY `fk_liquidacion_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado`),
  ADD KEY `fk_liquidacion_estado2_idx` (`estado_idestado`),
  ADD KEY `fk_liquidacion_chofer2_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD PRIMARY KEY (`idmantenimiento`);

--
-- Indices de la tabla `mecanico`
--
ALTER TABLE `mecanico`
  ADD PRIMARY KEY (`idmecanico`),
  ADD KEY `fk_mecanico_persona1_idx` (`persona_idpersona`),
  ADD KEY `fk_mecanico_taller2_idx` (`taller_idtaller`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`idorden`),
  ADD KEY `fk_orden_vehiculoreparando1_idx` (`vehiculoreparando_idvehiculoreparando`),
  ADD KEY `fk_orden_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `orden_has_refaccion`
--
ALTER TABLE `orden_has_refaccion`
  ADD PRIMARY KEY (`idorden_has_refaccion`),
  ADD UNIQUE KEY `ordenrefaccion_unico1` (`orden_idorden`,`refaccion_idrefaccion`),
  ADD KEY `fk_ordenrefaccion_orden1_idx` (`orden_idorden`),
  ADD KEY `fk_ordenrefaccion_refaccion1_idx` (`refaccion_idrefaccion`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idpago`),
  ADD KEY `fk_liquidacion_chofer1_idx` (`chofer_idchofer`),
  ADD KEY `fk_liquidacion_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `pagobonificacion`
--
ALTER TABLE `pagobonificacion`
  ADD PRIMARY KEY (`idpagobonificacion`),
  ADD KEY `fk_pagobonificacion_bonificacion1_idx` (`bonificacion_idbonificacion`),
  ADD KEY `fk_pagobonificacion_pago1_idx` (`pago_idpago`);

--
-- Indices de la tabla `pagofianza`
--
ALTER TABLE `pagofianza`
  ADD PRIMARY KEY (`idpagofianza`),
  ADD KEY `fk_pagofianza_pago1_idx` (`pago_idpago`),
  ADD KEY `fk_pagofianza_chofer1_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `pagoliquidacion`
--
ALTER TABLE `pagoliquidacion`
  ADD PRIMARY KEY (`idpagoliquidacion`),
  ADD KEY `fk_pagoliquidacion_pago1_idx` (`pago_idpago`),
  ADD KEY `fk_pagoliquidacion_chofer1_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `permisotaxi`
--
ALTER TABLE `permisotaxi`
  ADD PRIMARY KEY (`idpermisotaxi`),
  ADD UNIQUE KEY `vehiculo_idvehiculo_UNIQUE` (`vehiculo_idvehiculo`,`numero`),
  ADD KEY `fk_permisotaxi_persona1_idx` (`propietario`),
  ADD KEY `fk_permisotaxi_estado1_idx` (`estado_idestado`),
  ADD KEY `fk_permisotaxi_vehiculo1_idx` (`vehiculo_idvehiculo`);

--
-- Indices de la tabla `permisotaxiasignado`
--
ALTER TABLE `permisotaxiasignado`
  ADD PRIMARY KEY (`idpermisotaxiasignado`),
  ADD KEY `fk_permisotaxiasignado_chofer1_idx` (`chofer_idchofer`),
  ADD KEY `fk_permisotaxiasignado_permisotaxi1_idx` (`permisotaxi_idpermisotaxi`),
  ADD KEY `fk_permisotaxiasignado_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idpersona`);

--
-- Indices de la tabla `refaccion`
--
ALTER TABLE `refaccion`
  ADD PRIMARY KEY (`idrefaccion`),
  ADD KEY `fk_refaccion_taller1_idx` (`taller_idtaller`);

--
-- Indices de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  ADD PRIMARY KEY (`idsi_modulo`);

--
-- Indices de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD PRIMARY KEY (`idsi_permiso`),
  ADD UNIQUE KEY `rol_modulo_unico` (`si_rol_idsi_rol`,`si_modulo_idsi_modulo`),
  ADD KEY `si_fk_Permiso_Rol1_idx` (`si_rol_idsi_rol`),
  ADD KEY `si_fk_Permiso_Modulo1_idx` (`si_modulo_idsi_modulo`);

--
-- Indices de la tabla `si_reporte`
--
ALTER TABLE `si_reporte`
  ADD PRIMARY KEY (`idsi_reporte`),
  ADD KEY `si_fk_Reporte_Modulo1_idx` (`si_modulo_idsi_modulo`);

--
-- Indices de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  ADD PRIMARY KEY (`idsi_rol`);

--
-- Indices de la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD PRIMARY KEY (`idsi_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `si_fk_User_Rol_idx` (`si_rol_idsi_rol`);

--
-- Indices de la tabla `taller`
--
ALTER TABLE `taller`
  ADD PRIMARY KEY (`idtaller`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`idvehiculo`),
  ADD KEY `fk_vehiculo_persona_idx` (`propietario`),
  ADD KEY `fk_vehiculo_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `vehiculoreparando`
--
ALTER TABLE `vehiculoreparando`
  ADD PRIMARY KEY (`idvehiculoreparando`),
  ADD KEY `fk_vehiculoreparando_enviotaller1_idx` (`enviotaller_idenviotaller`),
  ADD KEY `fk_vehiculoreparando_taller1_idx` (`taller_idtaller`),
  ADD KEY `fk_vehiculoreparando_mecanico1_idx` (`mecanico_idmecanico`),
  ADD KEY `fk_vehiculoreparando_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado`),
  ADD KEY `fk_vehiculoreparando_estado1_idx` (`estado_idestado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bonificacion`
--
ALTER TABLE `bonificacion`
  MODIFY `idbonificacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `chofer`
--
ALTER TABLE `chofer`
  MODIFY `idchofer` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `concepto`
--
ALTER TABLE `concepto`
  MODIFY `idconcepto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `corralon`
--
ALTER TABLE `corralon`
  MODIFY `idcorralon` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  MODIFY `idegresoconcepto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `enviotaller`
--
ALTER TABLE `enviotaller`
  MODIFY `idenviotaller` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idestado` int(3) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `liquidacion`
--
ALTER TABLE `liquidacion`
  MODIFY `idliquidacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `mecanico`
--
ALTER TABLE `mecanico`
  MODIFY `idmecanico` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `idorden` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `orden_has_refaccion`
--
ALTER TABLE `orden_has_refaccion`
  MODIFY `idorden_has_refaccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `idpago` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `pagobonificacion`
--
ALTER TABLE `pagobonificacion`
  MODIFY `idpagobonificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `pagofianza`
--
ALTER TABLE `pagofianza`
  MODIFY `idpagofianza` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `pagoliquidacion`
--
ALTER TABLE `pagoliquidacion`
  MODIFY `idpagoliquidacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `permisotaxi`
--
ALTER TABLE `permisotaxi`
  MODIFY `idpermisotaxi` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `permisotaxiasignado`
--
ALTER TABLE `permisotaxiasignado`
  MODIFY `idpermisotaxiasignado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idpersona` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT de la tabla `refaccion`
--
ALTER TABLE `refaccion`
  MODIFY `idrefaccion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  MODIFY `idsi_modulo` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  MODIFY `idsi_permiso` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT de la tabla `si_reporte`
--
ALTER TABLE `si_reporte`
  MODIFY `idsi_reporte` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  MODIFY `idsi_rol` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `si_user`
--
ALTER TABLE `si_user`
  MODIFY `idsi_user` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `taller`
--
ALTER TABLE `taller`
  MODIFY `idtaller` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `idvehiculo` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `vehiculoreparando`
--
ALTER TABLE `vehiculoreparando`
  MODIFY `idvehiculoreparando` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|', AUTO_INCREMENT=11;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bonificacion`
--
ALTER TABLE `bonificacion`
  ADD CONSTRAINT `fk_bonificacion_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_bonificacion_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `chofer`
--
ALTER TABLE `chofer`
  ADD CONSTRAINT `fk_chofer_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_estado2` FOREIGN KEY (`estado_idestado_fianza`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_persona1` FOREIGN KEY (`chofer`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_persona2` FOREIGN KEY (`aval1`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_persona3` FOREIGN KEY (`aval2`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_persona4` FOREIGN KEY (`aval3`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_chofer_persona5` FOREIGN KEY (`aval4`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `corralon`
--
ALTER TABLE `corralon`
  ADD CONSTRAINT `fk_corralon_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_corralon_permisotaxiasignado1` FOREIGN KEY (`permisotaxiasignado_idpermisotaxiasignado`) REFERENCES `permisotaxiasignado` (`idpermisotaxiasignado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  ADD CONSTRAINT `fk_egresoconcepto_concepto1` FOREIGN KEY (`concepto_idconcepto`) REFERENCES `concepto` (`idconcepto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_egresoconcepto_taller1` FOREIGN KEY (`taller_idtaller`) REFERENCES `taller` (`idtaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `enviotaller`
--
ALTER TABLE `enviotaller`
  ADD CONSTRAINT `fk_enviotaller_permisotaxiasignado1` FOREIGN KEY (`permisotaxiasignado_idpermisotaxiasignado`) REFERENCES `permisotaxiasignado` (`idpermisotaxiasignado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_enviotaller_taller1` FOREIGN KEY (`taller_idtaller`) REFERENCES `taller` (`idtaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `liquidacion`
--
ALTER TABLE `liquidacion`
  ADD CONSTRAINT `fk_liquidacion_chofer2` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_liquidacion_estado2` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_liquidacion_permisotaxiasignado1` FOREIGN KEY (`permisotaxiasignado_idpermisotaxiasignado`) REFERENCES `permisotaxiasignado` (`idpermisotaxiasignado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `mecanico`
--
ALTER TABLE `mecanico`
  ADD CONSTRAINT `fk_mecanico_persona1` FOREIGN KEY (`persona_idpersona`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_mecanico_taller2` FOREIGN KEY (`taller_idtaller`) REFERENCES `taller` (`idtaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `fk_orden_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_orden_vehiculoreparando1` FOREIGN KEY (`vehiculoreparando_idvehiculoreparando`) REFERENCES `vehiculoreparando` (`idvehiculoreparando`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orden_has_refaccion`
--
ALTER TABLE `orden_has_refaccion`
  ADD CONSTRAINT `fk_ordenrefaccion_orden1` FOREIGN KEY (`orden_idorden`) REFERENCES `orden` (`idorden`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ordenrefaccion_refaccion1` FOREIGN KEY (`refaccion_idrefaccion`) REFERENCES `refaccion` (`idrefaccion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `fk_liquidacion_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_liquidacion_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagobonificacion`
--
ALTER TABLE `pagobonificacion`
  ADD CONSTRAINT `fk_pagobonificacion_bonificacion1` FOREIGN KEY (`bonificacion_idbonificacion`) REFERENCES `bonificacion` (`idbonificacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pagobonificacion_pago1` FOREIGN KEY (`pago_idpago`) REFERENCES `pago` (`idpago`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagofianza`
--
ALTER TABLE `pagofianza`
  ADD CONSTRAINT `fk_pagofianza_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pagofianza_pago1` FOREIGN KEY (`pago_idpago`) REFERENCES `pago` (`idpago`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pagoliquidacion`
--
ALTER TABLE `pagoliquidacion`
  ADD CONSTRAINT `fk_pagoliquidacion_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pagoliquidacion_pago1` FOREIGN KEY (`pago_idpago`) REFERENCES `pago` (`idpago`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permisotaxi`
--
ALTER TABLE `permisotaxi`
  ADD CONSTRAINT `fk_permisotaxi_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_permisotaxi_persona1` FOREIGN KEY (`propietario`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_permisotaxi_vehiculo1` FOREIGN KEY (`vehiculo_idvehiculo`) REFERENCES `vehiculo` (`idvehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permisotaxiasignado`
--
ALTER TABLE `permisotaxiasignado`
  ADD CONSTRAINT `fk_permisotaxiasignado_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_permisotaxiasignado_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_permisotaxiasignado_permisotaxi1` FOREIGN KEY (`permisotaxi_idpermisotaxi`) REFERENCES `permisotaxi` (`idpermisotaxi`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `refaccion`
--
ALTER TABLE `refaccion`
  ADD CONSTRAINT `fk_refaccion_taller1` FOREIGN KEY (`taller_idtaller`) REFERENCES `taller` (`idtaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD CONSTRAINT `si_fk_Permiso_Modulo1` FOREIGN KEY (`si_modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `si_fk_Permiso_Rol1` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_reporte`
--
ALTER TABLE `si_reporte`
  ADD CONSTRAINT `si_fk_Reporte_Modulo1` FOREIGN KEY (`si_modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD CONSTRAINT `si_fk_User_Rol` FOREIGN KEY (`si_rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `fk_vehiculo_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculo_persona` FOREIGN KEY (`propietario`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `vehiculoreparando`
--
ALTER TABLE `vehiculoreparando`
  ADD CONSTRAINT `fk_vehiculoreparando_enviotaller1` FOREIGN KEY (`enviotaller_idenviotaller`) REFERENCES `enviotaller` (`idenviotaller`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculoreparando_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculoreparando_mecanico1` FOREIGN KEY (`mecanico_idmecanico`) REFERENCES `mecanico` (`idmecanico`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculoreparando_permisotaxiasignado1` FOREIGN KEY (`permisotaxiasignado_idpermisotaxiasignado`) REFERENCES `permisotaxiasignado` (`idpermisotaxiasignado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_vehiculoreparando_taller1` FOREIGN KEY (`taller_idtaller`) REFERENCES `taller` (`idtaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
