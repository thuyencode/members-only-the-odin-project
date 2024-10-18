import expressAsyncHandler from 'express-async-handler'

export const handleSignOutRequest = expressAsyncHandler(async (_, res) => {
  res.clearCookie('refresh_token').send()
})
