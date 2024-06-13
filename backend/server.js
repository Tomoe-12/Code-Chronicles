const express = require('express')
require('dotenv').config()
var morgan = require('morgan')
const PORT = process.env.PORT
const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')



const app = express()

app.use(morgan('dev'))



// user api
app.use('/api/users', userRoutes)
// question post api
app.use('/api/questions/', questionRoutes)

app.get('/', (req, res) => {
    return res.json({ hello: 'world' })
})


app.listen(PORT, () => {
    console.log('app is runnig at', PORT);
})