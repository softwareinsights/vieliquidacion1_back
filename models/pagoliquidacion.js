const connection = require('../config/db-connection');

const Pagoliquidacion = {};

Pagoliquidacion.findByIdChofer = (idChofer, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pagoliquidacion.*, _pago_idpago.folio as pago_pago_idpago , _persona.nombre as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagoliquidacion.chofer_idchofer = ? AND pagoliquidacion.created_by = ? HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT pagoliquidacion.*, _pago_idpago.folio as pago_pago_idpago , _persona.nombre as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagoliquidacion.chofer_idchofer = ? HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion encontrad@' });
    });
};
Pagoliquidacion.findByIdPago = (idPago, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pagoliquidacion.*, _pago_idpago.folio as pago_pago_idpago , _persona.nombre as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagoliquidacion.pago_idpago = ? AND pagoliquidacion.created_by = ? HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [idPago, created_by];
    } else {
        query = 'SELECT pagoliquidacion.*, _pago_idpago.folio as pago_pago_idpago , _persona.nombre as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagoliquidacion.pago_idpago = ? HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [idPago];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion encontrad@' });
    });
};
Pagoliquidacion.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pagoliquidacion.*, _pago_idpago.folio as pago_pago_idpago , _persona.nombre as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pagoliquidacion.created_by = ? HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT pagoliquidacion.*, _pago_idpago.folio as pago_pago_idpago , _persona.nombre as chofer_chofer_idchofer FROM pagoliquidacion INNER JOIN pago as _pago_idpago ON _pago_idpago.idpago = pagoliquidacion.pago_idpago INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pagoliquidacion.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING pagoliquidacion.baja IS NULL OR pagoliquidacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion leíd@' });
    });
};

Pagoliquidacion.findById = (idPagoliquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM pagoliquidacion WHERE idpagoliquidacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPagoliquidacion, created_by];
    } else {
        query = 'SELECT * FROM pagoliquidacion WHERE idpagoliquidacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idPagoliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion encontrad@' });
    });
};

Pagoliquidacion.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpagoliquidacion) AS count FROM pagoliquidacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion contabilizad@' });
    });
};

Pagoliquidacion.exist = (idPagoliquidacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM pagoliquidacion WHERE idpagoliquidacion = ?) AS exist';
    keys = [idPagoliquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion verificad@' });
    });
};

Pagoliquidacion.insert = (Pagoliquidacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO pagoliquidacion SET ?';
    keys = [Pagoliquidacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion cread@' });
    });
};

Pagoliquidacion.update = (Pagoliquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pagoliquidacion SET ? WHERE idpagoliquidacion = ? AND created_by = ?';
        keys = [Pagoliquidacion, Pagoliquidacion.idpagoliquidacion, created_by];
    } else {
        query = 'UPDATE pagoliquidacion SET ? WHERE idpagoliquidacion = ?';
        keys = [Pagoliquidacion, Pagoliquidacion.idpagoliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion actualizad@' });
    });
};

Pagoliquidacion.remove = (idpagoliquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM pagoliquidacion WHERE idpagoliquidacion = ? AND created_by = ?';
        keys = [idpagoliquidacion, created_by];
    } else {
        query = 'DELETE FROM pagoliquidacion WHERE idpagoliquidacion = ?';
        keys = [idpagoliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion eliminad@' });
    });
};

Pagoliquidacion.logicRemove = (idpagoliquidacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pagoliquidacion SET baja = 1 WHERE idpagoliquidacion = ? AND created_by = ?';
        keys = [idpagoliquidacion, created_by];
    } else {
        query = 'UPDATE pagoliquidacion SET baja = 1 WHERE idpagoliquidacion = ?';
        keys = [idpagoliquidacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pagoliquidacion eliminad@' });
    });
};

Pagoliquidacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Pagoliquidacion;
