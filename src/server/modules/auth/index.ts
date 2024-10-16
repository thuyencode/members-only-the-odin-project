import e from 'express'
import sign_in_routes from './sign-in'
import sign_out_routes from './sign-out'
import sign_up_routes from './sign-up'

const auth_routes = e.Router()

auth_routes.use('/sign-in', sign_in_routes)
auth_routes.use('/sign-out', sign_out_routes)
auth_routes.use('/sign-up', sign_up_routes)

export default auth_routes
