/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import { CourseService } from './students.service'
import { ICourse } from './students.interface'
import CourseModel from './students.model'

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.createCourse(req.body)

  sendResponse<ICourse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully!',
    data: result,
  })
})

const getCourses = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const result = await CourseService.getCourse()

  res.status(200).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrive successfully !!',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await CourseModel.findOne({ _id: id })
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course retrive successfully !!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
})
export const CourseController = {
  createCourse,
  getCourses,
  getSingleCourse,
}
