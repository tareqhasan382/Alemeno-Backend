import express from 'express'
import { CourseController } from './students.controller'
const router = express.Router()
router.get('/courses', CourseController.getCourses),
  router.get('/course/:id', CourseController.getSingleCourse),
  //   router.patch('/user/:id', UserController.updateUser)
  // router.delete('/user/:id', UserController.deleteUser)
  router.post('/course', CourseController.createCourse)
export const CourseRoute = router

// /api/course/${id}
