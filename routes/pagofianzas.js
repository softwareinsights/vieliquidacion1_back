const router = require('express').Router();
const Pagofianza = require('../models/pagofianza');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.all(created_by, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pagofianza.count((error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pagofianza.exist(req.params.id, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.findById(req.params.id, created_by, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.logicRemove(req.params.id, created_by, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _pagofianza = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagofianza.update(_pagofianza, created_by, (error, data) => {
                        return Pagofianza.response(res, error, data);
                    })
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagofianza', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _pagofianza = req.body;
                    _pagofianza.created_by = auth_data.user.idsi_user;
                    Pagofianza.insert( _pagofianza, (error, data) =>{
                        return Pagofianza.response(res, error, data);
                    });
                } else {
                    return Pagofianza.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
