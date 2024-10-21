import Messages from '@/server/db/messages.db'
import Users from '@/server/db/users.db'
import BadRequest from '@/server/errors/BadRequest'
import Unauthorized from '@/server/errors/Unauthorized'
import { NewMessageInputSchema } from '@/shared/schemas/message.schema'
import expressAsyncHandler from 'express-async-handler'
import { HttpStatus } from 'http-status-ts'
import * as v from 'valibot'

const handleNewMessageRequest = expressAsyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      throw new Unauthorized()
    }

    const newMessageInput = v.parse(NewMessageInputSchema, req.body)

    const user = await Users.selectById(req.user.id)

    if (!user) {
      throw new BadRequest(`User with id '${req.user.id}' doesn't existed`)
    }

    const message = await Messages.insert({
      ...newMessageInput,
      user_id: req.user.id
    })

    res.status(HttpStatus.CREATED).json(message)
  } catch (error) {
    if (v.isValiError(error)) {
      const issues = v.flatten(error.issues).nested

      throw new BadRequest(issues)
    }

    throw error
  }
})

const handleMessageDeletionRequest = expressAsyncHandler(async (req, res) => {
  try {
    const id = v.parse(
      v.pipe(v.number(), v.integer(), v.minValue(1)),
      Number(req.params.id)
    )

    const message = await Messages.selectById(id)

    if (!message) {
      throw new BadRequest(`Message with id '${id}' doesn't existed`)
    }

    const deletedMessage = Messages.deleteById(id)

    res.json({ message: deletedMessage })
  } catch (error) {
    if (v.isValiError(error)) {
      throw new BadRequest(error.issues[0].message)
    }

    throw error
  }
})

const ProtectedMessagesController = {
  handleNewMessageRequest,
  handleMessageDeletionRequest
}

export default ProtectedMessagesController
