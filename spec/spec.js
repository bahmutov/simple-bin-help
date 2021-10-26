const { lazyAss: la } = require('lazy-ass')
const check = require('check-more-types')

/* global describe, it */
describe('simple bin help', function () {
  const simpleHelp = require('..')
  it('is a function', function () {
    la(check.fn(simpleHelp))
  })

  it('is successful', function () {
    const options = {
      minArguments: 2
    }
    const cliArguments = ['foo', 'bar', 'baz']
    la(simpleHelp(options, cliArguments))
  })

  it('checks number of arguments', function () {
    const options = {
      minArguments: 10,
      noExit: true
    }
    const cliArguments = ['foo', 'bar', 'baz']
    la(!simpleHelp(options, cliArguments))
  })

  it('calls provided method on fail', function () {
    let called
    function onFail () {
      called = true
    }
    const options = {
      minArguments: 1,
      noExit: true,
      onFail
    }
    const cliArguments = []
    la(!simpleHelp(options, cliArguments), 'not enough arguments')
    la(called, 'onFail called')
  })

  it('can show help with -h', function () {
    const options = {
      noExit: true
    }
    const cliArguments = ['-h']
    la(simpleHelp(options, cliArguments))
  })

  it('can show help with --help', function () {
    const options = {
      noExit: true
    }
    const cliArguments = ['--help']
    la(simpleHelp(options, cliArguments))
  })
})
