const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000

const todos = [
    { 
        id: 1,
        task: 'Wake up',
        isFinished: true
    }
]


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


// read todo
app.get('/todo', (req, res) => {
    res.json(todos)
})

// read todo
app.get('/todo/:id', (req, res) =>  {
    let result = null;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == req.params.id) {
            result = todos[i]
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
    todos.push(req.body)

    res.json({ message: 'data created' })
})

// update todo
app.patch('/todo/:id', (req, res) => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == req.params.id) {
            todos[i].isFinished = req.body.isFinished
        }
    }

    res.json({ message: 'data updated' })
})

// delete todo
app.delete('/todo/:id', (req, res) => {
    let index = null;

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == req.params.id) {
            index = [i]
        }
    }

    todos.splice(index, 1)

    res.json({ message: 'data deleted' })
})

app.listen(port, () => {
    console.log('Listening in port: ', port)
})