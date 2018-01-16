const connection = require('../config/db-connection');

const Pagobonificacion = {};

Pagobonificacion.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pagobonificacion.*, _bonificacion_idbonificacion.concepto as bonificacion_bonificacion_idbonificacion , _pago_idpago.folio as pago_pago_idpago FROM pagobonificacion INNER JOIN bonificacion as _bonificacion_idbonificacion ON _bonificacion_idbonificacion.idbonificacion = pagobonificacion.bonificacion_idbonificacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagobonificacion.pago_idpago   WHERE created_by = ? HAVING pagobonificacion.baja IS NULL OR pagobonificacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT pagobonificacion.*, _bonificacion_idbonificacion.concepto as bonificacion_bonificacion_idbonificacion , _pago_idpago.folio as pago_pago_idpago FROM pagobonificacion INNER JOIN bonificacion as _bonificacion_idbonificacion ON _bonificacion_idbonificacion.idbonificacion = pagobonificacion.bonificacion_idbonificacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagobonificacion.pago_idpago   HAVING pagobonificacion.baja IS NULL OR pagobonificacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagobonificacion leíd@' });
    });
};

Pagobonificacion.findById = (idPagobonificacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM pagobonificacion WHERE idpagobonificacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPagobonificacion, created_by];
    } else {
        query = 'SELECT * FROM pagobonificacion WHERE idpagobonificacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idPagobonificacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagobonificacion encontrad@' });
    });
};

Pagobonificacion.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpagobonificacion) AS count FROM pagobonificacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pagobonificacion contabilizad@' });
    });
};

Pagobonificacion.exist = (idPagobonificacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM pagobonificacion WHERE idpagobonificacion = ?) AS exist';
    keys = [idPagobonificacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pagobonificacion verificad@' });
    });
};

Pagobonificacion.insert = (Pagobonificacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO pagobonificacion SET ?';
    keys = [Pagobonificacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Pagobonificacion cread@' });
    });
};

Pagobonificacion.update = (Pagobonificacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pagobonificacion SET ? WHERE idpagobonificacion = ? AND created_by = ?';
        keys = [Pagobonificacion, Pagobonificacion.idpagobonificacion, created_by];
    } else {
        query = 'UPDATE pagobonificacion SET ? WHERE idpagobonificacion = ?';
        keys = [Pagobonificacion, Pagobonificacion.idpagobonificacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagobonificacion actualizad@' });
    });
};

Pagobonificacion.remove = (idpagobonificacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM pagobonificacion WHERE idpagobonificacion = ? AND created_by = ?';
        keys = [idpagobonificacion, created_by];
    } else {
        query = 'DELETE FROM pagobonificacion WHERE idpagobonificacion = ?';
        keys = [idpagobonificacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagobonificacion eliminad@' });
    });
};

Pagobonificacion.logicRemove = (idpagobonificacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pagobonificacion SET baja = 1 WHERE idpagobonificacion = ? AND created_by = ?';
        keys = [idpagobonificacion, created_by];
    } else {
        query = 'UPDATE pagobonificacion SET baja = 1 WHERE idpagobonificacion = ?';
        keys = [idpagobonificacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagobonificacion eliminad@' });
    });
};

Pagobonificacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Pagobonificacion;
