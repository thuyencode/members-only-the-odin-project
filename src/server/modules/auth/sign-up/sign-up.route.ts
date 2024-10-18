import e from 'express'
import SignUpController from './sign-up.controller'

const sign_up_routes = e.Router()

sign_up_routes.post('/', SignUpController.handleSignUpRequest)

export default sign_up_routes
