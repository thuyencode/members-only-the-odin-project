import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import e from 'express'
import helmet from 'helmet'
import ViteExpress from 'vite-express'
import env from './libs/utils/env'
import { error_handler } from './middlewares'
import routes_protector from './middlewares/routes_protector'
import auth_routes from './modules/auth'

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

// Protected routes: /api/protected/*
api_routes.use('/protected', routes_protector, (req, res) => {
  res.send()
})

// Auth actions routes: /api/auth/*
api_routes.use('/auth', auth_routes)

// /api/*
app.use('/api', api_routes)

// Error catcher
app.use(error_handler)

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
)
