/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import jwt, { Secret } from 'jsonwebtoken'
import config from '../../config'
export const authVerify =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log('requiredRoles ', requiredRoles)
    try {
      //1 get authorization token
      const token = req.headers.authorization
      // console.log('Token:', token)
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized')
      }

      //2 verify token
      // verify token
      let vefifiedUser = null
      vefifiedUser = jwt.verify(token, config.jwt.secret as Secret)
      // console.log('verifyed role ', vefifiedUser)
      req.user = vefifiedUser // role , userId
      const { role }: any = vefifiedUser

      // role authorise
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }
      // if (requiredRoles !== role) {
      //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      // }
      // console.log('Check verifyed role ', role)
      next()
    } catch (error) {
      next(error)
    }
  }
