import { Application } from 'express'
import rulesRouter from './api/controllers/rules/router'
import playersRouter from './api/controllers/players/router'

export default function routes(app: Application): void {
  app.use('/api/v1/rules', rulesRouter)
  app.use('/api/v1/players', playersRouter)
}
