import { Schema, model } from 'mongoose'
import { IUser, IUserModel } from './user.interface'
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
)
userSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(this.password, 13)
  next()
})
const UserModel = model<IUser, IUserModel>('users', userSchema)
export default UserModel
