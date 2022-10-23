require ('dotenv').config();

const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');



app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

//MySQL
/*const pool = mysql.createPool({
    connectionLimit : 10,
    host:  'localhost', //process.env.DB_HOST ||
    user: 'root', //process.env.DB_USER || 
    password: '', //process.env.DB_PASSWORD || ,
    database: 'capacitacionesdb'//process.env.DB_DATABASE || 
});
const PORT = 3006 //process.env.PORT ||*/

const pool = mysql.createPool({
    connectionLimit : 10,
    host:  process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'capacitacionesdb',
});
const PORT = process.env.PORT || '3006'

//se activa puerto en puerto especifico
app.listen(PORT, () => {
   console.log(`Corriendo en ${PORT}`) 
})
app.get('/', function(req, res) {
    res.send('Funcionando')
});

//CAPACITACIONES CONECCIONES
//POST CAPACITACIONES
app.post('/capacitaciones/nuevo', (req, res) => {
    pool.getConnection((err, connection) => {
        //res.header("Access-Control-Allow-Origin", "*")

        const params = req.body
        connection.query('INSERT INTO capacitaciones SET ?', params, (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                return res.send(`la capacitacion ${params.nombre} ha sido agregada correctamente.`)
            } else {
                console.log(err)
            }
        })
    })
});


//get todas capacitaciones
app.get('/capacitaciones', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from capacitaciones',(err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                return res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});

//Delete capacitaciones
app.delete('/capacitaciones/:idcapacitaciones/delete', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        //query(sqlString, callback)
        connection.query('DELETE from capacitaciones WHERE idcapacitacion = ?', [req.params.idcapacitaciones], (err, rows) => {
            connection.release() //devuelve la conecction a la pool
            if (!err) {
               res.send(`Capacitacion con el ID: ${[req.params.idcapacitaciones]} ha sido eliminada`)
            } else {
                console.log(err)
            }
        })
    })
});
//get capacitaciones by ID
app.get('/capacitaciones/:idcapacitaciones', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from capacitaciones WHERE idcapacitacion = ?', [req.params.idcapacitaciones], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                console.log(`Enviado usuario de id ${req.params.idcapacitaciones}`)
                return res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});

//Edit/update de capacitaciones
app.put(`/capacitaciones/:idcapacitacion/edit`, (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw errcd
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        const {
            nombre,
            temario,
            tipo,
            certificacion,
            fecha,
            plan,
            material,
            observaciones,
        } = req.body

        connection.query('UPDATE capacitaciones SET nombre = ?, temario = ?, tipo = ?, certificacion = ?, fecha = ?, plan = ?, material = ?, observaciones = ?, invitados = ? WHERE idcapacitaciones = ?',
        [nombre, temario, tipo, certificacion, fecha, plan, material, observaciones, invitados], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                return res.send(` La capacitación ${nombre} ha sido modificada.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
});


//ASISTENTES CONECCIONES

//get rows
app.get('/asistente', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistentes',(err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                return res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});

//get asistentes by ID
app.get('/asistente/:id', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistentes WHERE idasistente = ?', [req.params.id], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                 return res.send(rows)
            } else {
                console.log(err)
            }
        })  
    })
});

//Delete asistente
app.delete('/asistente/:id/delete', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected to delete as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('DELETE from asistentes WHERE idasistente = ?', [req.params.id], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                return res.send(`Asistente con el ID: ${[req.params.id]} ha sido eliminado`)
            } else {
                console.log(err)
            }
        })
    })
});

//Add an asistentes
app.post('/asistente/nuevo', (req, res)=> {
    res.header("Access-Control-Allow-Origin", "*")
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected to add as id ${connection.threadId}`)

        //query(sqlString, callback)
        const params = req.body
        connection.query('INSERT INTO asistentes SET ?', params, (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                return res.send(`El asistente ${params.nombre} ha sido agregado.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
});

//Edit/update an asistente
app.put('/asistente/:idasistente/edit', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw errcd
        console.log(`connected to edit as id ${connection.threadId}`)

        //query(sqlString, callback)
        const {
            idasistente,
            nombre,
            legajo,
            tipodoc,
            dni,
            cargo,
            sector,
            fechaingreso
        } = req.body

        connection.query('UPDATE asistentes SET nombre = ?, legajo = ?, tipodoc = ?, dni = ?, cargo = ?, sector = ?, fechaingreso = ? WHERE idasistente = ?',
        [nombre, legajo, tipodoc, dni, cargo, sector, fechaingreso, idasistente], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                return res.send(`El asistente ${nombre} ha sido modificado.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
});
//une capacitaciones con los asistentes
app.post('/addasistentes', (req, res) => {
    pool.getConnection((err, connection) => {
    const params = req.body
    params.forEach(element => {
        connection.query('INSERT INTO asistencia SET ?', element, (err, rows) => {
            })})
        connection.release() //devuelve la conecction a la pool    
        if (!err) {
            return res.send(`Los asistentes de la capacitación han sido agregada correctamente.`)
        } else {
            return console.log(err)
        }        
    })
});
//envia asistentes de capacitacion especifica
app.get('/addasistentes/:idcapacitacion', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistencia WHERE capacitacionID = ?', [req.params.idcapacitacion], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                console.log(`Enviado asistentes de id ${req.params.idcapacitacion}`)
                return res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});


//Edit/update de asistentes
app.put(`/addasistes/:idcapacitacion/edit`, (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw errcd
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        const {
            capacitacionID,
            invitadoID,
            asistencia,
            nombre
        } = req.body

        connection.query('UPDATE asistencia SET capacitacionID = ?, invitadoID = ?, asistencia = ?, nombre = ?, WHERE idcapacitaciones = ?',
        [capacitacionID,
            invitadoID,
            asistencia,
            nombre], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                return res.send(` Los asistentes de la capacitacion han sido modificados.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
});

//Envia asistentes de capacitacion especifica
app.get('/asistentes/', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistencia', (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                console.log(`Enviados asistentes`)
                return res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
});

//get asistentes by ID
app.get('/asistencia/:id', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistencia WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                 return res.send(rows)
            } else {
                console.log(err)
            }
        })  
    })
});


//Edita puntaje de id especifico
app.put(`/updatepuntaje`, (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const {
            id,
            puntaje
        } = req.body
        //query(sqlString, callback)
        connection.query('UPDATE asistencia SET puntaje = ? WHERE id = ? ',[puntaje, id], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                console.log(`Puntaje editado`)
                res.send(`Asistente con id ${id} ha modificado su puntaje a ${puntaje} `)
                res.redirect('/search');

            } else {
                console.log(err)
            }
        })
    })
});


//Delete capacitaciones
app.delete('/capacitaciones/:idcapacitaciones/delete', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        //query(sqlString, callback)
        connection.query('DELETE from capacitaciones WHERE idcapacitacion = ?', [req.params.idcapacitaciones], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
               res.send(`Capacitacion con el ID: ${[req.params.idcapacitaciones]} ha sido eliminada`)
            } else {
                console.log(err)
            }
        })
    })
});