import "express-async-errors";
import express, { Application, json } from 'express'
import { userRoutes } from './routes/users.routes'
import { errorHandler } from './error'

const app: Application = express()
app.use(express.json())

app.use('/users',userRoutes)

app.use(errorHandler)

export default app
