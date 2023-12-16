import { Schema, model } from 'mongoose'
import { ICourse, ICourseModel } from './students.interface'

const courseSchema = new Schema<ICourse>(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    enrollmentStatus: {
      type: String,
      enum: ['Open', 'Closed', 'In Progress'],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    likes: [String],
    prerequisites: [String],
    syllabus: [
      {
        week: Number,
        topic: String,
        content: String,
      },
    ],
  },
  { timestamps: true }
)

const CourseModel = model<ICourse, ICourseModel>('course', courseSchema)
export default CourseModel
