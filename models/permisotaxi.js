const connection = require('../config/db-connection');

const Permisotaxi = {};

Permisotaxi.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxi.*, _estado_idestado.nombre as estado_estado_idestado , _propietario.nombre as persona_propietario FROM permisotaxi INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxi.estado_idestado INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario   WHERE created_by = ? HAVING permisotaxi.baja IS NULL OR permisotaxi.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT permisotaxi.*, _estado_idestado.nombre as estado_estado_idestado , _propietario.nombre as persona_propietario FROM permisotaxi INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxi.estado_idestado INNER JOIN persona as _propietario ON _propietario.idpersona = permisotaxi.propietario   HAVING permisotaxi.baja IS NULL OR permisotaxi.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxi leíd@' });
    });
};

Permisotaxi.findLiquidacionByIdInThisDay = (idPermisotaxi, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    // SACAR NÚMERO DE DÍA
    connection.query('SELECT WEEKDAY(NOW())', [], (error, resultDay) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else {

            let diaBonificar = resultDay[0].dia;
            // SACAR SI LA FECHA ES UN DÍA DOMINGO Y SI ESTA ENVIADO DE TALLER PARA APLICAR LA BONIFICACION
            let query = '';
            if (diaBonificar === 6) {
                query = 'SELECT pt.liquidezDom as liquidez FROM permisotaxi as pt WHERE pt.idpermisotaxi = ?';
            } else {
                query = 'SELECT pt.liquidez as liquidez FROM permisotaxi as pt WHERE pt.idpermisotaxi = ?';
            }
            keys = [idPermisotaxi];
            connection.query(query, keys, (error, result) => {
                if(error) 
                    return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
                else if (result.affectedRows === 0)
                    return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
                else
                    return next(null, { success: true, result: result, message: 'Permisotaxi encontrad@' });
            });
        }
    });

};

Permisotaxi.findById = (idPermisotaxi, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM permisotaxi WHERE idpermisotaxi = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxi, created_by];
    } else {
        query = 'SELECT * FROM permisotaxi WHERE idpermisotaxi = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxi encontrad@' });
    });
};

Permisotaxi.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpermisotaxi) AS count FROM permisotaxi';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxi contabilizad@' });
    });
};

Permisotaxi.exist = (idPermisotaxi, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM permisotaxi WHERE idpermisotaxi = ?) AS exist';
    keys = [idPermisotaxi];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxi verificad@' });
    });
};

Permisotaxi.insert = (Permisotaxi, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO permisotaxi SET ?';
    keys = [Permisotaxi];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxi cread@' });
    });
};

Permisotaxi.update = (Permisotaxi, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxi SET ? WHERE idpermisotaxi = ? AND created_by = ?';
        keys = [Permisotaxi, Permisotaxi.idpermisotaxi, created_by];
    } else {
        query = 'UPDATE permisotaxi SET ? WHERE idpermisotaxi = ?';
        keys = [Permisotaxi, Permisotaxi.idpermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxi actualizad@' });
    });
};

Permisotaxi.remove = (idpermisotaxi, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM permisotaxi WHERE idpermisotaxi = ? AND created_by = ?';
        keys = [idpermisotaxi, created_by];
    } else {
        query = 'DELETE FROM permisotaxi WHERE idpermisotaxi = ?';
        keys = [idpermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxi eliminad@' });
    });
};

Permisotaxi.logicRemove = (idpermisotaxi, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxi SET baja = 1 WHERE idpermisotaxi = ? AND created_by = ?';
        keys = [idpermisotaxi, created_by];
    } else {
        query = 'UPDATE permisotaxi SET baja = 1 WHERE idpermisotaxi = ?';
        keys = [idpermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxi eliminad@' });
    });
};

Permisotaxi.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Permisotaxi;
