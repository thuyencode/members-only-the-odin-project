import Messages from '@/server/db/messages.db'
import { NotFound } from '@/server/errors'
import BadRequest from '@/server/errors/BadRequest'
import env from '@/server/libs/utils/env'
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import * as v from 'valibot'

const getAllMessages = expressAsyncHandler(async (req, res) => {
  try {
    let messages = await Messages.selectJoinUsersTable()

    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) {
      messages = messages.map((message) => ({
        ...message,
        name: 'Anonymous',
        username: 'anonymous'
      }))
    } else {
      const decoded = jwt.verify(accessToken, env.JWT_SECRET)

      if (typeof decoded === 'string') {
        throw new BadRequest("jwt doesn't contains needed info")
      }
    }

    res.json({ messages })
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new BadRequest(error)
    }

    throw error
  }
})

const getMessageById = expressAsyncHandler(async (req, res) => {
  try {
    const id = v.parse(
      v.pipe(v.number(), v.integer(), v.minValue(1)),
      Number(req.params.id)
    )

    let message = await Messages.selectByIdJoinUsersTable(id)

    if (!message) {
      throw new NotFound()
    }

    const accessToken = req.headers.authorization?.split(' ')[1]

    console.log('Here')

    if (!accessToken) {
      message = { ...message, name: 'Anonymous', username: 'anonymous' }
    } else {
      const decoded = jwt.verify(accessToken, env.JWT_SECRET)

      if (typeof decoded === 'string') {
        throw new BadRequest("jwt doesn't contains needed info")
      }
    }

    res.json(message)
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new BadRequest(error)
    }

    if (v.isValiError(error)) {
      throw new BadRequest(error.issues[0].message)
    }

    throw error
  }
})

const MessagesController = {
  getAllMessages,
  getMessageById
}

export default MessagesController
