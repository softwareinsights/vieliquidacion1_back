const router = require('express').Router();
const Pagobonificacion = require('../models/pagobonificacion');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/bonificacion/:idbonificacion', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagobonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagobonificacion.findByIdBonificacion(req.params.idbonificacion, created_by, (error, data) => {
                        return Pagobonificacion.response(res, error, data);
                    })
                } else {
                    return Pagobonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/pago/:idpago', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagobonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagobonificacion.findByIdPago(req.params.idpago, created_by, (error, data) => {
                        return Pagobonificacion.response(res, error, data);
                    })
                } else {
                    return Pagobonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagobonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagobonificacion.all(created_by, (error, data) => {
                        return Pagobonificacion.response(res, error, data);
                    })
                } else {
                    return Pagobonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagobonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pagobonificacion.count((error, data) => {
                        return Pagobonificacion.response(res, error, data);
                    })
                } else {
                    return Pagobonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagobonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Pagobonificacion.exist(req.params.id, (error, data) => {
                        return Pagobonificacion.response(res, error, data);
                    })
                } else {
                    return Pagobonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagobonificacion', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagobonificacion.findById(req.params.id, created_by, (error, data) => {
                        return Pagobonificacion.response(res, error, data);
                    })
                } else {
                    return Pagobonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagobonificacion', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagobonificacion.logicRemove(req.params.id, created_by, (error, data) => {
                        return Pagobonificacion.response(res, error, data);
                    })
                } else {
                    return Pagobonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagobonificacion', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _pagobonificacion = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Pagobonificacion.update(_pagobonificacion, created_by, (error, data) => {
                        return Pagobonificacion.response(res, error, data);
                    })
                } else {
                    return Pagobonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'pagobonificacion', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _pagobonificacion = req.body;
                    _pagobonificacion.created_by = auth_data.user.idsi_user;
                    Pagobonificacion.insert( _pagobonificacion, (error, data) =>{
                        return Pagobonificacion.response(res, error, data);
                    });
                } else {
                    return Pagobonificacion.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
