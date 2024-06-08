const express = require('express')
require('dotenv').config()
var morgan = require('morgan')
const PORT = process.env.PORT



const app = express()

app.use(morgan('dev'))


app.get('/', (req, res) => {
    return res.json({ hello: 'world' })
})


app.listen(PORT, () => {
    console.log('app is runnig ');
})