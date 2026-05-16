import Router from 'express'
import { getUsuarioById, loginUser, postUser } from '../controller/usuario.controller.js'

const usuarioRouter = Router()

usuarioRouter.get('/listar/:id', getUsuarioById)
usuarioRouter.post('/registro', postUser)
usuarioRouter.post('/login', loginUser)

export default usuarioRouter;