const router = require('express').Router();
const Estado = require('../models/estado');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'dashboard', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estado.all(created_by, (error, data) => {
                        return Estado.response(res, error, data);
                    })
                } else {
                    return Estado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
 
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'dashboard', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Estado.findByChofer(req.params.id, created_by, (error, data) => {
                        return Estado.response(res, error, data);
                    })
                } else {
                    return Estado.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
  

module.exports = router;
