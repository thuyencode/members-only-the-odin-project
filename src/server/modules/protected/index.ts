import e from 'express'
import protected_messages_routes from './messages'

const protected_routes = e.Router()

protected_routes.use('/messages', protected_messages_routes)

export default protected_routes
