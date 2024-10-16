import e from 'express'
import { handleSignOutRequest } from './sign-out.controller'

const sign_out_routes = e.Router()

sign_out_routes.post('/', handleSignOutRequest)

export default sign_out_routes
