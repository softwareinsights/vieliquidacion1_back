const router = require('express').Router();
const Pago = require('../models/pago');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/chofer/:idchofer', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pago.findByIdChofer(req.params.idchofer, created_by, (error, data) => {
                        return Pago.response(res, error, data);
                    })
                } else {
                    return Pago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/estado/:idestado', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pago.findByIdEstado(req.params.idestado, created_by, (error, data) => {
                        return Pago.response(res, error, data);
                    })
                } else {
                    return Pago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pago.all(created_by, (error, data) => {
                        return Pago.response(res, error, data);
                    })
                } else {
                    return Pago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pago.count((error, data) => {
                        return Pago.response(res, error, data);
                    })
                } else {
                    return Pago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pago.exist(req.params.id, (error, data) => {
                        return Pago.response(res, error, data);
                    })
                } else {
                    return Pago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pago', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pago.findById(req.params.id, created_by, (error, data) => {
                        return Pago.response(res, error, data);
                    })
                } else {
                    return Pago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pago', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pago.logicRemove(req.params.id, created_by, (error, data) => {
                        return Pago.response(res, error, data);
                    })
                } else {
                    return Pago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pago', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _pago = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pago.update(_pago, created_by, (error, data) => {
                        return Pago.response(res, error, data);
                    })
                } else {
                    return Pago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pago', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _pago = req.body;
                    _pago.created_by = auth_data.user.idsi_user;
                    Pago.insert( _pago, (error, data) =>{
                        return Pago.response(res, error, data);
                    });
                } else {
                    return Pago.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
