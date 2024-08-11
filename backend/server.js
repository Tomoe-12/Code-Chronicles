const express = require('express')
require('dotenv').config()
var morgan = require('morgan')
const cors = require('cors');
const PORT = process.env.PORT
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const userRoutes = require('./routes/userRoutes')
const questionRoutes = require('./routes/questionRoutes')
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express()

app.use(cors({
    origin: 'http://localhost:5174' ,// Or use '*' to allow all origins
    credentials : true
  }));

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())


app.use(morgan('dev'))
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@question.ivoisiv.mongodb.net/?retryWrites=true&w=majority&appName=question`)
    .then(() => {
        console.log('mongodb connected successfully');
        app.listen(PORT, () => {
            console.log('app is runnig at', PORT);
        })
    }
    ).catch((e) => {
        console.log('error connectiing to mongodb', e);
    })

// user api
app.use('/api/users/', userRoutes)
// question post api
app.use('/api/questions/', questionRoutes)


app.get('/', (req, res) => {
    return res.json({ hello: 'world' })
})

//  cookie 
app.get('/set-cookie', (req, res) => {
    res.cookie('name', 'aungung')
    res.cookie('important-key', 'value', { httpOnly: true })
    return res.send('cooki already set')
})

app.get('/get-cookie', (req, res) => {
    return res.send(req.cookies)
})
