const router = require('express').Router();
const Vehiculoreparando = require('../models/vehiculoreparando');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .post('/go-out-vehicle', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _vehiculoreparando = req.body;
                    _vehiculoreparando.created_by = auth_data.user.idsi_user;
                    Vehiculoreparando.goOutVehicle( _vehiculoreparando, (error, data) =>{
                        return Vehiculoreparando.response(res, error, data);
                    });
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/enviotaller/:idenviotaller', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoreparando.findByIdEnviotaller(req.params.idenviotaller, created_by, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoreparando.findByIdEstado(req.params.idestado, created_by, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/mecanico/:idmecanico', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoreparando.findByIdMecanico(req.params.idmecanico, created_by, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/permisotaxiasignado/:idpermisotaxiasignado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoreparando.findByIdPermisotaxiasignado(req.params.idpermisotaxiasignado, created_by, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/taller/:idtaller', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoreparando.findByIdTaller(req.params.idtaller, created_by, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoreparando.all(created_by, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculoreparando.count((error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Vehiculoreparando.exist(req.params.id, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoreparando.findById(req.params.id, created_by, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoreparando.logicRemove(req.params.id, created_by, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _vehiculoreparando = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Vehiculoreparando.update(_vehiculoreparando, created_by, (error, data) => {
                        return Vehiculoreparando.response(res, error, data);
                    })
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'vehiculoreparando', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _vehiculoreparando = req.body;
                    _vehiculoreparando.created_by = auth_data.user.idsi_user;
                    Vehiculoreparando.insert( _vehiculoreparando, (error, data) =>{
                        return Vehiculoreparando.response(res, error, data);
                    });
                } else {
                    return Vehiculoreparando.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
