import compression from 'compression'
import e from 'express'
import helmet from 'helmet'
import ViteExpress from 'vite-express'
import env from './lib/utils/env'

const PORT = env.PORT || 8080

const app = e()

app.use(e.json())

app.use(compression())

app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
)
