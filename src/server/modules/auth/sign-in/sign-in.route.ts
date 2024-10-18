import e from 'express'
import SignInController from './sign-in.controller'

const sign_in_routes = e.Router()

sign_in_routes.post('/', SignInController.handleSignInRequest)

export default sign_in_routes
