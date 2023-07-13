import { Request, Response } from 'express'
import { User } from '../models/User'
import { ErrorMessages } from '../../../common/errorMessages'
import bcrypt from 'bcrypt'
import { tokenService } from '../services/token.service'
import { validationHandler } from '../utils/validation'
import Dto from '../utils/dto'

class AuthController {

  signUp = async (req: Request, res: Response) => {
    try {
      if (validationHandler(req, res)) return
      const { email, password, name, surname } = req.body
      const existingUser = await User.findOne({ email })
      if (existingUser) return res.status(400).send({ message: ErrorMessages.EMAIL_EXISTS })
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = await User.create({ email, password: hashedPassword, name, surname })
      const tokens = await tokenService.generateAndSave(newUser._id.toString())
      res.send({ tokens, user: Dto.user(newUser) })
    } catch (error) {
      res.send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  signIn = async (req: Request, res: Response) => {
    try {
      if (validationHandler(req, res)) return
      const { email, password } = req.body
      const existingUser = await User.findOne({ email })
      if (!existingUser) return res.status(400).send({ message: ErrorMessages.EMAIl_NOT_FOUND })
      const isPasswordEqual = await bcrypt.compare(password, existingUser.password)
      if (!isPasswordEqual) return res.status(400).send({ message: ErrorMessages.INVALID_PASSWORD })
      const tokens = await tokenService.generateAndSave(existingUser._id.toString())
      res.send({ tokens, user: Dto.user(existingUser) })
    } catch (error) {
      res.send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body
      const data = tokenService.validateRefresh(refreshToken)
      const dbToken = await tokenService.findToken(refreshToken)

      if (!data || !dbToken || data._id !== dbToken?.userId?.toString()) {
        return res.status(401).json({ message: ErrorMessages.UNAUTHORIZED })
      }
      const tokens = await tokenService.generateAndSave(data._id)
      res.status(200).send({ ...tokens })
    } catch (error) {
      res.send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }
}

export const authController = new AuthController()
