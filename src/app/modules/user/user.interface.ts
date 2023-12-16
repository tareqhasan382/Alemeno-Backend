import { Model, Types } from 'mongoose'

export type IUser = {
  _id?: string
  name: string
  role: 'user' | 'admin'
  email: string
  password: string
  gender: string
  enroll: Types.ObjectId
}

export type IUserModel = Model<IUser, Record<string, unknown>>
// enroll: Types.ObjectId
// enroll: { type: Schema.Types.ObjectId, ref: 'users', required: true },

export enum ENUM_ROLE {
  ADMIN = 'admin',
  USER = 'user',
}
