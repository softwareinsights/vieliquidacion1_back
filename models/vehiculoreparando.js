const connection = require('../config/db-connection');

const Vehiculoreparando = {};




Vehiculoreparando.goOutVehicle = (Vehiculoreparando, next) => {
    if( !connection )
        return next('Connection refused');

    // MODIFICAR VEHICULOREPARANDO PARA ASIGNAR FECHA Y HORA DE SALIDA (QUITAR ESTOS CAMPOS DE ADD Y EDIT MODAL) 
    // PRIMERO SACAR EL LA RESTA DE HORA_SALIDA MENOS LA HORA_ENTRADA DE TABLA VEHICULOREPARANDO
    // SACAR SI LA FECHA ES UN DÍA LUNES
    // SACAR LIQUIDEZ CORRESPONDIENTE DE TABLA PERMISOTAXI SEGÚN permisotaxiasignado
    // SACAR FÓRMULA FIANZA / 24 * HORAS
    // CREAR BONIFICACION A CHOFER CON LA FECHA DE SALIDA
    // MODIFICAR ESTATUS EN VEHICULOREPARANDO A REPARACIONFINALIZADA
    // MODIFICAR ESTATUS A CHOFER A ACTIVO




    let date = new Date();
    let now = date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate()
    let hour = date.getHours() + ":" + date.getMinutes();

    let query = 'UPDATE vehiculoreparando SET fechaSalida = ?, horaSalida = ?, estado_idestado = 16 WHERE idvehiculoreparando = ?';
    let keys = [now, hour, Vehiculoreparando.idvehiculoreparando];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaban registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else {

            
            // PRIMERO SACAR EL LA RESTA DE HORA_SALIDA MENOS LA HORA_ENTRADA
            let query = 'SELECT TIMEDIFF(horaSalida, horaIngresa) as horas FROM vehiculoreparando WHERE fechaSalida = fechaIngresa AND idvehiculoreparando = ?';
            let keys = [Vehiculoreparando.idvehiculoreparando];

            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leer registros' });
                else if (result.affectedRows === 0)
                    return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
                else {
                    return next(null, { success: true, result: result, message: 'Vehiculoreparando horas comparadas' });




                }
            });




        }
    });

};



Vehiculoreparando.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE created_by = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoreparando leíd@' });
    });
};

Vehiculoreparando.findById = (idVehiculoreparando, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM vehiculoreparando WHERE idvehiculoreparando = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculoreparando, created_by];
    } else {
        query = 'SELECT * FROM vehiculoreparando WHERE idvehiculoreparando = ? HAVING baja IS NULL OR baja = false';
        keys = [idVehiculoreparando];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoreparando encontrad@' });
    });
};

Vehiculoreparando.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idvehiculoreparando) AS count FROM vehiculoreparando';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoreparando contabilizad@' });
    });
};

Vehiculoreparando.exist = (idVehiculoreparando, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM vehiculoreparando WHERE idvehiculoreparando = ?) AS exist';
    keys = [idVehiculoreparando];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoreparando verificad@' });
    });
};

Vehiculoreparando.insert = (Vehiculoreparando, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    // Si viene de enviotaller sacar hora y fecha de envío
    if (Vehiculoreparando.enviotaller_idenviotaller) {

        query = 'SELECT fecha, hora FROM enviotaller WHERE idenviotaller = ?';
        keys = [Vehiculoreparando.enviotaller_idenviotaller];

        connection.query(query, keys, (error, result) => {
            if(error) 
                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leia el registro Envio Taller' });
            else {
                // Insertar a vehiculoreparando con las fechas de enviotaller
                Vehiculoreparando.fechaIngresa = result[0].fecha;
                Vehiculoreparando.horaIngresa = result[0].hora;
                Vehiculoreparando.estado_idestado = 11; // REPARANDO
                
                query = 'INSERT INTO vehiculoreparando SET ?';
                keys = [Vehiculoreparando];

                connection.query(query, keys, (error, result) => {
                    if(error) 
                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
                    else
                        return next(null, { success: true, result: result, message: 'Vehiculoreparando cread@ con fecha de envío a taller' });
                });
            }
        });

    } else {

        // Puede ser un vehiculo externo sin permiso y sin enviotaller
       Vehiculoreparando.estado_idestado = 11; // REPARANDO

        query = 'INSERT INTO vehiculoreparando SET ?';
        keys = [Vehiculoreparando];

        connection.query(query, keys, (error, result) => {
            if(error) 
                return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
            else
                return next(null, { success: true, result: result, message: 'Vehiculoreparando cread@' });
        });

    }

    
};

Vehiculoreparando.update = (Vehiculoreparando, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculoreparando SET ? WHERE idvehiculoreparando = ? AND created_by = ?';
        keys = [Vehiculoreparando, Vehiculoreparando.idvehiculoreparando, created_by];
    } else {
        query = 'UPDATE vehiculoreparando SET ? WHERE idvehiculoreparando = ?';
        keys = [Vehiculoreparando, Vehiculoreparando.idvehiculoreparando];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoreparando actualizad@' });
    });
};

Vehiculoreparando.remove = (idvehiculoreparando, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM vehiculoreparando WHERE idvehiculoreparando = ? AND created_by = ?';
        keys = [idvehiculoreparando, created_by];
    } else {
        query = 'DELETE FROM vehiculoreparando WHERE idvehiculoreparando = ?';
        keys = [idvehiculoreparando];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoreparando eliminad@' });
    });
};

Vehiculoreparando.logicRemove = (idvehiculoreparando, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE vehiculoreparando SET baja = 1 WHERE idvehiculoreparando = ? AND created_by = ?';
        keys = [idvehiculoreparando, created_by];
    } else {
        query = 'UPDATE vehiculoreparando SET baja = 1 WHERE idvehiculoreparando = ?';
        keys = [idvehiculoreparando];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoreparando eliminad@' });
    });
};

Vehiculoreparando.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Vehiculoreparando;
