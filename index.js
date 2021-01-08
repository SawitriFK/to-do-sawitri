const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passwordHash = require('password-hash');
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'user_db'
})


const port = 3000



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// read todo
app.get('/user', (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (!error) res.json(results)
    })
})



// create todo
app.post('/user', (req, res) => {
    const users = { 
        id: req.body.id,
        fullname: req.body.fullname,
        username: req.body.username,
        pass: passwordHash.generate(req.body.pass)
    }

connection.query('INSERT INTO users SET ?', users, (error, results) => {
    if (!error) {
        res.json({ message: 'data created' })
    } else {
        res.status(500).json({ error: error })
    }
})
})

/
app.listen(port, () => {
    console.log('Listening in port: ', port)
})