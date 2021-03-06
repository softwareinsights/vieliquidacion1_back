const connection = require('../config/db-connection');

const Chofer = {};


Chofer.findByIdChofer = (idChofer, next) => {
    if( !connection )
        return next('Connection refused');

    let query = 'SELECT permisotaxi.numero,persona.nombre as chofer, liquidacion.fecha, liquidacion.montopagado, pago.folio, pago.nota from permisotaxi RIGHT join permisotaxiasignado on permisotaxi.idpermisotaxi = permisotaxiasignado.permisotaxi_idpermisotaxi RIGHT join chofer on permisotaxiasignado.chofer_idchofer = chofer.idchofer RIGHT JOIN persona on chofer.chofer = persona.idpersona RIGHT join liquidacion on permisotaxiasignado.idpermisotaxiasignado = liquidacion.permisotaxiasignado_idpermisotaxiasignado RIGHT JOIN pagoliquidacion on liquidacion.idliquidacion = pagoliquidacion.liquidacion_idliquidacion RIGHT join pago on pagoliquidacion.pago_idpago = pago.idpago WHERE pago.chofer_idchofer = ? order by pago.fecha';

    let keys = [idChofer];

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};

Chofer.findByIdEstado = (idEstado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.estado_idestado = ? AND chofer.created_by = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.estado_idestado = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.findByIdEstado = (idEstado, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.estado_idestado = ? AND chofer.created_by = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idEstado, created_by];
    } else {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.estado_idestado = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idEstado];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.findByIdPersona = (idPersona, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? AND chofer.created_by = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.findByIdPersona = (idPersona, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? AND chofer.created_by = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.findByIdPersona = (idPersona, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? AND chofer.created_by = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.findByIdPersona = (idPersona, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? AND chofer.created_by = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.findByIdPersona = (idPersona, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? AND chofer.created_by = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona, created_by];
    } else {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.persona_idpersona = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [idPersona];
    }

    connection.query(query, keys, (error, result) => {
        if(error)
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};
Chofer.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   WHERE chofer.created_by = ? HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT chofer.*, _estado_idestado.nombre as estado_estado_idestado , _estado_idestado_fianza.nombre as estado_estado_idestado_fianza , _chofer.nombre as persona_chofer , _aval1.nombre as persona_aval1 , _aval2.nombre as persona_aval2 , _aval3.nombre as persona_aval3 , _aval4.nombre as persona_aval4 FROM chofer INNER JOIN estado as _estado_idestado ON _estado_idestado.idestado = chofer.estado_idestado INNER JOIN estado as _estado_idestado_fianza ON _estado_idestado_fianza.idestado = chofer.estado_idestado_fianza INNER JOIN persona as _chofer ON _chofer.idpersona = chofer.chofer INNER JOIN persona as _aval1 ON _aval1.idpersona = chofer.aval1 INNER JOIN persona as _aval2 ON _aval2.idpersona = chofer.aval2 INNER JOIN persona as _aval3 ON _aval3.idpersona = chofer.aval3 INNER JOIN persona as _aval4 ON _aval4.idpersona = chofer.aval4   HAVING chofer.baja IS NULL OR chofer.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer leíd@' });
    });
};

Chofer.findById = (idChofer, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM chofer WHERE idchofer = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idChofer, created_by];
    } else {
        query = 'SELECT * FROM chofer WHERE idchofer = ? HAVING baja IS NULL OR baja = false';
        keys = [idChofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer encontrad@' });
    });
};

Chofer.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idchofer) AS count FROM chofer';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Chofer contabilizad@' });
    });
};

Chofer.exist = (idChofer, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM chofer WHERE idchofer = ?) AS exist';
    keys = [idChofer];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Chofer verificad@' });
    });
};

Chofer.insert = (Chofer, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO chofer SET ?';
    keys = [Chofer];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Chofer cread@' });
    });
};

Chofer.update = (Chofer, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE chofer SET ? WHERE idchofer = ? AND created_by = ?';
        keys = [Chofer, Chofer.idchofer, created_by];
    } else {
        query = 'UPDATE chofer SET ? WHERE idchofer = ?';
        keys = [Chofer, Chofer.idchofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer actualizad@' });
    });
};

Chofer.remove = (idchofer, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM chofer WHERE idchofer = ? AND created_by = ?';
        keys = [idchofer, created_by];
    } else {
        query = 'DELETE FROM chofer WHERE idchofer = ?';
        keys = [idchofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer eliminad@' });
    });
};

Chofer.logicRemove = (idchofer, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE chofer SET baja = 1 WHERE idchofer = ? AND created_by = ?';
        keys = [idchofer, created_by];
    } else {
        query = 'UPDATE chofer SET baja = 1 WHERE idchofer = ?';
        keys = [idchofer];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Chofer eliminad@' });
    });
};

Chofer.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Chofer;
