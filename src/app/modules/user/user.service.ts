/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import UserModel from './user.model'
const createCourse = async (payload: IUser): Promise<IUser | null> => {
  const createdUser = await UserModel.create(payload)
  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course created Field!')
  }
  return createdUser
}

const getCourse = async (): Promise<IUser[]> => {
  const result = await UserModel.find()
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Course created Field!')
  }
  return result
}
const getSingleCourse = async (payload: string): Promise<IUser[] | null> => {
  // const isUserExist = await UserModel.find({ _id: userId })
  try {
    const response: any = await UserModel.findOne({ _id: payload })
    return response
  } catch (error) {
    console.error('Error updating user:', error)
    return null
  }
}
export const UserService = { createCourse, getCourse, getSingleCourse }
