import Users from '@/server/db/users.db'
import BadRequest from '@/server/errors/BadRequest'
import { generateTokens } from '@/server/libs/utils/auth'
import { SignUpSchema } from '@/shared/schemas/auth.schema'
import { hash } from '@node-rs/bcrypt'
import expressAsyncHandler from 'express-async-handler'
import * as v from 'valibot'

const handleSignUpRequest = expressAsyncHandler(async (req, res) => {
  try {
    const signUpInput = v.parse(SignUpSchema, req.body)

    const user = await Users.selectByUsername(signUpInput.username)

    if (user) {
      throw new BadRequest(
        `Username '${signUpInput.username}' is already existed`
      )
    }

    const newUser = await Users.insert({
      ...signUpInput,
      salted_hash: await hash(signUpInput.password, 10)
    })

    const { refreshToken, accessToken } = generateTokens(newUser)

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

const SignUpController = {
  handleSignUpRequest
}

export default SignUpController
