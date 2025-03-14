import { Router } from 'express'
import multer from 'multer'

import { authController } from '../controller/auth'

const upload = multer()

export const router = Router()

// auth router

const authRouter = Router()

authRouter.post('/register', upload.single('image'), authController.register)
authRouter.post('/log-in', authController.login)
authRouter.delete('/log-out', authController.logout)
authRouter.post('/token/refresh')

router.use('/auth', authRouter)

// capsule router

const capsuleRouter = Router()

capsuleRouter.post('/')
capsuleRouter.get('/public')
capsuleRouter.get('/user/:id')
capsuleRouter.get('/user/:id/recieved')
capsuleRouter.get('/user/:id/sent')
capsuleRouter.get('/:id')
capsuleRouter.put('/:id')
capsuleRouter.delete('/:id')

router.use('/capsules', capsuleRouter)

// user router

const userRouter = Router()

userRouter.get('/:id')
userRouter.get('/me')
userRouter.put('/me')
userRouter.delete('/me')

router.use('/users', userRouter)
