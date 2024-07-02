import { Response } from 'express'

export const setTokens = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: false,
    sameSite: 'lax',
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: false,
    sameSite: 'lax',
  })
}
