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
        console.log(`connected as id ${connection.threadId}. Sending all capacitaciones`)

        //query(sqlString, callback)
        connection.query('SELECT * from capacitaciones WHERE eliminado = 0',(err, rows) => {
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
        console.log(`connected as id ${connection.threadId}. Delete capacitacion with id ${req.params.idcapacitaciones}`)
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
//DELETE  CAPACITACION - lo desactiva
app.put(`/deletecapacitacion`, (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const {
            id
        } = req.body
        //query(sqlString, callback)
        connection.query('UPDATE capacitaciones SET eliminado = 1 WHERE idcapacitacion = ? ',[id], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                console.log(`Capacitacion eliminada`)
                return res.send(`Capacitacion con id ${id} fue eliminada`)
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
        console.log(`connected as id ${connection.threadId}. Sending capacitacion with id ${req.params.idcapacitaciones}`)

        //query(sqlString, callback)
        connection.query('SELECT * from capacitaciones WHERE idcapacitacion = ? AND eliminado = 0', [req.params.idcapacitaciones], (err, rows) => {
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
    const capacitacionSeleccionada = req.params.idcapacitacion;
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}, for update capacitacion ${capacitacionSeleccionada}`)

        //query(sqlString, callback)
        const {
            categoria,
            certificacion,
            duracion,
            eliminado,
            fecha,
            idcapacitacion,
            material,
            modalidad,
            nombre,
            observaciones,
            plan,
            temario,
            tipo,
            capacitador,
            linkQR
        } = req.body

        connection.query('UPDATE capacitaciones SET categoria = ?, certificacion = ?, duracion = ?, eliminado = ?, fecha = ?, idcapacitacion = ?, material = ?, modalidad = ?, nombre = ?, observaciones = ?, plan = ?, temario = ?, tipo = ?, capacitador = ?, linkQR = ?  WHERE idcapacitacion = ?',
        [categoria, certificacion, duracion, eliminado, fecha, idcapacitacion, material, modalidad, nombre, observaciones, plan, temario, tipo, capacitador, linkQR, capacitacionSeleccionada], (err, rows) => {
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
        console.log(`connected as id ${connection.threadId}. Sending asistentes`)

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
        console.log(`connected as id ${connection.threadId}. Sending asistente with id ${req.params.id}`)

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
        console.log(`connected to add as id ${connection.threadId}. Adding asistente: ${req.body.nombre}`)

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
        //determino id de asistente desde la url
        const idasistente = req.params.idasistente;
        if(err) throw err
        console.log(`connected to edit as id ${connection.threadId}. Editing asistente: ${req.body.nombre}`)
        const {
            nombre,
            legajo,
            tipodoc,
            dni,
            cargo,
            sector,
            fechaingreso
        } = req.body

        connection.query('UPDATE asistentes SET nombre = ?, legajo = ?, tipodoc = ?, dni = ?, cargo = ?, sector = ?, fechaingreso = ? WHERE idasistente = ?',
        [ nombre, legajo, tipodoc, dni, cargo, sector, fechaingreso, idasistente], (err, rows) => {
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
    console.log(`connected to edit as id ${connection.threadId}. Sending asistentes to capacitacion: ${req.body.capacitacionID}`)
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
        console.log(`connected as id ${connection.threadId}. Sending asistentes to capacitacion: ${req.params.idcapacitacion}`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistencia WHERE capacitacionID = ? AND eliminado = 0', [req.params.idcapacitacion], (err, rows) => {
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

//Envia todas las asistencias
app.get('/asistencia', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}. Sending asistencias`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistencia',(err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
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
        if(err) throw err
        console.log(`connected as id ${connection.threadId}. Editing asistentes: ${req.body.nombre}`)

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
app.get('/asistentes/', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}. Sending asistentes`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistencia WHERE eliminado = 0', (err, rows) => {
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
//Envia asistentes de capacitacion especifica
app.get('/asistentes/:idcapacitacion', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}. Sending asistentes to capacitacion: ${req.params.idcapacitacion}`)

        //query(sqlString, callback)
        connection.query('SELECT * from asistencia WHERE capacitacionID = ?', [req.params.idcapacitacion], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                console.log(`Enviados asistentes de capacitacion pedida`)
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
        console.log(`connected as id ${connection.threadId}. Sending asistencia with id: ${req.params.id}`)

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
        console.log(`connected as id ${connection.threadId}. Editing puntaje: ${req.body.id}`)
        const {
            id,
            puntaje,
            asistencia,
            porcentaje
        } = req.body
        //query(sqlString, callback)
        connection.query('UPDATE asistencia SET puntaje = ?, asistencia = ?, porcentaje = ? WHERE id = ? ',[puntaje, asistencia, porcentaje, id ], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                console.log(`Puntaje editado`)
                return res.send(`Asistente con id ${id} ha modificado.`)
            } else {
                console.log(err)
            }
        })
    })
}); 

//DELETE ASISTENTES DE CAPACITACION - lo desactiva
app.put(`/deleteasistente`, (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}.  Deactivating asistente: ${req.body.id}`)
        const {
            id,
            puntaje
        } = req.body
        //query(sqlString, callback)
        connection.query('UPDATE asistencia SET eliminado = 1 WHERE id = ? ',[id], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                console.log(`asistente eliminado`)
                return res.send(`Asistente con id ${id} fue eliminado`)
            } else {
                console.log(err)
            }
        })
    })
});
//Delete capacitaciones
app.delete('/deleteasistente/:idasistente', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}. Deleting asistente: ${req.params.idasistente}`)
        //query(sqlString, callback)
        connection.query('DELETE from asistencia WHERE id = ?', [req.params.idasistente], (err, rows) => {
            connection.release() //devuelve la conecction a la pool
            if (!err) {
               res.send(`Capacitacion con el ID: ${[req.params.idasistente]} ha sido eliminada`)
            } else {
                console.log(err)
            }
        })
    })
});

//FILTRA POR FECHA
app.get('/filter/', (req, res)=> {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}. Filtering asistentes`)
        const {
            busqueda,
            finicio,
            ffin
        } = req.body
        //query(sqlString, callback)
        connection.query('SELECT * from asistencia WHERE busqueda = ? && (? <= fecha && ? >= fecha)', [busqueda, finicio, ffin], (err, rows) => {
            connection.release() //devuelve la conecction a la pool

            if (!err) {
                 return res.send(rows)
            } else {
                console.log(err)
            }
        })  
    })
});
