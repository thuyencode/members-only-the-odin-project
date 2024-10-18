import Users from '@/server/db/users.db'
import BadRequest from '@/server/errors/BadRequest'
import env from '@/server/libs/utils/env'
import { SignUpSchema } from '@/shared/schemas/auth.schema'
import { hash } from '@node-rs/bcrypt'
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import * as v from 'valibot'

export const handleSignUpRequest = expressAsyncHandler(async (req, res) => {
  try {
    const signUpInput = v.parse(SignUpSchema, req.body)

    const user = await Users.selectByUsername(signUpInput.username)

    if (user) {
      throw new BadRequest(
        `Username '${signUpInput.username}' is already existed`
      )
    }

    const newUser = await Users.insertUser({
      ...signUpInput,
      salted_hash: await hash(signUpInput.password, 10)
    })

    const refreshToken = jwt.sign(
      { ...newUser, salted_hash: undefined },
      env.JWT_SECRET,
      { expiresIn: '90 days' }
    )

    res.cookie('refresh_token', refreshToken, { httpOnly: true }).send()
  } catch (error) {
    if (v.isValiError(error)) {
      const issues = v.flatten(error.issues).nested

      throw new BadRequest(issues)
    }

    throw error
  }
})
