/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import EnrollModel from './enroll.model'
import mongoose from 'mongoose'

const createEnroll = catchAsync(async (req: Request, res: Response) => {
  try {
    const { userId }: any = req.user
    const courseId = req.body.data
    const payload = {
      userId: userId,
      courseId: courseId,
    }

    if (userId && courseId) {
      await EnrollModel.create(payload)

      res.json({
        status: 'true',
        message: 'Enrolled created successfully !!',
      })
    }
  } catch (error) {
    res.json({
      status: 'false',
      message: 'Server Error !!',
    })
  }
})

const getEnroll = catchAsync(async (req: Request, res: Response) => {
  try {
    const { userId }: any = req.user
    const result = await EnrollModel.find({
      userId: new mongoose.Types.ObjectId(userId),
    })
      .populate('courseId')
      .select('courseId')
      .exec()
    res.json({
      status: 'true',
      message: 'Enroll retrive successfully !!',
      data: result,
    })
    // console.log('Result', result)
  } catch (error) {
    res.json({
      status: 'false',
      message: 'Server Error !!',
    })
  }
})

export const EnrollController = {
  createEnroll,
  getEnroll,
}
