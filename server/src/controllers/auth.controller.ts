import { Request, Response } from 'express'
import { User } from '../models/User'
import { errorMessages } from '../../../common/errorMessages'
import bcrypt from 'bcrypt'
import { tokenService } from '../services/token.service'
import { IUser } from '../../../common/types/types'
import { validationHandler } from '../utils/validation'

class AuthController {

  signUp = async (req: Request, res: Response) => {
    try {
      if (validationHandler(req, res)) return
      const { email, password, name, surname } = req.body
      const existingUser = await User.findOne({ email })
      if (existingUser) return res.status(400).send({ message: errorMessages.EMAIL_EXISTS })
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = await User.create({ email, password: hashedPassword, name, surname })
      const tokens = await tokenService.generateAndSave(newUser._id.toString())
      const user: IUser = {
        _id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
        surname: newUser.surname,
        avatar: newUser.avatar
      }
      res.send({ tokens, user })
    } catch (error) {
      res.send({ message: errorMessages.UNEXPECTED_ERROR })
    }
  }

  signIn = async (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
  }

  refreshToken = async (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
  }
}

export const authController = new AuthController()
