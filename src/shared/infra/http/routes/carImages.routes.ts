import { Router } from 'express'
import multer from 'multer'

import authenticationHandler from '../middlewares/AuthenticationHandler'
import authorizationHandler from '../middlewares/AuthorizationHandler'
import uploadCarImageController from '@cars/controllers/carImageControllers/UploadCarImageController'
import uploadConfig from '@config/UploadConfig'

const carImagesRoutes = Router()
const upload = multer(uploadConfig.options)

carImagesRoutes.route('/:car_id')
  .post(
    authenticationHandler.exec,
    authorizationHandler.exec,
    upload.array('images'),
    uploadCarImageController.handle
  )

export default carImagesRoutes