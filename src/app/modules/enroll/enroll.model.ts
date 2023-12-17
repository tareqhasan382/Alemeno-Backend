import { Schema, model } from 'mongoose'
import { IEnroll, IEnrollModel } from './enroll.interface'

const enrollSchema = new Schema<IEnroll>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },

    courseId: { type: Schema.Types.ObjectId, ref: 'course' },
  },
  { timestamps: true }
)
const EnrollModel = model<IEnroll, IEnrollModel>('Enroll', enrollSchema)
export default EnrollModel
