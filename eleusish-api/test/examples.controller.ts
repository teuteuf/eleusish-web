import 'mocha'
import { expect } from 'chai'
import request from 'supertest'
import Server from '../server'

describe('Examples', () => {
  it('should get all rules', () =>
    request(Server)
      .get('/api/v1/rules')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body).to.be.an('array').of.length(2)
      }))

  it('should add a new example', () =>
    request(Server)
      .post('/api/v1/rules')
      .send({ name: 'test' })
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test')
      }))

  it('should get an example by id', () =>
    request(Server)
      .get('/api/v1/rules/2')
      .expect('Content-Type', /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('name')
          .equal('test')
      }))
})
