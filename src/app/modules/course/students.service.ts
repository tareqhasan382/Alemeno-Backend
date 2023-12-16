/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ICourse } from './students.interface'
import CourseModel from './students.model'
const createCourse = async (payload: ICourse): Promise<ICourse | null> => {
  const createdUser = await CourseModel.create(payload)
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course created Field!')
  }
  return createdUser
}
const getCourse = async (): Promise<ICourse[]> => {
  const result = await CourseModel.find()
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course created Field!')
  }
  return result
}
const getSingleCourse = async (payload: string): Promise<ICourse[] | null> => {
  // const isUserExist = await UserModel.find({ _id: userId })
  try {
    const response: any = await CourseModel.findOne({ _id: payload })
    return response
  } catch (error) {
    console.error('Error updating user:', error)
    return null
  }
}
export const CourseService = { createCourse, getCourse, getSingleCourse }
