
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');



app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

//MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capacitacionesdb'
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
                res.send(`la capacitacion ${params.nombre} ha sido agregada correctamente.`)
                res.redirect('/capacitacion')
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
                res.send(rows)
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
                res.send(rows)
                console.log(`enviado usuario de id ${req.params.idcapacitaciones}`)
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
            invitados
        } = req.body

        connection.query('UPDATE capacitaciones SET nombre = ?, temario = ?, tipo = ?, certificacion = ?, fecha = ?, plan = ?, material = ?, observaciones = ?, invitados = ? WHERE idcapacitaciones = ?',
        [nombre, temario, tipo, certificacion, fecha, plan, material, observaciones, invitados], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                res.send(` La capacitacion ${nombre} ha sido modificada.`)
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
                res.send(rows)
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
                return res.send(`asistente con el ID: ${[req.params.id]} ha sido eliminado`)
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
                return res.send(` el asistente ${params.nombre} ha sido agregado.`)
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
                res.send(` el asistente ${nombre} ha sido modificado.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
});


//se activa puerto en puerto especifico
const PORT = 3006
app.listen(PORT, () => {
   console.log(`Corriendo en ${PORT}`) 
})
