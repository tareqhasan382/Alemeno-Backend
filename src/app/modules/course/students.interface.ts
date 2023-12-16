import { Model } from 'mongoose'

export type ICourse = {
  id?: string
  name: string
  instructor: string
  description: string
  enrollmentStatus: 'Open' | 'Closed' | 'In Progress'
  thumbnail: string
  duration: string
  schedule: string
  location: string
  likes: string[]
  prerequisites: string[]
  syllabus: {
    week: number
    topic: string
    content: string
  }[]
}

export type ICourseModel = Model<ICourse, Record<string, unknown>>
