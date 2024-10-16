import Users from '@/server/db/users.db'
import BadRequest from '@/server/errors/BadRequest'
import env from '@/server/libs/utils/env'
import { SignInSchema } from '@/shared/schemas/auth.schema'
import bcrypt from '@node-rs/bcrypt'
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import * as v from 'valibot'

export const handleSignInRequest = expressAsyncHandler(async (req, res) => {
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

    const token = jwt.sign(
      { ...user, salted_hash: undefined },
      env.JWT_SECRET,
      { expiresIn: '1s' }
    )

    res.cookie('token', token, { httpOnly: true, signed: true }).send()
  } catch (error) {
    if (v.isValiError(error)) {
      const issues = v.flatten(error.issues).nested

      throw new BadRequest(issues)
    }

    throw error
  }
})
