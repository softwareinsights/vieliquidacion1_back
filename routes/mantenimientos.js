const router = require('express').Router();
const Mantenimiento = require('../models/mantenimiento');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mantenimiento', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Mantenimiento.all(created_by, (error, data) => {
                        return Mantenimiento.response(res, error, data);
                    })
                } else {
                    return Mantenimiento.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mantenimiento', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Mantenimiento.count((error, data) => {
                        return Mantenimiento.response(res, error, data);
                    })
                } else {
                    return Mantenimiento.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mantenimiento', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Mantenimiento.exist(req.params.id, (error, data) => {
                        return Mantenimiento.response(res, error, data);
                    })
                } else {
                    return Mantenimiento.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mantenimiento', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Mantenimiento.findById(req.params.id, created_by, (error, data) => {
                        return Mantenimiento.response(res, error, data);
                    })
                } else {
                    return Mantenimiento.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mantenimiento', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Mantenimiento.logicRemove(req.params.id, created_by, (error, data) => {
                        return Mantenimiento.response(res, error, data);
                    })
                } else {
                    return Mantenimiento.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mantenimiento', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _mantenimiento = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Mantenimiento.update(_mantenimiento, created_by, (error, data) => {
                        return Mantenimiento.response(res, error, data);
                    })
                } else {
                    return Mantenimiento.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'mantenimiento', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _mantenimiento = req.body;
                    _mantenimiento.created_by = auth_data.user.idsi_user;
                    Mantenimiento.insert( _mantenimiento, (error, data) =>{
                        return Mantenimiento.response(res, error, data);
                    });
                } else {
                    return Mantenimiento.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
