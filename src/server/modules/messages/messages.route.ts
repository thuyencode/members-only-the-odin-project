import e from 'express'
import MessagesController from './messages.controller'

const get_messages_routes = e.Router()

get_messages_routes.get('/', MessagesController.getAllMessages)
get_messages_routes.get('/:id', MessagesController.getMessageById)

export default get_messages_routes
