const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

//Route
app.get('/', (req, res) => {
    response(200,"API Ready", "SUCCESS", res)
})

app.get('/mahasiswa', (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (err, fields) => {
        if (err) throw err
        response(200, fields, "SUCCESS", res) 
    })
})

app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err, fields) => {
        if (err) throw err
        response(200, fields, "Detail Mahasiswa", res)
    })
})

app.post('/mahasiswa', (req, res) => {
    const { nim, nama_lengkap, kelas, alamat } = req.body

    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES ('${nim}', '${nama_lengkap}', '${kelas}', '${alamat}')`

    db.query(sql, (err, fields) => {
        if (err) response(500, "Invalid", "Error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId,
            }
            response(200, data, "Add Mahasiswa Successfully", res)
        }
    })
})

app.put("/mahasiswa", (req, res) => {
    const { nim, nama_lengkap, kelas, alamat } = req.body

    const sql = `UPDATE mahasiswa SET nama_lengkap = '${nama_lengkap}', kelas = '${kelas}', alamat= '${alamat}' WHERE nim = ${nim}`

    db.query(sql, (err, fields) => {
        if (err) response(500, "Invalid", "Error", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                message: fields.message
            }
            response(200, data, "Update Mahasiswa Successfully", res)
        } else {
            response(404, "User not found", "Error", res)
        }
    })
})

app.delete("/mahasiswa", (req, res) => {
    const { nim } = req.body

    const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`

    db.query(sql, (err, fields) => {
        if (err) response(500, "Invalid", "Error", res)
        if (fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows,
            }
            response(200, data, "Delete Mahasiswa Successfully", res)
        } else {
            response(404, "User not found", "Error", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})