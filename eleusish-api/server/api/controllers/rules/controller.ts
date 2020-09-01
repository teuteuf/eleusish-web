import RulesService from '../../services/rules.service'
import { Request, Response } from 'express'

export class Controller {
  async all(req: Request, res: Response): Promise<void> {
    const allRules = await RulesService.all()
    res.json(allRules)
  }

  async byId(req: Request, res: Response): Promise<void> {
    const id = req.params['id']
    const rule = await RulesService.byId(id)

    if (rule) {
      res.json(rule)
    } else {
      res.status(404).end()
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const { authorId, code } = req.body
    try {
      const rule = await RulesService.create(authorId, code)
      res.status(201).location(`/api/v1/rules/${rule.id}`).json(rule)
    } catch (e) {
      res.status(400).send(e.message)
    }
  }
}

export default new Controller()
