import { Router } from 'express'
import multer from 'multer'

import CreateUserController from '../modules/accounts/controllers/userControllers/CreateUserController'
import AuthenticateUserController from '../modules/accounts/controllers/userControllers/AuthenticateUserController'
import UpdateUserAvatarController from '../modules/accounts/controllers/userControllers/UpdateUserAvatarController'
import AuthenticationHandler from '../middlewares/AuthenticationHandler'
import uploadConfig from '../config/UploadConfig'

const usersRoutes = Router()
const uploadAvatar = multer(uploadConfig.options('avatar'))

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()
const authenticationHandler = new AuthenticationHandler()

usersRoutes.route('/users')
  .post(createUserController.handle)

usersRoutes.route('/users/authenticate')
  .post(authenticateUserController.handle)

usersRoutes.route('/users/avatar')
  .patch(
    authenticationHandler.handle,
    uploadAvatar.single('avatar'),
    updateUserAvatarController.handle
  )

export default usersRoutes