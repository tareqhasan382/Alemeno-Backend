/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { UserService } from './user.service'
import { IUser } from './user.interface'
import UserModel from './user.model'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import config from '../../../config'
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const isExist = await UserModel.findOne({ email: req.body.email })
  if (isExist) {
    res.json({
      status: 'false',
      message: 'Email Already Exist !!',
    })
  }
  if (!isExist) {
    const result = await UserService.createCourse(req.body)

    res.json({
      status: 'false',
      message: 'Email Already Exist !!',
      data: result,
    })
  }
})

const login = catchAsync(async (req: Request, res: Response) => {
  try {
    const data: IUser = req.body
    //console.log("data:", data);
    if (!data.email || !data.password) {
      return res.json({ status: 'false', message: 'Invalid credendials' })
    }
    if (data.email && data.password) {
      const isExist = await UserModel.findOne({ email: data?.email })
      // console.log("isExist:", isExist);
      if (!isExist) {
        return res.json({ status: 'false', message: 'User not Found !' })
      }
      // check match password
      const isMatchPassword = await bcrypt.compare(
        data.password,
        isExist?.password
      )
      //  console.log("isMatchPassword:", isMatchPassword);
      if (!isMatchPassword) {
        return res.json({ status: 'false', message: 'Password is incorrect' })
      }
      // create jwt token
      const accessToken = jwt.sign(
        { userId: isExist._id, role: isExist.role, email: isExist.email },
        config.jwt.secret as Secret,
        { expiresIn: '1d' }
      ) // config.database_url as string
      return res.status(200).json({
        status: 'true',
        message: 'user signin successfully',
        token: accessToken,
      })
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: 'Something went to wrong' })
  }
})

const getCourses = catchAsync(async (req: Request, res: Response) => {
  if (req.user) {
    const { email }: any = req.user

    const result = await UserModel.findOne({ email: email }).select(
      'name email role'
    )

    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course retrive successfully !!',
      data: result,
    })
  }
})

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  try {
    console.log('User:', req.user)

    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrive successfully !!',
    })
  } catch (error) {
    console.log(error)
  }
})
export const UserController = {
  createCourse,
  login,
  getCourses,
  getSingleCourse,
}
