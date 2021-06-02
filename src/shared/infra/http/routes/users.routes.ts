import { Router } from 'express'
import multer from 'multer'

import authenticationHandler from '@shared/infra/http/middlewares/AuthenticationHandler'
import createUserController from '@accounts/controllers/userControllers/CreateUserController'
import authenticateUserController from '@accounts/controllers/userControllers/AuthenticateUserController'
import updateUserAvatarController from '@accounts/controllers/userControllers/UpdateUserAvatarController'
import uploadConfig from '@config/UploadConfig'

const usersRoutes = Router()
const uploadAvatar = multer(uploadConfig.options('avatar'))

usersRoutes.route('/')
  .post(createUserController.handle)

usersRoutes.route('/authenticate')
  .post(authenticateUserController.handle)

usersRoutes.route('/avatar')
  .patch(
    authenticationHandler.exec,
    uploadAvatar.single('avatar'),
    updateUserAvatarController.handle
  )

export default usersRoutes