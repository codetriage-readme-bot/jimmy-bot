const mongoose = require('mongoose')
const mocha = require('mocha')
const expect = require('chai').expect
const sleep = require('system-sleep')

describe('think package', function () {
  const think = require('./think')
  it('should exist', function () {
    expect(think).to.exist
  })
  describe('help options', function () {
    it('help', function (done) {
      think('help', null, function (res) {
        expect(res).to.exist
        expect(res).length > 10
        expect(res.search('task')).to.not.equal(-1)
        done()
      })
    })
    it('what can you do', function (done) {
      think('help', null, function (res) {
        expect(res).to.exist
        expect(res).length > 10
        expect(res.search('task')).to.not.equal(-1)
        done()
      })
    })
    it('hey what can you do', function (done) {
      think('help', null, function (res) {
        expect(res).to.exist
        expect(res).length > 10
        expect(res.search('task')).to.not.equal(-1)
        done()
      })
    })
  }) //-- done help opts
  describe('meet and greet', function () {
    it('hi', function (done) {
      think('hi', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search('hey')).to.not.equal(-1)
        done()
      })
    })
    it('hey', function (done) {
      think('hey', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search('hey')).to.not.equal(-1)
        done()
      })
    })
    it('hello', function (done) {
      think('hey', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search('hey')).to.not.equal(-1)
        done()
      })
    })
    it('watsup', function (done) {
      think('hey', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search('hey')).to.not.equal(-1)
        done()
      })
    })
  }) //-- done meet and greet
  describe('shock/joy', function () {
    it('damn', function (done) {
      think('damn', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search('swag')).to.not.equal(-1)
        done()
      })
    })
    it('thats cool', function (done) {
      think('thats cool', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search('swag')).to.not.equal(-1)
        done()
      })
    })
    it('wow', function (done) {
      think('wow', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search('swag')).to.not.equal(-1)
        done()
      })
    })
    it('amazing', function (done) {
      think('amazing', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search('swag')).to.not.equal(-1)
        done()
      })
    })
  }) // -- done wiht joy
  describe('task creation', function () {
    it('tell test_person to test_task', function (done) {
      think('tell test_person to test_task', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search('telling')).to.not.equal(-1)
        done()
      })
    })
  })
  describe('list not completed tasks', function () {
    it('list tasks', function (done) {
      think('list tasks', null, function (res) {
        expect(res).to.exist
        expect(res.length).to.not.equal(0)
        expect(res.search(':')).to.not.equal(-1)
        done()
      })
    })
  })
  describe('list completed tasks', function () {
    it('list completed', function (done) {
      this.timeout(4000)
      think('list completed', null, function (res) {
        expect(res).to.exist
        expect(res.search(':')).to.not.equal(-1)
        expect(res).to.have.length.above(2)
        done()
      })
    })
  })
  describe('complete specific task', function () {
    it('done with test_task', function (done) {
      think('done with test_task', null, function (res) {
        expect(res).to.contain('finished test_task')
        done()
      })
    })
  })
  describe('farewell', function () {
    it('cya', function (done) {
      think('cya', null, function (res) {
        expect(res).to.contain('aligator')
        done()
      })
    })
  })
})
