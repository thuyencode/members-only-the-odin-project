import e from 'express'
import GetAccessTokenController from './get-access-token.controller'

const get_access_token_routes = e.Router()

get_access_token_routes.get('/', GetAccessTokenController.getNewAccessToken)

export default get_access_token_routes
