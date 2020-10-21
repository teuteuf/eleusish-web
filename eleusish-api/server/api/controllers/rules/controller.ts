import RulesService from '../../services/rules.service'
import { Request, Response } from 'express'
import { UnknownPlayerError } from '../../domain/players/errors'
import { RuleToValidateError } from '../../domain/rules/errors'

export class Controller {
  async all(req: Request, res: Response): Promise<void> {
    const rulesFilter = {
      validated: (req.query.validated as unknown) as boolean | undefined,
      authorId: req.query.authorId?.toString(),
    }
    const allRules = await RulesService.all(rulesFilter)
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
      if (e instanceof UnknownPlayerError) {
        res.status(400).send(e.message)
      } else if (e instanceof RuleToValidateError) {
        res.status(403).send(e.message)
      } else {
        res.status(400).send(e.message)
      }
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = req.params['id']
    const { validated, code, ...otherFields } = req.body

    if (
      (validated == null && code == null) ||
      Object.keys(otherFields).length !== 0
    ) {
      res.status(406).send("Can't update given fields.")
    }

    try {
      let rule
      if (validated != null) {
        rule = await RulesService.validate(id, validated)
      }
      if (code != null) {
        rule = await RulesService.updateCode(id, code)
      }
      res.status(200).send(rule)
    } catch (e) {
      res.status(404).send(e.message)
    }
  }
}

export default new Controller()
