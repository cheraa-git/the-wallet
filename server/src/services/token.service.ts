import dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
import { Token } from '../models/Token'


dotenv.config()

const TOKEN_SECRET = process.env.TOKEN_SECRET || ''
const REFRESH_SECRET = process.env.REFRESH_SECRET || ''

class TokenService {
  generate(userId: string) {
    const accessToken = jwt.sign({ _id: userId }, TOKEN_SECRET, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ _id: userId }, REFRESH_SECRET)
    return { accessToken, refreshToken, expiresIn: 3600 }
  }

  async save(userId: string, refreshToken: string) {
    const data = await Token.findOne({ userId })
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }
    return await Token.create({ userId, refreshToken })
  }

  async generateAndSave(userId: string) {
    const tokens = this.generate(userId)
    await this.save(userId, tokens.refreshToken)
    return tokens
  }

}

export const tokenService = new TokenService()
