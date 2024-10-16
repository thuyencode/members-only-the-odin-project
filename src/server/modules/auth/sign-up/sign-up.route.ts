import e from 'express'
import { handleSignUpRequest } from './sign-up.controller'

const sign_up_routes = e.Router()

sign_up_routes.post('/', handleSignUpRequest)

export default sign_up_routes
