const express = require('express')
require('dotenv').config()
var morgan = require('morgan')
const PORT = process.env.PORT
const userRoutes = require('./routes/userRoutes')



const app = express()

app.use(morgan('dev'))



// user api
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    return res.json({ hello: 'world' })
})


app.listen(PORT, () => {
    console.log('app is runnig ');
})