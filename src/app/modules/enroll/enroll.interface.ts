import { Model, Types } from 'mongoose'

export type IEnroll = {
  _id?: string
  userId: Types.ObjectId
  courseId: Types.ObjectId
}

export type IEnrollModel = Model<IEnroll, Record<string, unknown>>
