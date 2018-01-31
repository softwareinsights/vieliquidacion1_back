const connection = require('../config/db-connection');

const Liquidacion = {};


/*
Combo.update = (combo, platillos, next) => {
    if ( !connection )
        return next('Connection refused');

    async.waterfall([
        next => {
            connection.query(`SELECT * FROM combo WHERE idcombo = ? HAVING baja IS NULL OR baja = false`,
            [comboId], (error, result) => {
                error ? next(error) : next(null, result)
            })
        },
        (result, next) => {
            
            connection.query(`
            SELECT platillo.idplatillo, platillo.nombre, platillo.descripcion, comboRP.cantidad 
            FROM combo_has_restaurante_has_platillo AS comboRP
            INNER JOIN platillo ON platillo.idplatillo = res_has_pla_platillo_idplatillo
            WHERE combo_idcombo = ?`, [result[0].idcombo], (error, resultJoin) => {
                if ( error )
                    next(error)
                else {
                    result[0].platillos = resultJoin;
                    next(null, result[0]);
                }
            })
        }
    ],
    (error, result) => {
        if ( error )
            return next({ success: false, error: error });
        else
            return next( null, { success: true, result: result});
    })

};
*/


Liquidacion.reporte = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];

    let now = '';
    let weekday = '';
    let weelastdaykday = '';
    let arr_dias = [];
    let arr_choferes = [];
    let arr_dias_choferes = new Array();

   ////// SACAR QUE NÚMERO DÍA ES HOY Y LA FECHA
    query = 'SELECT WEEKDAY(NOW()) as weekday, CURDATE() as now, LAST_DAY(NOW()) as lastday, YEAR(NOW()) as year, MONTH(NOW()) as month';
    keys = [];

    connection.query(query, keys, (error, fecha) => {
        if(error) 
            console.log("ERROR Un error ha ocurrido mientras se leía el día de la semana y la fecha");
        else {
            now = fecha[0].now;
            weekday = fecha[0].weekday;
            lastday = fecha[0].lastday;
            lastday = lastday.split('-');
            lastday = lastday[2];
            year = fecha[0].year;
            month = fecha[0].month;

            // SACAR ARREGLO DESDE DIA 1 AL ULTIMO DÍA
            for(let day = 1; day<=lastday; day++) {
                let date = year + '-' + ((month < 10) ? "0" : "") + month + '-' + ((day < 10) ? "0" : "") + day;
                arr_dias.push(date);
            }

            // CREAR ARREGLO DE CHOFERES POR PERMISOS TAXI ASIGNADOS
            query = 'SELECT p.nombre as chofer, pt.numero as permiso, pta.idpermisotaxiasignado, pta.baja FROM permisotaxiasignado as pta INNER JOIN chofer as c ON c.idchofer = pta.chofer_idchofer INNER JOIN persona as p ON p.idpersona = c.chofer INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE pta.estado_idestado = 12 HAVING pta.baja IS NULL OR pta.baja = false';
            keys = [];

            connection.query(query, keys, (error, choferes) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el permisotaxiasignado' });
                else  {

                    console.log("choferes", choferes);

                    choferes.forEach(permisotaxiasignado => {

                        // arr_dias_choferes[permisotaxiasignado.idpermisotaxiasignado] = new Array();
                        arr_dias.forEach(date => {

                            let i = 0;

                            
                            arr_dias_choferes[date][i] = new Array(permisotaxiasignado.idpermisotaxiasignado);


                            // LEER LIQUIDACIONES POR FECHA Y permisotaxiasignado
                            query = 'SELECT * FROM liquidacion AS l WHERE l.fecha = ? AND l.permisotaxiasignado_idpermisotaxiasignado = ? HAVING l.baja IS NULL OR l.baja = false';
                            keys = [date, permisotaxiasignado.idpermisotaxiasignado];
                            
                            console.log("query", query);
                            console.log("date", date);
                            console.log("permisotaxiasignado.idpermisotaxiasignado", permisotaxiasignado.idpermisotaxiasignado);

                            connection.query(query, keys, (error, liquidacion) => {
                                if(error) 
                                    console.log("Un error ha ocurrido mientras se encontraba la liquidación");
                                else  {
                                    

                                    if (liquidacion.length) {

                                        if (liquidacion[0].estado_idestado !== null) {

                                            console.log("liquidacion[0]", liquidacion[0]);

                                            arr_dias_choferes[date][i] = new Array(permisotaxiasignado.idpermisotaxiasignado, liquidacion[0].estado_idestado);
                                            
                                            console.log("arr_dias_choferes", arr_dias_choferes);

                            
                                            i++;

                                        }

                                    }
                                }
                            });

                        });
                    });

                    console.log("arr_dias_choferes___", arr_dias_choferes);
                            
                    return next(null, { success: true, result: arr_dias_choferes, message: 'Reporte listo' });
                }    
            });
        }
    });

};


