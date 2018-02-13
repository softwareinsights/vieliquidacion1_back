const connection = require('../config/db-connection');

const Vehiculoreparando = {};

Vehiculoreparando.goOutVehicle = (Vehiculoreparando, next) => {
    if( !connection )
        return next('Connection refused');

    let date = new Date();
    let now = date.getFullYear() + "-" + (date.getMonth() +1) + "-" + date.getDate()
    let hour = date.getHours() + ":" + date.getMinutes();

    // MODIFICAR VEHICULOREPARANDO PARA ASIGNAR FECHA Y HORA DE SALIDA
    let query = 'UPDATE vehiculoreparando SET fechaSalida = ?, horaSalida = ?, estado_idestado = 16 WHERE idvehiculoreparando = ?';
    let keys = [now, hour, Vehiculoreparando.idvehiculoreparando];

    connection.query(query, keys, (error, resultVehRep) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaban registros' });
        else if (resultVehRep.affectedRows === 0)
            return next(null, { success: false, result: resultVehRep, message: 'Solo es posible actualizar registros propios' });
        else {

            // PRIMERO SACAR EL LA RESTA DE HORA_SALIDA MENOS LA HORA_ENTRADA
            let query = 'SELECT TIMEDIFF(horaSalida, horaIngresa) as horas, WEEKDAY(fechaSalida) as dia FROM vehiculoreparando WHERE idvehiculoreparando = ?';
            let keys = [Vehiculoreparando.idvehiculoreparando];

            connection.query(query, keys, (error, resultVR) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leer registros' });
                else if (resultVR.affectedRows === 0)
                    return next(null, { success: false, result: resultVR, message: 'Solo es posible leer registros propios' });
                else {

                    let horasBonificadas = resultVR[0].horas;
                    let hrsSplit = horasBonificadas.split(":");
                    horasBonificadas = +hrsSplit[0] + (+hrsSplit[1] / 60);;

                    let diaBonificar = resultVR[0].dia;

                    // SACAR SI LA FECHA ES UN DÍA LUNES Y SI ESTA ENVIADO DE TALLER PARA APLICAR LA BONIFICACION
                    if (Vehiculoreparando.enviotaller_idenviotaller) {

                        let query = '';
                        if (diaBonificar === 6) {
                            query = 'SELECT pt.liquidezDom as liquidez, pta.chofer_idchofer as idchofer, pta.vehiculo_idvehiculo as idvehiculo FROM vehiculoreparando as vr INNER JOIN enviotaller as et ON vr.enviotaller_idenviotaller = et.idenviotaller INNER JOIN permisotaxiasignado as pta ON pta.idpermisotaxiasignado = et.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE vr.idvehiculoreparando = ?';
                        } else {
                            query = 'SELECT pt.liquidez as liquidez, pta.chofer_idchofer as idchofer, pta.vehiculo_idvehiculo as idvehiculo FROM vehiculoreparando as vr INNER JOIN enviotaller as et ON vr.enviotaller_idenviotaller = et.idenviotaller INNER JOIN permisotaxiasignado as pta ON pta.idpermisotaxiasignado = et.permisotaxiasignado_idpermisotaxiasignado INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE vr.idvehiculoreparando = ?';
                        }

                        // SACAR LIQUIDEZ CORRESPONDIENTE DE TABLA PERMISOTAXI SEGÚN permisotaxiasignado
                        let keys = [Vehiculoreparando.idvehiculoreparando];

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
                           
                                // CREAR BONIFICACION A CHOFER CON LA FECHA DE SALIDA
                                let query = "INSERT INTO bonificacion SET cantidad = ?, validado = '0', fecha = ?, estado_idestado = 6, concepto = 'BONIFICACIÓN POR TIEMPO EN TALLER', chofer_idchofer = ?";
                                let keys = [montoBonificar, now, idchofer];

                                connection.query(query, keys, (error, resultBoni) => {
                                    if(error) 
                                        return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leer registros' });
                                    else if (resultBoni.affectedRows === 0)
                                        return next(null, { success: false, result: resultBoni, message: 'Solo es posible leer registros propios' });
                                    else {
                                        return next(null, { success: true, result: {'montoBonificar': montoBonificar, 'idchofer': idchofer, idvehiculo: idvehiculo} , message: 'Vehiculoreparando ha salido del taller correctamente, se ha creado una bonificación de: $' + montoBonificar +' para el día: ' + now });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    });
};

Vehiculoreparando.findByIdEnviotaller = (idEnviotaller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.enviotaller_idenviotaller = ? AND vehiculoreparando.created_by = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idEnviotaller, created_by];
    } else {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.enviotaller_idenviotaller = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idEnviotaller];
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
Vehiculoreparando.findByIdEstado = (idEstado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.estado_idestado = ? AND vehiculoreparando.created_by = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.estado_idestado = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idEstado];
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
Vehiculoreparando.findByIdMecanico = (idMecanico, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.mecanico_idmecanico = ? AND vehiculoreparando.created_by = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idMecanico, created_by];
    } else {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.mecanico_idmecanico = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idMecanico];
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
Vehiculoreparando.findByIdPermisotaxiasignado = (idPermisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado = ? AND vehiculoreparando.created_by = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idPermisotaxiasignado, created_by];
    } else {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idPermisotaxiasignado];
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
Vehiculoreparando.findByIdTaller = (idTaller, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.taller_idtaller = ? AND vehiculoreparando.created_by = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idTaller, created_by];
    } else {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.taller_idtaller = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
        keys = [idTaller];
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
Vehiculoreparando.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT vehiculoreparando.*, _estado_idestado.nombre as estado_estado_idestado , _enviotaller_idenviotaller.motivo as enviotaller_enviotaller_idenviotaller , _taller_idtaller.nombre as taller_taller_idtaller , _persona.nombre as mecanico_mecanico_idmecanico , _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado FROM vehiculoreparando INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = vehiculoreparando.estado_idestado INNER JOIN enviotaller as _enviotaller_idenviotaller ON _enviotaller_idenviotaller.idenviotaller = vehiculoreparando.enviotaller_idenviotaller INNER JOIN taller as _taller_idtaller ON _taller_idtaller.idtaller = vehiculoreparando.taller_idtaller INNER JOIN mecanico as _mecanico_idmecanico ON _mecanico_idmecanico.idmecanico = vehiculoreparando.mecanico_idmecanico INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = vehiculoreparando.permisotaxiasignado_idpermisotaxiasignado INNER JOIN persona as _persona ON _persona.idpersona = _mecanico_idmecanico.persona_idpersona INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi  WHERE vehiculoreparando.created_by = ? HAVING vehiculoreparando.baja IS NULL OR vehiculoreparando.baja = false';
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
    query = 'INSERT INTO vehiculoreparando SET ?';
    keys = [Vehiculoreparando];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Vehiculoreparando cread@' });
    });
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
