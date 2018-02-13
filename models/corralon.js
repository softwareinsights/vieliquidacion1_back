const connection = require('../config/db-connection');

const Corralon = {};

Corralon.goOutCorralon = (Corralon, next) => {
    if( !connection )
        return next('Connection refused');

    let date = new Date();
    let now = date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate()
    let hour = date.getHours() + ":" + date.getMinutes();

    // MODIFICA ESTADO DE REGISTRO EN CORRALÓN Y FECHA Y HORA SALIDA AL MOMENTO
    let query = 'UPDATE corralon SET fechaSalida = ?, horaSalida = ?, estado_idestado = 1 WHERE idcorralon = ?'; // ESTADO FUERA
    let keys = [now, hour, Corralon.idcorralon];

    connection.query(query, keys, (error, resultCorr) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaban registros' });
        else if (resultCorr.affectedRows === 0)
            return next(null, { success: false, result: resultCorr, message: 'Solo es posible actualizar registros propios' });
        else {

            // PRIMERO SACAR EL LA RESTA DE HORA_SALIDA MENOS LA HORA_ENTRADA
            let query = 'SELECT TIMEDIFF(horaSalida, hora) as horas, WEEKDAY(fechaSalida) as dia FROM corralon WHERE idcorralon = ?';
            let keys = [Corralon.idcorralon];

            connection.query(query, keys, (error, resultC) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leer registros' });
                else if (resultC.affectedRows === 0)
                    return next(null, { success: false, result: resultC, message: 'Solo es posible leer registros propios' });
                else {

                    let horasBonificadas = resultC[0].horas;
                    let hrsSplit = horasBonificadas.split(":");
                    horasBonificadas = +hrsSplit[0] + (+hrsSplit[1] / 60);;

                    let diaBonificar = resultC[0].dia;

                    // SACAR SI LA FECHA ES UN DÍA LUNES Y SI ESTA ENVIADO DE TALLER PARA APLICAR LA BONIFICACION
                    let query = '';
                    if (diaBonificar === 6) {
                        query = 'SELECT pt.liquidezDom as liquidez, pta.chofer_idchofer as idchofer, pta.vehiculo_idvehiculo as idvehiculo FROM corralon as corr INNER JOIN permisotaxiasignado as pta ON pta.idpermisotaxiasignado = corr.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE corr.idcorralon = ?';
                    } else {
                        query = 'SELECT pt.liquidez as liquidez, pta.chofer_idchofer as idchofer, pta.vehiculo_idvehiculo as idvehiculo FROM corralon as corr INNER JOIN permisotaxiasignado as pta ON pta.idpermisotaxiasignado = corr.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE corr.idcorralon = ?';
                    }

                    // SACAR LIQUIDEZ CORRESPONDIENTE DE TABLA PERMISOTAXI SEGÚN permisotaxiasignado
                    let keys = [Corralon.idcorralon];

                    connection.query(query, keys, (error, resultPermAsig) => {
                        if(error) 
                            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leer registros' });
                        else if (resultPermAsig.affectedRows === 0)
                            return next(null, { success: false, result: resultPermAsig, message: 'Solo es posible leer registros propios' });
                        else {
                            let liquidez = resultPermAsig[0].liquidez;

                            // SACAR FÓRMULA LIQUIDEZ / 24 * HORAS
                            let montoBonificar = ((liquidez / 24) * horasBonificadas);
                            let idchofer = resultPermAsig[0].idchofer;
                            let idvehiculo = resultPermAsig[0].idvehiculo;
                        
                            // CREAR BONIFICACIÓN A CHOFER CON LA FECHA DE SALIDA Y ESTADO NOAPLICADA
                            let query = "INSERT INTO bonificacion SET cantidad = ?, validado = '0', fecha = ?, estado_idestado = 6, concepto = 'BONIFICACIÓN POR TIEMPO EN CORRALÓN', chofer_idchofer = ?";
                            let keys = [montoBonificar, now, idchofer];

                            connection.query(query, keys, (error, resultBoni) => {
                                if(error) 
                                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leer registros' });
                                else if (resultBoni.affectedRows === 0)
                                    return next(null, { success: false, result: resultBoni, message: 'Solo es posible leer registros propios' });
                                else {
                                    return next(null, { success: true, result: {'montoBonificar': montoBonificar, 'idchofer': idchofer, idvehiculo: idvehiculo} , message: 'Vehículo ha salido del corralón correctamente, se ha creado una bonificación de: $' + montoBonificar +' para el día: ' + now });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

Corralon.findByIdEstado = (idEstado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT corralon.*, _estado_idestado.nombre as estado_estado_idestado , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM corralon INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = corralon.estado_idestado INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = corralon.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE corralon.estado_idestado = ? AND corralon.created_by = ? HAVING corralon.baja IS NULL OR corralon.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT corralon.*, _estado_idestado.nombre as estado_estado_idestado , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM corralon INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = corralon.estado_idestado INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = corralon.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE corralon.estado_idestado = ? HAVING corralon.baja IS NULL OR corralon.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon encontrad@' });
    });
};
Corralon.findByIdPermisotaxiasignado = (idPermisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT corralon.*, _estado_idestado.nombre as estado_estado_idestado , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM corralon INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = corralon.estado_idestado INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = corralon.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE corralon.permisotaxiasignado_idpermisotaxiasignado = ? AND corralon.created_by = ? HAVING corralon.baja IS NULL OR corralon.baja = false';
        keys = [idPermisotaxiasignado, created_by];
    } else {
        query = 'SELECT corralon.*, _estado_idestado.nombre as estado_estado_idestado , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM corralon INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = corralon.estado_idestado INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = corralon.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE corralon.permisotaxiasignado_idpermisotaxiasignado = ? HAVING corralon.baja IS NULL OR corralon.baja = false';
        keys = [idPermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon encontrad@' });
    });
};
Corralon.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT corralon.*, _estado_idestado.nombre as estado_estado_idestado , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM corralon INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = corralon.estado_idestado INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = corralon.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE corralon.created_by = ? HAVING corralon.baja IS NULL OR corralon.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT corralon.*, _estado_idestado.nombre as estado_estado_idestado , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM corralon INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = corralon.estado_idestado INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = corralon.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  HAVING corralon.baja IS NULL OR corralon.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon leíd@' });
    });
};

Corralon.findById = (idCorralon, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM corralon WHERE idcorralon = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idCorralon, created_by];
    } else {
        query = 'SELECT * FROM corralon WHERE idcorralon = ? HAVING baja IS NULL OR baja = false';
        keys = [idCorralon];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon encontrad@' });
    });
};

Corralon.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idcorralon) AS count FROM corralon';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Corralon contabilizad@' });
    });
};

