import e from 'express'
import { handleSignInRequest } from './sign-in.controller'

const sign_in_routes = e.Router()

sign_in_routes.post('/', handleSignInRequest)

export default sign_in_routes
