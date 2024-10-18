import e from 'express'
import SignOutController from './sign-out.controller'

const sign_out_routes = e.Router()

sign_out_routes.post('/', SignOutController.handleSignOutRequest)

export default sign_out_routes
