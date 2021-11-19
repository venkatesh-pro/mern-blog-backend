const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({
  path: '.env',
})

const connectDb = require('./config/db')
const articleRouter = require('./routes/articleRoutes')
const userRoutes = require('./routes/userRoutes')
const AppError = require('./config/AppError')
const globalErrorController = require('./controller/globalErrorController')

const app = express()

app.use(cors())
app.use(express.json({ limit: '5mb' }))

// connect DB
connectDb()

// routes

app.use('/', articleRouter)
app.use('/', userRoutes)

app.use(globalErrorController)

app.listen(process.env.PORT, () => {
  console.log('App is running on http://localhost:5000')
})
