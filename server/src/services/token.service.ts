import dotenv from 'dotenv'
import { Token } from '../models/Token'
import { JwtPayload, sign, verify } from 'jsonwebtoken'


dotenv.config()

const TOKEN_SECRET = process.env.TOKEN_SECRET || ''
const REFRESH_SECRET = process.env.REFRESH_SECRET || ''

class TokenService {
  generate(userId: string) {
    const accessToken = sign({ _id: userId }, TOKEN_SECRET, { expiresIn: '1h' })
    const refreshToken = sign({ _id: userId }, REFRESH_SECRET)
    return { accessToken, refreshToken, expiresIn: 3600, userId }
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

  validateRefresh(refreshToken: string) {
    try {
      const payload = verify(refreshToken, REFRESH_SECRET) as JwtPayload
      return { _id: payload._id }
    } catch (error) {
      return null
    }
  }

  validateAccess(accessToken: string) {
    try {
      const payload = verify(accessToken, TOKEN_SECRET) as JwtPayload
      return { _id: payload._id }
    } catch (error) {
      return null
    }
  }

  async findToken(refreshToken: string) {
    try {
      return await Token.findOne({ refreshToken })
    } catch (error) {
      return null
    }
  }

}

export const tokenService = new TokenService()
