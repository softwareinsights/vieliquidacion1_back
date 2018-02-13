const express = require('express');
const connection = require('./config/db-connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
// var CronJob = require('cron').CronJob;

//Route importation.
const bonificacion = require('./routes/bonificacions');
const chofer = require('./routes/chofers');
const concepto = require('./routes/conceptos');
const corralon = require('./routes/corralons');
const egresoconcepto = require('./routes/egresoconceptos');
const enviotaller = require('./routes/enviotallers');
const estado = require('./routes/estados');
const liquidacion = require('./routes/liquidacions');
const mecanico = require('./routes/mecanicos');
const orden = require('./routes/ordens');
const orden_has_refaccion = require('./routes/orden_has_refaccions');
const pago = require('./routes/pagos');
const pagobonificacion = require('./routes/pagobonificacions');
const pagofianza = require('./routes/pagofianzas');
const pagoliquidacion = require('./routes/pagoliquidacions');
const permisotaxi = require('./routes/permisotaxis');
const permisotaxiasignado = require('./routes/permisotaxiasignados');
const persona = require('./routes/personas');
const refaccion = require('./routes/refaccions');
const si_modulo = require('./routes/si_modulos');
const si_permiso = require('./routes/si_permisos');
const si_reporte = require('./routes/si_reportes');
const si_rol = require('./routes/si_rols');
const si_user = require('./routes/si_users');
const taller = require('./routes/tallers');
const vehiculo = require('./routes/vehiculos');
const vehiculoreparando = require('./routes/vehiculoreparandos');
const dashboard = require('./routes/dashboard');
const mantenimiento = require('./routes/mantenimientos');

// Express Instance
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Initialize passport
app.use(passport.initialize());

// Call passport Strategy
require('./config/passport')(passport);

// Warehouses
app.use('/bonificacion', bonificacion);
app.use('/chofer', chofer);
app.use('/concepto', concepto);
app.use('/corralon', corralon);
app.use('/egresoconcepto', egresoconcepto);
app.use('/enviotaller', enviotaller);
app.use('/estado', estado);
app.use('/liquidacion', liquidacion);
app.use('/mecanico', mecanico);
app.use('/orden', orden);
app.use('/orden_has_refaccion', orden_has_refaccion);
app.use('/pago', pago);
app.use('/pagobonificacion', pagobonificacion);
app.use('/pagofianza', pagofianza);
app.use('/pagoliquidacion', pagoliquidacion);
app.use('/permisotaxi', permisotaxi);
app.use('/permisotaxiasignado', permisotaxiasignado);
app.use('/persona', persona);
app.use('/refaccion', refaccion);
app.use('/si_modulo', si_modulo);
app.use('/si_permiso', si_permiso);
app.use('/si_reporte', si_reporte);
app.use('/si_rol', si_rol);
app.use('/si_user', si_user);
app.use('/taller', taller);
app.use('/vehiculo', vehiculo);
app.use('/vehiculoreparando', vehiculoreparando);
app.use('/dashboard', dashboard);
app.use('/mantenimiento', mantenimiento);


/*
// CRON JOB, CREA LIQUIDACIONES DIARIAS PARA TODOS LOS PERMISOSTAXIASIGNADOS CON ESTADO ASIGNADO

// new CronJob('10 * * * * * *', function() {
new CronJob('00 00 00 * * 0-7', function() {
   
    let now = '';
    let weekday = '';
    let permisotaxiasignados = [];

   ////// SACAR QUE NÚMERO DÍA ES HOY Y LA FECHA
    query = 'SELECT WEEKDAY(NOW()) as weekday, CURDATE() as now';
    keys = [];

    connection.query(query, keys, (error, fecha) => {
        if(error) 
            console.log("ERROR Un error ha ocurrido mientras se leía el día de la semana y la fecha");
        else {
            now = fecha[0].now;
            weekday = fecha[0].weekday;

            ////// OBTENER TODOS PERMISOS ASIGNADOS CON ESTATUS ASIGNADO DE ACUERDO AL NÚMERO DE DÍA ACTUAL
            if (weekday === 6) {
                query = 'SELECT pta.chofer_idchofer as idchofer, pta.idpermisotaxiasignado, pta.hora as h_corte, pt.liquidezDom as liquidacion, pta.baja FROM permisotaxiasignado AS pta INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE pta.estado_idestado = 12 HAVING pta.baja IS NULL OR pta.baja = false';
                keys = [];
            } else {
                query = 'SELECT pta.chofer_idchofer as idchofer, pta.idpermisotaxiasignado, pta.hora as h_corte, pt.liquidez as liquidacion, pta.baja FROM permisotaxiasignado AS pta INNER JOIN permisotaxi as pt ON pt.idpermisotaxi = pta.permisotaxi_idpermisotaxi WHERE pta.estado_idestado = 12 HAVING pta.baja IS NULL OR pta.baja = false';
                keys = [];
            }

            connection.query(query, keys, (error, permisotaxiasignados) => {
                if(error) 
                    console.log("ERROR Un error ha ocurrido mientras se leía el permisoasignado");
                else {

                    ////// POR CADA PERMISOTAXIASIGNADO
                    permisotaxiasignados.forEach(element => {

                        let Liquidacion = {
                            fecha: now,
                            saldoanterior: element.liquidacion,
                            saldoactual: element.liquidacion,
                            montopagado: 0,
                            bonificado: 0,
                            h_corte: element.h_corte,
                            permisotaxiasignado_idpermisotaxiasignado: element.idpermisotaxiasignado,
                            chofer_idchofer: element.idchofer,
                            estado_idestado: 9 // ADEUDANDO
                        }

                        query = 'INSERT INTO liquidacion SET ?';
                        keys = [Liquidacion];

                        connection.query(query, keys, (error, result) => {
                            if(error) {
                                console.log("ERROR al crear liquidación: ", error);
                            }
                            else {
                                console.log("Se ha creado el registro de liquidación: ", result);
                            }
                        });
                    });
                }
            });
        }
    });
}, null, true, 'America/Mexico_City');
*/

// Set port
app.listen(3000);
