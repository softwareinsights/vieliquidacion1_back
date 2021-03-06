const router = require('express').Router();
const Permisotaxi = require('../models/permisotaxi');
const passport = require('passport');
const permissions = require('../config/permissions');

router


    .get('/bitacora-pagos/:idpermisotaxi', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxi.findByIdPermisoTaxi(req.params.idpermisotaxi, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

    .get('/this-day/:id/this-hour', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findLiquidezByIdInThisDayAtThisHour(req.params.id, created_by, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/this-day/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findLiquidezByIdInThisDay(req.params.id, created_by, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findByIdEstado(req.params.idestado, created_by, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/persona/:idpersona', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findByIdPersona(req.params.idpersona, created_by, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/vehiculo/:idvehiculo', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findByIdVehiculo(req.params.idvehiculo, created_by, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.all(created_by, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxi.count((error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisotaxi.exist(req.params.id, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.findById(req.params.id, created_by, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.logicRemove(req.params.id, created_by, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxi = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisotaxi.update(_permisotaxi, created_by, (error, data) => {
                        return Permisotaxi.response(res, error, data);
                    })
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisotaxi', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _permisotaxi = req.body;
                    _permisotaxi.created_by = auth_data.user.idsi_user;
                    Permisotaxi.insert( _permisotaxi, (error, data) =>{
                        return Permisotaxi.response(res, error, data);
                    });
                } else {
                    return Permisotaxi.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