Corralon.exist = (idCorralon, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM corralon WHERE idcorralon = ?) AS exist';
    keys = [idCorralon];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Corralon verificad@' });
    });
};

Corralon.insert = (Corralon, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO corralon SET ?';
    keys = [Corralon];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Corralon cread@' });
    });
};

Corralon.update = (Corralon, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE corralon SET ? WHERE idcorralon = ? AND created_by = ?';
        keys = [Corralon, Corralon.idcorralon, created_by];
    } else {
        query = 'UPDATE corralon SET ? WHERE idcorralon = ?';
        keys = [Corralon, Corralon.idcorralon];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon actualizad@' });
    });
};

Corralon.remove = (idcorralon, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM corralon WHERE idcorralon = ? AND created_by = ?';
        keys = [idcorralon, created_by];
    } else {
        query = 'DELETE FROM corralon WHERE idcorralon = ?';
        keys = [idcorralon];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon eliminad@' });
    });
};

Corralon.logicRemove = (idcorralon, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE corralon SET baja = 1 WHERE idcorralon = ? AND created_by = ?';
        keys = [idcorralon, created_by];
    } else {
        query = 'UPDATE corralon SET baja = 1 WHERE idcorralon = ?';
        keys = [idcorralon];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Corralon eliminad@' });
    });
};

Corralon.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Corralon;
