import { Application } from 'express'
import rulesRouter from './api/controllers/rules/router'
export default function routes(app: Application): void {
  app.use('/api/v1/rules', rulesRouter)
}
