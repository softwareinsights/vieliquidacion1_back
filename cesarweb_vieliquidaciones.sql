-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 31-01-2018 a las 12:44:14
-- Versión del servidor: 5.5.51-38.2
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `cesarweb_vieliquidaciones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bonificacion`
--

CREATE TABLE IF NOT EXISTS `bonificacion` (
  `idbonificacion` int(11) NOT NULL COMMENT '0|',
  `cantidad` float DEFAULT NULL COMMENT '1|Cantidad',
  `validado` tinyint(4) DEFAULT NULL COMMENT '1|Validado',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `concepto` varchar(45) DEFAULT NULL COMMENT '1|Concepto',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='1|1|Bonificaciones||chofer_chofer_idchofer.Nombre del Chofer,estado_estado_idestado.Estado,concepto.Concepto';

--
-- Volcado de datos para la tabla `bonificacion`
--

INSERT INTO `bonificacion` (`idbonificacion`, `cantidad`, `validado`, `fecha`, `estado_idestado`, `concepto`, `chofer_idchofer`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(2, 600, 1, '2018-01-16', 7, 'PUNTUALIDAD', 9, NULL, 1, '2018-01-16 20:54:23', '2018-01-17 19:17:24'),
(3, 262.5, 1, '2018-01-17', 7, 'BONIFICACIÓN POR TIEMPO EN TALLER', 9, NULL, NULL, '2018-01-18 00:11:30', '2018-01-18 04:52:57'),
(4, -335.174, 1, '2018-01-19', 7, 'BONIFICACIÓN POR TIEMPO EN CORRALÓN', 9, NULL, NULL, '2018-01-18 06:10:03', '2018-01-19 05:29:12'),
(5, -120.556, 1, '2018-01-18', 7, 'BONIFICACIÓN POR TIEMPO EN CORRALÓN', 9, NULL, NULL, '2018-01-18 19:27:56', '2018-01-18 22:40:31'),
(6, 1.21528, 1, '2018-01-18', 7, 'BONIFICACIÓN POR TIEMPO EN CORRALÓN', 9, NULL, NULL, '2018-01-19 05:16:44', '2018-01-19 05:17:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chofer`
--

CREATE TABLE IF NOT EXISTS `chofer` (
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
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='1|2|Choferes||persona_chofer.Nombre de Chofer,estado_estado_idestado.Estado del Chofer,estado_estado_idestado_fianza.Estado de la Fianza';

--
-- Volcado de datos para la tabla `chofer`
--

INSERT INTO `chofer` (`idchofer`, `licencia`, `fianza`, `estado_idestado`, `estado_idestado_fianza`, `chofer`, `aval1`, `aval2`, `aval3`, `aval4`, `deudafianza`, `deudaliquidacion`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(9, '666', 2500, 5, 5, 63, 63, 63, 63, 63, 600, 700, NULL, 1, '2018-01-16 20:48:07', '2018-01-19 19:20:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `concepto`
--

CREATE TABLE IF NOT EXISTS `concepto` (
  `idconcepto` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='1|3|Conceptos||nombre.Concepto';

--
-- Volcado de datos para la tabla `concepto`
--

INSERT INTO `concepto` (`idconcepto`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'x', NULL, 1, '2018-01-17 03:05:05', '2018-01-17 03:05:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corralon`
--

CREATE TABLE IF NOT EXISTS `corralon` (
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
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='1|5|Corralones||motivo.Motivo,corralonNombre.Corralón,permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado.Número de Permiso,fecha.Fecha de Ingreso';

--
-- Volcado de datos para la tabla `corralon`
--

INSERT INTO `corralon` (`idcorralon`, `fecha`, `hora`, `fechaSalida`, `horaSalida`, `infraccionNumero`, `corralonNombre`, `motivo`, `estado_idestado`, `permisotaxiasignado_idpermisotaxiasignado`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, '2018-01-17', '23:11:00', '2018-01-18', '23:16:00', 13663436, 'SAN PASCUAL', 'SE ESTACIONÓ MAL', 1, 5, NULL, 1, '2018-01-18 04:40:44', '2018-01-19 05:16:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresoconcepto`
--

CREATE TABLE IF NOT EXISTS `egresoconcepto` (
  `idegresoconcepto` int(11) NOT NULL COMMENT '0|',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `total` int(11) DEFAULT NULL COMMENT '1|Total',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `concepto_idconcepto` int(11) NOT NULL COMMENT '1|Concepto|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|6|Egreso Conceptos||fecha.Fecha,taller_taller_idtaller.Nombre del Taller,concepto_concepto_idconcepto.Concepto';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enviotaller`
--

CREATE TABLE IF NOT EXISTS `enviotaller` (
  `idenviotaller` int(11) NOT NULL COMMENT '0|',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `motivo` varchar(80) DEFAULT NULL COMMENT '1|Motivo',
  `permisotaxiasignado_idpermisotaxiasignado` int(11) NOT NULL COMMENT '1|Permiso Taxi|**numero permisotaxi.idpermisotaxi permisotaxiasignado.permisotaxi_idpermisotaxi',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='1|7|Envios Taller||motivo.Motivo,permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado.Número de Permiso,taller_taller_idtaller.Nombre del Taller,fecha.Fecha de Envío';

--
-- Volcado de datos para la tabla `enviotaller`
--

INSERT INTO `enviotaller` (`idenviotaller`, `fecha`, `hora`, `motivo`, `permisotaxiasignado_idpermisotaxiasignado`, `taller_idtaller`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(3, '2018-01-19', '11:11:00', 'CAMBIO DE LLANTAS', 5, 4, NULL, 1, '2018-01-17 03:07:56', '2018-01-17 03:07:56'),
(4, '2018-01-17', '00:00:00', 'NECESITA ALINEACIÓN Y BALANCEO', 5, 4, NULL, 1, '2018-01-17 16:16:56', '2018-01-17 16:16:56'),
(5, '2018-01-23', '11:11:00', 'CHOCÓ', 5, 4, NULL, 1, '2018-01-17 16:18:32', '2018-01-17 16:18:32'),
(6, '2018-01-31', '11:11:00', 'TEST1', 5, 4, NULL, 1, '2018-01-17 16:26:05', '2018-01-17 16:26:05'),
(7, '2018-01-18', '14:22:00', 'TEST2', 5, 4, NULL, 1, '2018-01-17 16:29:49', '2018-01-17 16:29:49'),
(8, '2018-01-17', '03:33:00', 'CAJA DE VELOCIDADES DAÑADA', 5, 4, NULL, 1, '2018-01-17 16:44:58', '2018-01-17 16:44:58'),
(9, '2018-01-17', '00:11:00', 'TEST2', 5, 4, NULL, 1, '2018-01-17 16:46:52', '2018-01-17 16:46:52'),
(10, '2018-01-19', '14:22:00', 'x', 6, 4, NULL, 1, '2018-01-17 17:09:15', '2018-01-17 17:09:15'),
(11, '2018-01-17', '11:11:00', 'YYYYYYYYYY', 8, 4, NULL, 1, '2018-01-18 00:16:00', '2018-01-18 22:39:15'),
(12, '2018-01-17', '14:21:00', 'REPARAR BALATAS', 6, 4, NULL, 1, '2018-01-18 04:24:01', '2018-01-18 04:24:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE IF NOT EXISTS `estado` (
  `idestado` int(3) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Estado',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='1|9|Estados||nombre.Estado';

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idestado`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'FUERA', NULL, NULL, '2018-01-18 05:45:06', '2018-01-18 05:45:06'),
(5, 'ACTIVO', NULL, 1, '2018-01-16 20:47:18', '2018-01-16 20:47:18'),
(6, 'NOAPLICADA', NULL, 1, '2018-01-16 20:59:01', '2018-01-16 20:59:01'),
(7, 'APLICADA', NULL, 1, '2018-01-16 20:59:07', '2018-01-16 20:59:07'),
(8, 'PAGADA', NULL, 1, '2018-01-16 23:20:05', '2018-01-16 23:20:05'),
(9, 'ADEUDANDO', NULL, 1, '2018-01-16 23:20:11', '2018-01-16 23:20:11'),
(10, 'INACTIVO', NULL, 1, '2018-01-17 16:17:28', '2018-01-17 16:17:28'),
(11, 'REPARANDO', NULL, 1, '2018-01-17 16:31:58', '2018-01-17 16:31:58'),
(12, 'ASIGNADO', NULL, 1, '2018-01-17 16:56:44', '2018-01-17 16:56:44'),
(13, 'NOASIGNADO', NULL, 1, '2018-01-17 16:56:51', '2018-01-17 16:56:51'),
(14, 'ASIGNADO-REPARANDO', NULL, 1, '2018-01-17 16:58:06', '2018-01-17 16:58:06'),
(15, 'TALLER', NULL, 1, '2018-01-17 17:02:51', '2018-01-17 17:02:51'),
(16, 'REPARADO', NULL, 1, '2018-01-17 17:39:18', '2018-01-17 17:39:18'),
(17, 'ASIGNADO-CORRALÓN', NULL, 1, '2018-01-17 17:54:57', '2018-01-17 17:54:57'),
(18, 'CORRALON', NULL, 1, '2018-01-17 18:00:16', '2018-01-18 06:02:59'),
(19, 'DISPONIBLE', NULL, 1, '2018-01-17 18:01:54', '2018-01-17 18:01:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `liquidacion`
--

CREATE TABLE IF NOT EXISTS `liquidacion` (
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
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `liquidacion`
--

INSERT INTO `liquidacion` (`idliquidacion`, `fecha`, `saldoanterior`, `saldoactual`, `montopagado`, `bonificado`, `h_corte`, `permisotaxiasignado_idpermisotaxiasignado`, `chofer_idchofer`, `estado_idestado`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(2, '2018-01-16', 350, -850, 0, 600, '11:11:00', 5, 9, 9, NULL, 1, '2018-01-16 20:51:14', '2018-01-17 19:17:24'),
(3, '2018-01-17', 350, 87.5, 0, 262.5, '04:44:00', 5, 9, 9, NULL, 1, '2018-01-18 04:47:18', '2018-01-18 04:52:57'),
(4, '2018-01-18', 350, 469.341, 0, 1.21528, '14:22:00', 5, 9, 9, NULL, 1, '2018-01-18 04:48:03', '2018-01-19 05:17:07'),
(5, '2018-01-19', 350, 685.174, 0, -335.174, '14:22:00', 9, 9, 9, NULL, 1, '2018-01-18 05:28:56', '2018-01-19 05:29:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mecanico`
--

CREATE TABLE IF NOT EXISTS `mecanico` (
  `idmecanico` int(11) NOT NULL COMMENT '0|',
  `persona_idpersona` int(11) NOT NULL COMMENT '1|Persona|nombre',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='1|11|Mecánicos||persona_persona_idpersona.Nombre,taller_taller_idtaller.Nombre de Taller';

--
-- Volcado de datos para la tabla `mecanico`
--

INSERT INTO `mecanico` (`idmecanico`, `persona_idpersona`, `taller_idtaller`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(3, 63, 4, NULL, 1, '2018-01-17 03:08:36', '2018-01-17 03:08:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE IF NOT EXISTS `orden` (
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
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='1|12|Ordenes|orden_has_refaccion.orden_idorden.refaccion_idrefaccion.refaccion.idrefaccion.nombre.Refacciones|fecha.Fecha,estado_estado_idestado.Estado,descripcion.Descripción,vehiculoreparando_vehiculoreparando_idvehiculoreparando.Motivo de Reparación\n';

--
-- Volcado de datos para la tabla `orden`
--

INSERT INTO `orden` (`idorden`, `fecha`, `hora`, `manoObra`, `subtotal`, `total`, `anticipo`, `estado_idestado`, `descripcion`, `vehiculoreparando_idvehiculoreparando`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(4, '2018-01-17', '11:11:00', 300, 500, 600, 100, 9, 'X', 3, NULL, 1, '2018-01-18 04:27:05', '2018-01-18 04:27:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_has_refaccion`
--

CREATE TABLE IF NOT EXISTS `orden_has_refaccion` (
  `idorden_has_refaccion` int(11) NOT NULL,
  `orden_idorden` int(11) NOT NULL COMMENT '1|Orden|idorden',
  `refaccion_idrefaccion` int(11) NOT NULL COMMENT '1|Refacción|nombre',
  `cantidad` int(11) DEFAULT NULL COMMENT '1|Cantidad',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='1|12|Refacciones de ordenes||refaccion_refaccion_idrefaccion.Nombre de Refacción';

--
-- Volcado de datos para la tabla `orden_has_refaccion`
--

INSERT INTO `orden_has_refaccion` (`idorden_has_refaccion`, `orden_idorden`, `refaccion_idrefaccion`, `cantidad`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 4, 3, 6, NULL, 1, '2018-01-18 04:27:05', '2018-01-18 04:29:20'),
(2, 4, 4, 2, NULL, 1, '2018-01-18 04:27:05', '2018-01-18 04:38:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE IF NOT EXISTS `pago` (
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
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='1|10|Pagos|pagobonificacion.pago_idpago.bonificacion_idbonificacion.bonificacion.idbonificacion.concepto.Bonificaciones por Conceptos|chofer_chofer_idchofer.Chofer,fecha.Fecha,nota.Nota,estado_estado_idestado.Estado';

--
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`idpago`, `cantidadRecibida`, `cambio`, `kilometraje`, `fecha`, `hora`, `nota`, `cantPagada`, `estado_idestado`, `descripcion`, `folio`, `liquidacion`, `foliofianza`, `fianza`, `chofer_idchofer`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(3, 600, 0, 50000, '2018-01-16', '02:31:00', 'x', 700, 9, 'x', '123', 100, '124', 300, 9, NULL, 1, '2018-01-16 23:26:38', '2018-01-16 23:26:38'),
(4, 600, 0, 50000, '2018-01-16', '02:31:00', 'x', 700, 9, 'x', '128', 100, '124', 300, 9, 1, 1, '2018-01-16 23:26:47', '2018-01-17 01:30:58'),
(5, 600, 20, 4000, '2018-01-17', '11:11:00', 'x', 580, 7, 'x', '556', 400, '557', 100, 9, NULL, 1, '2018-01-17 01:40:19', '2018-01-17 01:40:19'),
(6, 500, 1, 3333, '0001-11-11', '11:11:00', 'x', 500, 5, 'x', '5000', 100, '5001', 300, 9, NULL, 1, '2018-01-17 01:45:17', '2018-01-17 01:45:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagobonificacion`
--

CREATE TABLE IF NOT EXISTS `pagobonificacion` (
  `idpagobonificacion` int(11) NOT NULL,
  `bonificacion_idbonificacion` int(11) NOT NULL COMMENT '1|Bonificación|concepto',
  `pago_idpago` int(11) NOT NULL COMMENT '1|Pago|folio',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Pago de Bonificaciones';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagofianza`
--

CREATE TABLE IF NOT EXISTS `pagofianza` (
  `idpagofianza` int(11) NOT NULL COMMENT '0|',
  `saldoanterior` float DEFAULT NULL COMMENT '1|Saldo Anterior',
  `montopagado` float DEFAULT NULL COMMENT '1|Monto Pagado',
  `saldoactual` float DEFAULT NULL COMMENT '1|Saldo Actual',
  `pago_idpago` int(11) NOT NULL COMMENT '1|Pago|folio',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='1|12|Pago de Fianzas';

--
-- Volcado de datos para la tabla `pagofianza`
--

INSERT INTO `pagofianza` (`idpagofianza`, `saldoanterior`, `montopagado`, `saldoactual`, `pago_idpago`, `chofer_idchofer`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 5000, 3000, 2000, 3, 9, NULL, 1, '2018-01-17 01:36:57', '2018-01-17 01:36:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagoliquidacion`
--

CREATE TABLE IF NOT EXISTS `pagoliquidacion` (
  `idpagoliquidacion` int(11) NOT NULL COMMENT '0|',
  `saldoanterior` float DEFAULT NULL COMMENT '1|Saldo Anterior',
  `montopagado` float DEFAULT NULL COMMENT '1|Monto Pagado',
  `saldoactual` float DEFAULT NULL COMMENT '1|Saldo Actual',
  `pago_idpago` int(11) NOT NULL COMMENT '1|Pago|folio',
  `liquidacion_idliquidacion` int(11) NOT NULL COMMENT '1|Liquidación|fecha',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='1|12|Pago de Liquidaciones';

--
-- Volcado de datos para la tabla `pagoliquidacion`
--

INSERT INTO `pagoliquidacion` (`idpagoliquidacion`, `saldoanterior`, `montopagado`, `saldoactual`, `pago_idpago`, `liquidacion_idliquidacion`, `chofer_idchofer`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(3, 500, 600, 700, 4, 100, 9, NULL, 1, '2018-01-16 23:29:51', '2018-01-16 23:29:51'),
(5, NULL, NULL, NULL, 6, 2, 9, NULL, 1, '2018-01-17 01:45:17', '2018-01-17 01:45:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisotaxi`
--

CREATE TABLE IF NOT EXISTS `permisotaxi` (
  `idpermisotaxi` int(11) NOT NULL COMMENT '0|',
  `numero` varchar(45) DEFAULT NULL COMMENT '1|Número',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `fechaAlta` date DEFAULT NULL COMMENT '1|Fecha Alta',
  `vigencia` date DEFAULT NULL COMMENT '1|Vigencia',
  `liquidez` int(11) DEFAULT NULL COMMENT '1|Liquidez',
  `liquidezDom` int(11) DEFAULT NULL COMMENT '1|Liquidez Domingo',
  `propietario` int(11) NOT NULL COMMENT '1|Propietario|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='1|13|Permisos Taxi||numero.Número,persona_propietario.Nombre del Propietario';

--
-- Volcado de datos para la tabla `permisotaxi`
--

INSERT INTO `permisotaxi` (`idpermisotaxi`, `numero`, `estado_idestado`, `fechaAlta`, `vigencia`, `liquidez`, `liquidezDom`, `propietario`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(5, '666666666', 5, '2018-01-16', '2018-01-23', 350, 250, 63, NULL, 1, '2018-01-16 20:50:03', '2018-01-16 20:50:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisotaxiasignado`
--

CREATE TABLE IF NOT EXISTS `permisotaxiasignado` (
  `idpermisotaxiasignado` int(11) NOT NULL COMMENT '0|',
  `estado_idestado` int(3) NOT NULL COMMENT '1|Estado|nombre',
  `fecha` date DEFAULT NULL COMMENT '1|Fecha',
  `hora` time DEFAULT NULL COMMENT '1|Hora',
  `chofer_idchofer` int(11) NOT NULL COMMENT '1|Chofer|**nombre persona.idpersona chofer.chofer',
  `vehiculo_idvehiculo` int(11) NOT NULL COMMENT '1|Vehículo|placa',
  `permisotaxi_idpermisotaxi` int(11) NOT NULL COMMENT '1|Permiso Taxi|numero',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='1|14|Permisos Taxi Asignados||vehiculo_vehiculo_idvehiculo.Placa de Vehiculo,permisotaxi_permisotaxi_idpermisotaxi.Número de Permiso,chofer_chofer_idchofer.Nombre de Chofer,fecha.Fecha,estado_estado_idestado.Estado';

--
-- Volcado de datos para la tabla `permisotaxiasignado`
--

INSERT INTO `permisotaxiasignado` (`idpermisotaxiasignado`, `estado_idestado`, `fecha`, `hora`, `chofer_idchofer`, `vehiculo_idvehiculo`, `permisotaxi_idpermisotaxi`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(5, 17, '2018-01-12', '11:11:00', 9, 4, 5, NULL, 1, '2018-01-16 20:50:05', '2018-01-18 04:40:44'),
(6, 14, '2018-01-10', '00:12:00', 9, 4, 5, NULL, 1, '2018-01-17 16:57:31', '2018-01-18 04:24:01'),
(8, 14, '2018-01-17', '04:44:00', 9, 4, 5, NULL, 1, '2018-01-17 17:50:04', '2018-01-18 00:16:00'),
(9, 12, '2018-01-19', '14:22:00', 9, 4, 5, NULL, 1, '2018-01-18 05:28:56', '2018-01-18 05:28:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE IF NOT EXISTS `persona` (
  `idpersona` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `edad` int(11) DEFAULT NULL COMMENT '1|Edad',
  `sexo` varchar(15) DEFAULT NULL COMMENT '1|Sexo',
  `rfc` varchar(45) DEFAULT NULL COMMENT '1|RFC',
  `telefono` int(11) DEFAULT NULL COMMENT '1|Télefono',
  `domicilio` varchar(60) DEFAULT NULL COMMENT '1|Domicilio',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COMMENT='1|15|Personas||nombre.Nombre,rfc.RFC,domicilio.Domicilio';

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idpersona`, `nombre`, `edad`, `sexo`, `rfc`, `telefono`, `domicilio`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(63, 'Pedro Garcia', 55, 'MASCULINO', '5347354524', 2147483647, 'X', NULL, 1, '2018-01-16 20:48:00', '2018-01-16 20:48:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refaccion`
--

CREATE TABLE IF NOT EXISTS `refaccion` (
  `idrefaccion` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `precioCompra` int(11) DEFAULT NULL COMMENT '1|Precio Compra',
  `precioVenta` int(11) DEFAULT NULL COMMENT '1|Precio Venta',
  `taller_idtaller` int(11) NOT NULL COMMENT '1|Taller|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='1|16|Refacciones||nombre.Nombre de Refacción,taller_taller_idtaller.Nombre de Taller';

--
-- Volcado de datos para la tabla `refaccion`
--

INSERT INTO `refaccion` (`idrefaccion`, `nombre`, `precioCompra`, `precioVenta`, `taller_idtaller`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(3, 'BALATAS', 400, 500, 4, NULL, 1, '2018-01-18 04:26:47', '2018-01-18 04:26:47'),
(4, 'Llanta Michelin 4x4', 6000, 7000, 4, NULL, 1, '2018-01-18 04:26:59', '2018-01-18 04:26:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_modulo`
--

CREATE TABLE IF NOT EXISTS `si_modulo` (
  `idsi_modulo` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COMMENT='1|1|Módulos||nombre.Módulo';

--
-- Volcado de datos para la tabla `si_modulo`
--

INSERT INTO `si_modulo` (`idsi_modulo`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(28, 'bonificacion', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(29, 'chofer', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(30, 'concepto', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(31, 'corralon', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(32, 'egresoconcepto', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(33, 'enviotaller', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(34, 'estado', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(35, 'liquidacion', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(36, 'mecanico', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(37, 'orden', 0, NULL, '2018-01-16 19:42:30', '2018-01-16 19:42:30'),
(38, 'orden_has_refaccion', 0, NULL, '2018-01-16 19:42:31', '2018-01-16 19:42:31'),
(39, 'pago', 0, NULL, '2018-01-16 19:42:31', '2018-01-16 19:42:31'),
(40, 'pagobonificacion', 0, NULL, '2018-01-16 19:42:31', '2018-01-16 19:42:31'),
(41, 'pagofianza', 0, NULL, '2018-01-16 19:42:31', '2018-01-16 19:42:31'),
(42, 'pagoliquidacion', 0, NULL, '2018-01-16 19:42:31', '2018-01-16 19:42:31'),
(43, 'permisotaxi', 0, NULL, '2018-01-16 19:42:31', '2018-01-16 19:42:31'),
(44, 'permisotaxiasignado', 0, NULL, '2018-01-16 19:42:31', '2018-01-16 19:42:31'),
(45, 'persona', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32'),
(46, 'refaccion', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32'),
(47, 'si_modulo', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32'),
(48, 'si_permiso', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32'),
(49, 'si_reporte', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32'),
(50, 'si_rol', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32'),
(51, 'si_user', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32'),
(52, 'taller', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32'),
(53, 'vehiculo', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32'),
(54, 'vehiculoreparando', 0, NULL, '2018-01-16 19:42:32', '2018-01-16 19:42:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_permiso`
--

CREATE TABLE IF NOT EXISTS `si_permiso` (
  `idsi_permiso` int(4) NOT NULL,
  `acceso` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1|Acceso',
  `Rol_idsi_rol` int(4) NOT NULL COMMENT '1|Rol|nombre',
  `Modulo_idsi_modulo` int(4) NOT NULL COMMENT '1|Módulo|nombre',
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
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='1|2|Permisos||modulo_Modulo_idsi_modulo.Módulo';

--
-- Volcado de datos para la tabla `si_permiso`
--

INSERT INTO `si_permiso` (`idsi_permiso`, `acceso`, `Rol_idsi_rol`, `Modulo_idsi_modulo`, `readable`, `writeable`, `updateable`, `deleteable`, `read_own`, `write_own`, `update_own`, `delete_own`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 1, 1, 28, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, '2018-01-19 03:06:12', '2018-01-19 03:06:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_reporte`
--

CREATE TABLE IF NOT EXISTS `si_reporte` (
  `idsi_reporte` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `consulta` varchar(400) NOT NULL COMMENT '1|Consulta',
  `campos` varchar(140) NOT NULL COMMENT '1|Campos a mostrar',
  `Modulo_idsi_modulo` int(4) NOT NULL COMMENT '1|Módulo|nombre',
  `pfd` tinyint(1) DEFAULT '0' COMMENT '1|Exportar a PDF',
  `excel` tinyint(1) DEFAULT '0' COMMENT '1|Exportar a Excel',
  `print` tinyint(1) DEFAULT '0' COMMENT '1|Impresión',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|5|Reportes||nombre.Nombre';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_rol`
--

CREATE TABLE IF NOT EXISTS `si_rol` (
  `idsi_rol` int(4) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='1|3|Roles||nombre.Rol';

--
-- Volcado de datos para la tabla `si_rol`
--

INSERT INTO `si_rol` (`idsi_rol`, `nombre`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'VISITANTE', 0, NULL, '2018-01-16 19:42:33', '2018-01-16 19:42:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `si_user`
--

CREATE TABLE IF NOT EXISTS `si_user` (
  `idsi_user` int(4) NOT NULL,
  `usuario` varchar(45) DEFAULT NULL COMMENT '1|Usuario',
  `email` varchar(60) NOT NULL COMMENT '1|Email',
  `password` binary(60) DEFAULT NULL COMMENT '1|Password',
  `Rol_idsi_rol` int(4) NOT NULL COMMENT '1|Rol|nombre',
  `super` tinyint(1) DEFAULT '0' COMMENT '0|',
  `baja` tinyint(1) DEFAULT '0' COMMENT '0|',
  `created_by` int(4) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='1|4|Usuarios||usuario.Usuario,email.Email,rol_Rol_idsi_rol.Rol';

--
-- Volcado de datos para la tabla `si_user`
--

INSERT INTO `si_user` (`idsi_user`, `usuario`, `email`, `password`, `Rol_idsi_rol`, `super`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(1, 'SuperUsuario', 'admin@liquidacion1601.com', 0x243261243130246362766c3943474b4d525146327a564a4a577945747549676c4f4651384f5056517951436c4c6d344e50314e386e4d4a6175476b47, 1, 1, 0, NULL, '2018-01-16 19:42:33', '2018-01-18 04:02:07'),
(5, 'test', 'test@test.com', 0x5b6f626a656374204f626a6563745d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 1, 0, 0, 1, '2018-01-18 00:40:53', '2018-01-18 00:41:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller`
--

CREATE TABLE IF NOT EXISTS `taller` (
  `idtaller` int(11) NOT NULL COMMENT '0|',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `direccion` varchar(80) DEFAULT NULL COMMENT '1|Dirección',
  `telefono` int(11) DEFAULT NULL COMMENT '1|Teléfono',
  `descripcion` varchar(80) DEFAULT NULL COMMENT '1|Descripción',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='1|17|Talleres||nombre.Nombre,direccion.Dirección';

--
-- Volcado de datos para la tabla `taller`
--

INSERT INTO `taller` (`idtaller`, `nombre`, `direccion`, `telefono`, `descripcion`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(4, 'TALLER UNO', 'Colón 123', 1234567, 'X', NULL, 1, '2018-01-17 03:06:06', '2018-01-17 03:06:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE IF NOT EXISTS `vehiculo` (
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
  `condActual` varchar(150) DEFAULT NULL COMMENT '1|Condición Actual',
  `condInicial` varchar(150) DEFAULT NULL COMMENT '1|Condición Inicial',
  `color` varchar(20) DEFAULT NULL COMMENT '1|Color',
  `propietario` int(11) NOT NULL COMMENT '1|Propietario|nombre',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='1|18|Vehículos||marca.Marca,modelo.Modelo,placa.Placa,color.Color,persona_propietario.Nombre de Propietario';

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`idvehiculo`, `marca`, `modelo`, `anio`, `serie`, `serieMotor`, `placa`, `kilometraje`, `estado_idestado`, `poliza`, `polizaTipo`, `condActual`, `condInicial`, `color`, `propietario`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(4, 'FORD', '2000', 2017, 'KMX', '24537657423', 'HJS-123-BC', 243845, 19, 'x', 'x', 'BUEN ESTADO', 'BUEN ESTADO', 'AMARILLO', 63, NULL, 1, '2018-01-16 20:49:44', '2018-01-18 06:10:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculoreparando`
--

CREATE TABLE IF NOT EXISTS `vehiculoreparando` (
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
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='1|19|Vehículos Reparando||fechaIngresa.Fecha Ingreso,fechaSalida.Fecha Salida,inventario.Inventario,motivo.Motivo de Reparación,enviotaller_enviotaller_idenviotaller.Motivo Envío a Taller,mecanico_mecanico_idmecanico.Mecánico,permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado.Permiso,estado_estado_idestado.Estado';

--
-- Volcado de datos para la tabla `vehiculoreparando`
--

INSERT INTO `vehiculoreparando` (`idvehiculoreparando`, `fechaIngresa`, `horaIngresa`, `fechaSalida`, `horaSalida`, `fechaEstimada`, `horaEstimada`, `inventario`, `motivo`, `estado_idestado`, `enviotaller_idenviotaller`, `taller_idtaller`, `mecanico_idmecanico`, `permisotaxiasignado_idpermisotaxiasignado`, `baja`, `created_by`, `created_at`, `modified_at`) VALUES
(3, '2018-01-18', '11:11:00', '2018-01-17', '00:00:00', '2018-01-19', '11:11:00', 'X', 'X', 16, 3, 4, 3, 5, NULL, 1, '2018-01-17 03:10:46', '2018-01-17 18:08:00'),
(4, '2018-01-19', '11:11:00', '2018-01-17', '13:42:00', '2018-01-17', '14:22:00', 'x', 'x', 16, 3, 4, 3, 6, NULL, 1, '2018-01-17 19:02:30', '2018-01-17 19:42:02'),
(5, '2018-01-19', '11:11:00', '2018-01-17', '00:00:00', '2018-01-17', '11:11:00', 'x', 'x', 16, 3, 4, 3, 6, NULL, 1, '2018-01-17 19:04:44', '2018-01-17 19:08:39'),
(6, '2018-01-17', '03:33:00', '2018-01-17', '15:40:00', '2018-01-19', '11:11:00', 'x', 'x', 16, 8, 4, 3, 5, NULL, 1, '2018-01-17 19:09:24', '2018-01-17 21:40:20'),
(7, '2018-01-17', '00:11:00', '2018-01-17', '18:11:00', '2018-01-18', '14:22:00', 'x', 'x', 11, 9, 4, 3, 5, NULL, 1, '2018-01-17 23:18:56', '2018-01-18 06:10:53');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bonificacion`
--
ALTER TABLE `bonificacion`
  ADD PRIMARY KEY (`idbonificacion`), ADD KEY `fk_bonificacion_chofer1_idx` (`chofer_idchofer`), ADD KEY `fk_bonificacion_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `chofer`
--
ALTER TABLE `chofer`
  ADD PRIMARY KEY (`idchofer`), ADD KEY `fk_chofer_persona1_idx` (`chofer`), ADD KEY `fk_chofer_persona2_idx` (`aval1`), ADD KEY `fk_chofer_persona3_idx` (`aval2`), ADD KEY `fk_chofer_persona4_idx` (`aval3`), ADD KEY `fk_chofer_persona5_idx` (`aval4`), ADD KEY `fk_chofer_estado1_idx` (`estado_idestado`), ADD KEY `fk_chofer_estado2_idx` (`estado_idestado_fianza`);

--
-- Indices de la tabla `concepto`
--
ALTER TABLE `concepto`
  ADD PRIMARY KEY (`idconcepto`);

--
-- Indices de la tabla `corralon`
--
ALTER TABLE `corralon`
  ADD PRIMARY KEY (`idcorralon`), ADD KEY `fk_corralon_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado`), ADD KEY `fk_corralon_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  ADD PRIMARY KEY (`idegresoconcepto`), ADD KEY `fk_egresoconcepto_taller1_idx` (`taller_idtaller`), ADD KEY `fk_egresoconcepto_concepto1_idx` (`concepto_idconcepto`);

--
-- Indices de la tabla `enviotaller`
--
ALTER TABLE `enviotaller`
  ADD PRIMARY KEY (`idenviotaller`), ADD KEY `fk_enviotaller_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado`), ADD KEY `fk_enviotaller_taller1_idx` (`taller_idtaller`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`idestado`);

--
-- Indices de la tabla `liquidacion`
--
ALTER TABLE `liquidacion`
  ADD PRIMARY KEY (`idliquidacion`), ADD KEY `fk_liquidacion_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado`), ADD KEY `fk_liquidacion_estado2_idx` (`estado_idestado`), ADD KEY `fk_liquidacion_chofer2_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `mecanico`
--
ALTER TABLE `mecanico`
  ADD PRIMARY KEY (`idmecanico`), ADD KEY `fk_mecanico_persona1_idx` (`persona_idpersona`), ADD KEY `fk_mecanico_taller2_idx` (`taller_idtaller`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`idorden`), ADD KEY `fk_orden_vehiculoreparando1_idx` (`vehiculoreparando_idvehiculoreparando`), ADD KEY `fk_orden_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `orden_has_refaccion`
--
ALTER TABLE `orden_has_refaccion`
  ADD PRIMARY KEY (`idorden_has_refaccion`), ADD UNIQUE KEY `ordenrefaccion_unico1` (`orden_idorden`,`refaccion_idrefaccion`), ADD KEY `fk_ordenrefaccion_orden1_idx` (`orden_idorden`), ADD KEY `fk_ordenrefaccion_refaccion1_idx` (`refaccion_idrefaccion`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idpago`), ADD KEY `fk_liquidacion_chofer1_idx` (`chofer_idchofer`), ADD KEY `fk_liquidacion_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `pagobonificacion`
--
ALTER TABLE `pagobonificacion`
  ADD PRIMARY KEY (`idpagobonificacion`), ADD KEY `fk_pagobonificacion_bonificacion1_idx` (`bonificacion_idbonificacion`), ADD KEY `fk_pagobonificacion_pago1_idx` (`pago_idpago`);

--
-- Indices de la tabla `pagofianza`
--
ALTER TABLE `pagofianza`
  ADD PRIMARY KEY (`idpagofianza`), ADD KEY `fk_pagofianza_pago1_idx` (`pago_idpago`), ADD KEY `fk_pagofianza_chofer1_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `pagoliquidacion`
--
ALTER TABLE `pagoliquidacion`
  ADD PRIMARY KEY (`idpagoliquidacion`), ADD KEY `fk_pagoliquidacion_pago1_idx` (`pago_idpago`), ADD KEY `fk_pagoliquidacion_chofer1_idx` (`chofer_idchofer`);

--
-- Indices de la tabla `permisotaxi`
--
ALTER TABLE `permisotaxi`
  ADD PRIMARY KEY (`idpermisotaxi`), ADD KEY `fk_permisotaxi_persona1_idx` (`propietario`), ADD KEY `fk_permisotaxi_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `permisotaxiasignado`
--
ALTER TABLE `permisotaxiasignado`
  ADD PRIMARY KEY (`idpermisotaxiasignado`), ADD KEY `fk_permisotaxiasignado_chofer1_idx` (`chofer_idchofer`), ADD KEY `fk_permisotaxiasignado_vehiculo1_idx` (`vehiculo_idvehiculo`), ADD KEY `fk_permisotaxiasignado_permisotaxi1_idx` (`permisotaxi_idpermisotaxi`), ADD KEY `fk_permisotaxiasignado_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idpersona`);

--
-- Indices de la tabla `refaccion`
--
ALTER TABLE `refaccion`
  ADD PRIMARY KEY (`idrefaccion`), ADD KEY `fk_refaccion_taller1_idx` (`taller_idtaller`);

--
-- Indices de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  ADD PRIMARY KEY (`idsi_modulo`);

--
-- Indices de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  ADD PRIMARY KEY (`idsi_permiso`), ADD UNIQUE KEY `rol_modulo_unico` (`Rol_idsi_rol`,`Modulo_idsi_modulo`), ADD KEY `si_fk_Permiso_Rol1_idx` (`Rol_idsi_rol`), ADD KEY `si_fk_Permiso_Modulo1_idx` (`Modulo_idsi_modulo`);

--
-- Indices de la tabla `si_reporte`
--
ALTER TABLE `si_reporte`
  ADD PRIMARY KEY (`idsi_reporte`), ADD KEY `si_fk_Reporte_Modulo1_idx` (`Modulo_idsi_modulo`);

--
-- Indices de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  ADD PRIMARY KEY (`idsi_rol`);

--
-- Indices de la tabla `si_user`
--
ALTER TABLE `si_user`
  ADD PRIMARY KEY (`idsi_user`), ADD UNIQUE KEY `email` (`email`), ADD KEY `si_fk_User_Rol_idx` (`Rol_idsi_rol`);

--
-- Indices de la tabla `taller`
--
ALTER TABLE `taller`
  ADD PRIMARY KEY (`idtaller`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`idvehiculo`), ADD KEY `fk_vehiculo_persona_idx` (`propietario`), ADD KEY `fk_vehiculo_estado1_idx` (`estado_idestado`);

--
-- Indices de la tabla `vehiculoreparando`
--
ALTER TABLE `vehiculoreparando`
  ADD PRIMARY KEY (`idvehiculoreparando`), ADD KEY `fk_vehiculoreparando_enviotaller1_idx` (`enviotaller_idenviotaller`), ADD KEY `fk_vehiculoreparando_taller1_idx` (`taller_idtaller`), ADD KEY `fk_vehiculoreparando_mecanico1_idx` (`mecanico_idmecanico`), ADD KEY `fk_vehiculoreparando_permisotaxiasignado1_idx` (`permisotaxiasignado_idpermisotaxiasignado`), ADD KEY `fk_vehiculoreparando_estado1_idx` (`estado_idestado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bonificacion`
--
ALTER TABLE `bonificacion`
  MODIFY `idbonificacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `chofer`
--
ALTER TABLE `chofer`
  MODIFY `idchofer` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `concepto`
--
ALTER TABLE `concepto`
  MODIFY `idconcepto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `corralon`
--
ALTER TABLE `corralon`
  MODIFY `idcorralon` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `egresoconcepto`
--
ALTER TABLE `egresoconcepto`
  MODIFY `idegresoconcepto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';
--
-- AUTO_INCREMENT de la tabla `enviotaller`
--
ALTER TABLE `enviotaller`
  MODIFY `idenviotaller` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idestado` int(3) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT de la tabla `liquidacion`
--
ALTER TABLE `liquidacion`
  MODIFY `idliquidacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `mecanico`
--
ALTER TABLE `mecanico`
  MODIFY `idmecanico` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `idorden` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `orden_has_refaccion`
--
ALTER TABLE `orden_has_refaccion`
  MODIFY `idorden_has_refaccion` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `idpago` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `pagobonificacion`
--
ALTER TABLE `pagobonificacion`
  MODIFY `idpagobonificacion` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `pagofianza`
--
ALTER TABLE `pagofianza`
  MODIFY `idpagofianza` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `pagoliquidacion`
--
ALTER TABLE `pagoliquidacion`
  MODIFY `idpagoliquidacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `permisotaxi`
--
ALTER TABLE `permisotaxi`
  MODIFY `idpermisotaxi` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `permisotaxiasignado`
--
ALTER TABLE `permisotaxiasignado`
  MODIFY `idpermisotaxiasignado` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idpersona` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT de la tabla `refaccion`
--
ALTER TABLE `refaccion`
  MODIFY `idrefaccion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `si_modulo`
--
ALTER TABLE `si_modulo`
  MODIFY `idsi_modulo` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT de la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
  MODIFY `idsi_permiso` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `si_reporte`
--
ALTER TABLE `si_reporte`
  MODIFY `idsi_reporte` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `si_rol`
--
ALTER TABLE `si_rol`
  MODIFY `idsi_rol` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `si_user`
--
ALTER TABLE `si_user`
  MODIFY `idsi_user` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `taller`
--
ALTER TABLE `taller`
  MODIFY `idtaller` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `idvehiculo` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `vehiculoreparando`
--
ALTER TABLE `vehiculoreparando`
  MODIFY `idvehiculoreparando` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|',AUTO_INCREMENT=8;
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
ADD CONSTRAINT `fk_permisotaxi_persona1` FOREIGN KEY (`propietario`) REFERENCES `persona` (`idpersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `permisotaxiasignado`
--
ALTER TABLE `permisotaxiasignado`
ADD CONSTRAINT `fk_permisotaxiasignado_chofer1` FOREIGN KEY (`chofer_idchofer`) REFERENCES `chofer` (`idchofer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_permisotaxiasignado_estado1` FOREIGN KEY (`estado_idestado`) REFERENCES `estado` (`idestado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_permisotaxiasignado_permisotaxi1` FOREIGN KEY (`permisotaxi_idpermisotaxi`) REFERENCES `permisotaxi` (`idpermisotaxi`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_permisotaxiasignado_vehiculo1` FOREIGN KEY (`vehiculo_idvehiculo`) REFERENCES `vehiculo` (`idvehiculo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `refaccion`
--
ALTER TABLE `refaccion`
ADD CONSTRAINT `fk_refaccion_taller1` FOREIGN KEY (`taller_idtaller`) REFERENCES `taller` (`idtaller`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_permiso`
--
ALTER TABLE `si_permiso`
ADD CONSTRAINT `si_fk_Permiso_Modulo1` FOREIGN KEY (`Modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `si_fk_Permiso_Rol1` FOREIGN KEY (`Rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_reporte`
--
ALTER TABLE `si_reporte`
ADD CONSTRAINT `si_fk_Reporte_Modulo1` FOREIGN KEY (`Modulo_idsi_modulo`) REFERENCES `si_modulo` (`idsi_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `si_user`
--
ALTER TABLE `si_user`
ADD CONSTRAINT `si_fk_User_Rol` FOREIGN KEY (`Rol_idsi_rol`) REFERENCES `si_rol` (`idsi_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
