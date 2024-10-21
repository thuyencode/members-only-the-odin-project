import type e from 'express'

const handleSignOutRequest = (req: e.Request, res: e.Response) => {
  req.user = undefined

  res.clearCookie('refresh_token').send()
}

const SignOutController = {
  handleSignOutRequest
}

export default SignOutController
