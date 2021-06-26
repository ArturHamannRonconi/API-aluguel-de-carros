import { Router } from 'express'
import multer from 'multer'

import sendForgotPasswordMailController from '@accounts/controllers/userControllers/SendForgotPasswordMailController'
import updateUserAvatarController from '@accounts/controllers/userControllers/UpdateUserAvatarController'
import authenticateUserController from '@accounts/controllers/userControllers/AuthenticateUserController'
import resetPasswordController from '@accounts/controllers/userControllers/ResetPasswordController'
import refreshTokenController from '@accounts/controllers/userControllers/RefreshTokenController'
import createUserController from '@accounts/controllers/userControllers/CreateUserController'
import authenticationHandler from '@shared/infra/http/middlewares/AuthenticationHandler'
import uploadConfig from '@config/UploadConfig'

const usersRoutes = Router()
const uploadAvatar = multer(uploadConfig.options('avatar'))

usersRoutes.route('/')
  .post(createUserController.handle)

usersRoutes.route('/authenticate')
  .post(authenticateUserController.handle)

usersRoutes.route('/refresh-token')
  .post(refreshTokenController.handle)

usersRoutes.route('/avatar')
  .patch(
    authenticationHandler.exec,
    uploadAvatar.single('avatar'),
    updateUserAvatarController.handle
  )

usersRoutes.route('/password-recovery')
  .post(sendForgotPasswordMailController.handle)

usersRoutes.route('/reset-password')
  .patch(resetPasswordController.handle)

export default usersRoutes