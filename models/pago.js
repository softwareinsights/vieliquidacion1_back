const connection = require('../config/db-connection');

const Pago = {};

Pago.findByIdChofer = (idChofer, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.chofer_idchofer = ? AND pago.created_by = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.chofer_idchofer = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago encontrad@' });
    });
};
Pago.findByIdEstado = (idEstado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.estado_idestado = ? AND pago.created_by = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.estado_idestado = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago encontrad@' });
    });
};
Pago.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE pago.created_by = ? HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT pago.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer FROM pago INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = pago.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = pago.chofer_idchofer INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING pago.baja IS NULL OR pago.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago leíd@' });
    });
};

Pago.findById = (idPago, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM pago WHERE idpago = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPago, created_by];
    } else {
        query = 'SELECT * FROM pago WHERE idpago = ? HAVING baja IS NULL OR baja = false';
        keys = [idPago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago encontrad@' });
    });
};

Pago.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpago) AS count FROM pago';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pago contabilizad@' });
    });
};

Pago.exist = (idPago, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM pago WHERE idpago = ?) AS exist';
    keys = [idPago];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Pago verificad@' });
    });
};

Pago.insert = (Pago, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO pago SET ?';
    keys = [Pago];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Pago cread@' });
    });
};

Pago.update = (Pago, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pago SET ? WHERE idpago = ? AND created_by = ?';
        keys = [Pago, Pago.idpago, created_by];
    } else {
        query = 'UPDATE pago SET ? WHERE idpago = ?';
        keys = [Pago, Pago.idpago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago actualizad@' });
    });
};

Pago.remove = (idpago, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM pago WHERE idpago = ? AND created_by = ?';
        keys = [idpago, created_by];
    } else {
        query = 'DELETE FROM pago WHERE idpago = ?';
        keys = [idpago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago eliminad@' });
    });
};

Pago.logicRemove = (idpago, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE pago SET baja = 1 WHERE idpago = ? AND created_by = ?';
        keys = [idpago, created_by];
    } else {
        query = 'UPDATE pago SET baja = 1 WHERE idpago = ?';
        keys = [idpago];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Pago eliminad@' });
    });
};

Pago.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Pago;
