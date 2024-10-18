import type e from 'express'

const handleSignOutRequest = (_: e.Request, res: e.Response) => {
  res.clearCookie('refresh_token').send()
}

const SignOutController = {
  handleSignOutRequest
}

export default SignOutController
