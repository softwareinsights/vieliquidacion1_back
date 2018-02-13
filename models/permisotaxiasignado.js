const connection = require('../config/db-connection');

const Permisotaxiasignado = {};

Permisotaxiasignado.findByIdChofer = (idChofer, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.chofer_idchofer = ? AND permisotaxiasignado.created_by = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.chofer_idchofer = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado encontrad@' });
    });
};
Permisotaxiasignado.findByIdEstado = (idEstado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.estado_idestado = ? AND permisotaxiasignado.created_by = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.estado_idestado = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado encontrad@' });
    });
};
Permisotaxiasignado.findByIdPermisotaxi = (idPermisotaxi, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.permisotaxi_idpermisotaxi = ? AND permisotaxiasignado.created_by = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idPermisotaxi, created_by];
    } else {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.permisotaxi_idpermisotaxi = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [idPermisotaxi];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado encontrad@' });
    });
};
Permisotaxiasignado.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  WHERE permisotaxiasignado.created_by = ? HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT permisotaxiasignado.*, _estado_idestado.nombre as estado_estado_idestado , _persona.nombre as chofer_chofer_idchofer , _permisotaxi_idpermisotaxi.numero as permisotaxi_permisotaxi_idpermisotaxi FROM permisotaxiasignado INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = permisotaxiasignado.estado_idestado INNER JOIN chofer as _chofer_idchofer ON _chofer_idchofer.idchofer = permisotaxiasignado.chofer_idchofer INNER JOIN permisotaxi as _permisotaxi_idpermisotaxi ON _permisotaxi_idpermisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi INNER JOIN persona as _persona ON _persona.idpersona = _chofer_idchofer.chofer  HAVING permisotaxiasignado.baja IS NULL OR permisotaxiasignado.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado leíd@' });
    });
};

Permisotaxiasignado.findById = (idPermisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM permisotaxiasignado WHERE idpermisotaxiasignado = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxiasignado, created_by];
    } else {
        query = 'SELECT * FROM permisotaxiasignado WHERE idpermisotaxiasignado = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado encontrad@' });
    });
};

Permisotaxiasignado.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpermisotaxiasignado) AS count FROM permisotaxiasignado';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado contabilizad@' });
    });
};

Permisotaxiasignado.exist = (idPermisotaxiasignado, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM permisotaxiasignado WHERE idpermisotaxiasignado = ?) AS exist';
    keys = [idPermisotaxiasignado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado verificad@' });
    });
};

Permisotaxiasignado.insert = (Permisotaxiasignado, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO permisotaxiasignado SET ?';
    keys = [Permisotaxiasignado];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado cread@' });
    });
};

Permisotaxiasignado.update = (Permisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxiasignado SET ? WHERE idpermisotaxiasignado = ? AND created_by = ?';
        keys = [Permisotaxiasignado, Permisotaxiasignado.idpermisotaxiasignado, created_by];
    } else {
        query = 'UPDATE permisotaxiasignado SET ? WHERE idpermisotaxiasignado = ?';
        keys = [Permisotaxiasignado, Permisotaxiasignado.idpermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado actualizad@' });
    });
};

Permisotaxiasignado.remove = (idpermisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM permisotaxiasignado WHERE idpermisotaxiasignado = ? AND created_by = ?';
        keys = [idpermisotaxiasignado, created_by];
    } else {
        query = 'DELETE FROM permisotaxiasignado WHERE idpermisotaxiasignado = ?';
        keys = [idpermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado eliminad@' });
    });
};

Permisotaxiasignado.logicRemove = (idpermisotaxiasignado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permisotaxiasignado SET baja = 1 WHERE idpermisotaxiasignado = ? AND created_by = ?';
        keys = [idpermisotaxiasignado, created_by];
    } else {
        query = 'UPDATE permisotaxiasignado SET baja = 1 WHERE idpermisotaxiasignado = ?';
        keys = [idpermisotaxiasignado];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permisotaxiasignado eliminad@' });
    });
};

Permisotaxiasignado.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Permisotaxiasignado;
