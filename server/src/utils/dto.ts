import { UserModelType } from '../models/User'
import { IUser } from '../../../common/types/types'


class DTO {
  user(user: UserModelType): IUser {
    return {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      surname: user.surname,
      avatar: user.avatar
    }
  }
}

export default new DTO()
