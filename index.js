const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var passwordHash = require('password-hash');

const port = 3000

const user = [
    { 
        id: 1,
        name: 'Sawitri',
        password: '12345',
        isFinished: true
    }
]


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// read todo
app.get('/todo', (req, res) => {
    res.json(user)
})

// read todo
app.get('/todo/:id', (req, res) =>  {
    let result = null;

    for (let i = 0; i < user.length; i++) {
        if (user[i].id == req.params.id) {
            result = user[i]
        }
    }

    if (!result) {
        res.sendStatus(404)
    } else {
        res.json(result)
    }
})

// create todo
app.post('/todo', (req, res) => {
    
const{id,name,password,isFinished}=req.body;
const hashPass = passwordHash.generate(password)
 user.push({
     id,
     name,
     password: hashPass,
     isFinished
 })
    res.json({ message: 'data created' })
})

// update todo
app.patch('/todo/:id', (req, res) => {



    for (let i = 0; i < user.length; i++) {
        if (user[i].id == req.params.id) {
            const{password}= req.body
            const hashPass = passwordHash.generate(password)
            user[i].password = hashPass
        }
    }

    res.json({ message: 'data updated' })
})

// delete todo
app.delete('/todo/:id', (req, res) => {
    let index = null;

    for (let i = 0; i < user.length; i++) {
        if (user[i].id == req.params.id) {
            index = [i]
        }
    }

    user.splice(index, 1)

    res.json({ message: 'data deleted' })
})

app.listen(port, () => {
    console.log('Listening in port: ', port)
})