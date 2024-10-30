import Users from '@/server/db/users.db'
import BadRequest from '@/server/errors/BadRequest'
import { generateTokens } from '@/server/libs/utils/jwt'
import { SignInSchema } from '@/shared/schemas/auth.schema'
import bcrypt from '@node-rs/bcrypt'
import expressAsyncHandler from 'express-async-handler'
import * as v from 'valibot'

const handleSignInRequest = expressAsyncHandler(async (req, res) => {
  try {
    const signInInput = v.parse(SignInSchema, req.body)

    const user = await Users.selectByUsername(signInInput.username)

    if (!user) {
      throw new BadRequest(`Username '${signInInput.username}' doesn't existed`)
    }

    const isSubmittedPasswordCorrect = await bcrypt.compare(
      signInInput.password,
      user.salted_hash
    )

    if (!isSubmittedPasswordCorrect) {
      throw new BadRequest(`Incorrect password`)
    }

    const { refreshToken, accessToken } = generateTokens(user)

    res
      .cookie('refresh_token', refreshToken, { httpOnly: true, signed: true })
      .json({ accessToken })
  } catch (error) {
    if (v.isValiError(error)) {
      const issues = v.flatten(error.issues).nested

      throw new BadRequest(issues)
    }

    throw error
  }
})

const SignInController = {
  handleSignInRequest
}

export default SignInController
