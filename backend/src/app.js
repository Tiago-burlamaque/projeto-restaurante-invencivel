import express from 'express'
import cors from 'cors'
import usuarioRouter from './routes/usuario.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use(usuarioRouter)

export default app;