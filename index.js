const express = require('express')
const app = express()

const port = 3000

const myLogger = (req, res, next) => {
    console.log('LOGGED')
    next()
}

const middlewareAuth = (req, res, next) => {
    console.log(req.headers)
    if (req.headers.rahasia !== 'secret') {
        res.status(400).send({ error: 'Not Authenticated' })
    } else {
        next()
    }
} 

app.use(myLogger) 

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/profile', middlewareAuth, (req, res) => {
    const profile = {
        firstName: 'Arham',
        lastName: 'Abiyan'
    }

    res.json(profile)
})

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' })
})

app.get('/test/:id', (req, res) => {
    console.log('query', req.query)
    console.log('params', req.params)
    res.send('test page')
})

app.listen(port, () => {
    console.log('Listening in port: ', port)
})