import express from 'express'
import { UserController } from './user.controller'
import { authVerify } from '../../middlewares/authVerify'
import { ENUM_ROLE } from './user.interface'

const router = express.Router()
router.get('/users', authVerify(ENUM_ROLE.USER), UserController.getCourses),
  router.get(
    '/user/:id',
    authVerify(ENUM_ROLE.USER),
    UserController.getSingleCourse
  ),
  router.post('/login', UserController.login)

//   router.patch('/user/:id', UserController.)
// router.delete('/user/:id', UserController.deleteUser)

router.post('/signup', UserController.createCourse)
export const UserRoute = router
