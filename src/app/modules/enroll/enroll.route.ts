import express from 'express'
import { authVerify } from '../../middlewares/authVerify'
import { ENUM_ROLE } from '../user/user.interface'
import { EnrollController } from './enroll.controller'
//import { authVerify } from '../../middlewares/authVerify'
const router = express.Router()
router.get('/enroll', authVerify(ENUM_ROLE.USER), EnrollController.getEnroll)
router.post(
  '/enroll',
  authVerify(ENUM_ROLE.USER),
  EnrollController.createEnroll
)

export const EnrollRoute = router
