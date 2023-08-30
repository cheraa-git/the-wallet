import { User } from '../models/User'
import { ControllerHandler } from '../types/types'
import { ErrorMessages } from '../../../common/errorMessages'
import Dto from '../utils/dto'

class UserController {
  update: ControllerHandler = async (req, res) => {
    try {
      const { userId } = req.params
      const { user } = req.body
      if (userId && userId === req.user?._id) {
        const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true })
        if (!updatedUser) {
          return res.status(404).send({ message: ErrorMessages.USER_NOT_FOUND })
        }
        res.send(Dto.user(updatedUser))
      } else {
        res.status(401).json({ message: ErrorMessages.UNAUTHORIZED })
      }
    } catch (error) {
      res.status(500).send({ message: ErrorMessages.UNEXPECTED_ERROR, data: error })
    }
  }
}

export const userController = new UserController()