Liquidacion.adeudandoFromIdchofer = (idChofer, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion.*, _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado WHERE liquidacion.estado_idestado = 9 AND liquidacion.chofer_idchofer = ? AND liquidacion.created_by = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT liquidacion.*, _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado WHERE liquidacion.estado_idestado = 9 AND liquidacion.chofer_idchofer = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion encontrad@' });
    });
};

Liquidacion.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT liquidacion.*, _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado , _persona.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE created_by = ? HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT liquidacion.*, _permisotaxi.numero as permisotaxiasignado_permisotaxiasignado_idpermisotaxiasignado , _persona.nombre as chofer_chofer_idchofer , _estado_idestado.nombre as estado_estado_idestado FROM liquidacion INNER JOIN permisotaxiasignado as _permisotaxiasignado_idpermisotaxiasignado ON _permisotaxiasignado_idpermisotaxiasignado.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = liquidacion.chofer_idchofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = liquidacion.estado_idestado INNER JOIN permisotaxi as _permisotaxi ON _permisotaxi.idpermisotaxi = _permisotaxiasignado_idpermisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING liquidacion.baja IS NULL OR liquidacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion leíd@' });
    });
};

Liquidacion.findById = (idLiquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM liquidacion WHERE idliquidacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idLiquidacion, created_by];
    } else {
        query = 'SELECT * FROM liquidacion WHERE idliquidacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idLiquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion encontrad@' });
    });
};

Liquidacion.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idliquidacion) AS count FROM liquidacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion contabilizad@' });
    });
};

Liquidacion.exist = (idLiquidacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM liquidacion WHERE idliquidacion = ?) AS exist';
    keys = [idLiquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion verificad@' });
    });
};

Liquidacion.insert = (Liquidacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO liquidacion SET ?';
    keys = [Liquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion cread@' });
    });
};

Liquidacion.update = (Liquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE liquidacion SET ? WHERE idliquidacion = ? AND created_by = ?';
        keys = [Liquidacion, Liquidacion.idliquidacion, created_by];
    } else {
        query = 'UPDATE liquidacion SET ? WHERE idliquidacion = ?';
        keys = [Liquidacion, Liquidacion.idliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion actualizad@' });
    });
};

Liquidacion.remove = (idliquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM liquidacion WHERE idliquidacion = ? AND created_by = ?';
        keys = [idliquidacion, created_by];
    } else {
        query = 'DELETE FROM liquidacion WHERE idliquidacion = ?';
        keys = [idliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion eliminad@' });
    });
};

Liquidacion.logicRemove = (idliquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE liquidacion SET baja = 1 WHERE idliquidacion = ? AND created_by = ?';
        keys = [idliquidacion, created_by];
    } else {
        query = 'UPDATE liquidacion SET baja = 1 WHERE idliquidacion = ?';
        keys = [idliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Liquidacion eliminad@' });
    });
};

Liquidacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Liquidacion;
