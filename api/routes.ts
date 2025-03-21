import { Router } from 'express'
import multer from 'multer'

import { authController } from '../controller/auth'
import { userController } from '../controller/user'
import { imageController } from '../controller/image'

const upload = multer()

export const router = Router()

// auth router

const authRouter = Router()

authRouter.post('/register', upload.single('image'), authController.register)
authRouter.post('/log-in', authController.login)
authRouter.delete('/log-out', authController.logout)
authRouter.post('/token/refresh', authController.refreshToken)

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

userRouter.get('/me', userController.getCurrentUser)
userRouter.get('/me/image', imageController.getCurrentUserImage)
userRouter.put('/me', upload.single('image'), userController.editUser)
userRouter.delete('/me', userController.deleteUser)
userRouter.get('/:id', userController.getUserById)
userRouter.get('/:id/image', imageController.getUserImageById)

router.use('/users', userRouter)
