import express from 'express'
import controller from './controller'

export default express
  .Router()
  .get('/godName', controller.generateGodName)
  .post('/', controller.create)
  .get('/', controller.all)
  .get('/:id', controller.byId)
  .patch('/:id', controller.update)
