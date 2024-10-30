import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import e from 'express'
import helmet from 'helmet'
import ViteExpress from 'vite-express'
import env from './libs/utils/env'
import { error_handler, routes_protector } from './middlewares'
import {
  auth_routes,
  get_access_token_routes,
  get_messages_routes,
  protected_routes
} from './modules'

const PORT = env.PORT || 8080

const app = e()

// Compress data before sending
app.use(compression())

app.use(cookieParser(env.COOKIE_SECRET))

// Hardened http headers
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

// Support reading JSON and urlencoded
app.use(e.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
const api_routes = e.Router()

// GET messages route: /api/messages and /api/messages/:id
api_routes.use('/messages', get_messages_routes)

// GET access token route: /api/get-access-token
api_routes.use('/get-access-token', get_access_token_routes)

// Auth actions routes: /api/auth/*
api_routes.use('/auth', auth_routes)

// Protected (required auth) routes: /api/protected/*
api_routes.use('/protected', routes_protector, protected_routes)

// /api/*
app.use('/api', api_routes)

// Error catcher
app.use(error_handler)

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
)
