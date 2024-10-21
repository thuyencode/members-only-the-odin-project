import e from 'express'
import ProtectedMessagesController from './messages.controller'

const protected_messages_routes = e.Router()

protected_messages_routes.post(
  '/',
  ProtectedMessagesController.handleNewMessageRequest
)
protected_messages_routes.delete(
  '/:id',
  ProtectedMessagesController.handleMessageDeletionRequest
)

export default protected_messages_routes
