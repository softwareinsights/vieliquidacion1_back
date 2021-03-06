const router = require('express').Router();
const Liquidacion = require('../models/liquidacion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/reporte', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Liquidacion.reporte((error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })


    .get('/liquidacion-from-idchofer/:id/fecha/:fecha', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Liquidacion.liquidacionFromIdchoferFecha(req.params.id,req.params.fecha, created_by, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })


    .get('/adeudando-from-idchofer/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Liquidacion.adeudandoFromIdchofer(req.params.id, created_by, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/chofer/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Liquidacion.findByIdChofer(req.params.idchofer, created_by, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Liquidacion.findByIdEstado(req.params.idestado, created_by, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/permisotaxiasignado/:idpermisotaxiasignado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Liquidacion.findByIdPermisotaxiasignado(req.params.idpermisotaxiasignado, created_by, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Liquidacion.all(created_by, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Liquidacion.count((error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Liquidacion.exist(req.params.id, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Liquidacion.findById(req.params.id, created_by, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Liquidacion.logicRemove(req.params.id, created_by, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _liquidacion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Liquidacion.update(_liquidacion, created_by, (error, data) => {
                        return Liquidacion.response(res, error, data);
                    })
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'liquidacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _liquidacion = req.body;
                    _liquidacion.created_by = auth_data.user.idsi_user;
                    Liquidacion.insert( _liquidacion, (error, data) =>{
                        return Liquidacion.response(res, error, data);
                    });
                } else {
                    return Liquidacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
