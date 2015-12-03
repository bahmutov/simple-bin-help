var la = require('lazy-ass')
var check = require('check-more-types')

/* global describe, it */
describe('simple bin help', function () {
  var simpleHelp = require('..')
  it('is a function', function () {
    la(check.fn(simpleHelp))
  })

  it('is successful', function () {
    var options = {
      minArguments: 2
    }
    var cliArguments = ['foo', 'bar', 'baz']
    la(simpleHelp(options, cliArguments))
  })

  it('checks number of arguments', function () {
    var options = {
      minArguments: 10,
      noExit: true
    }
    var cliArguments = ['foo', 'bar', 'baz']
    la(!simpleHelp(options, cliArguments))
  })

  it('calls provided method on fail', function () {
    var called
    function onFail () {
      called = true
    }
    var options = {
      minArguments: 1,
      noExit: true,
      onFail: onFail
    }
    var cliArguments = []
    la(!simpleHelp(options, cliArguments), 'not enough arguments')
    la(called, 'onFail called')
  })

  it('can show help with -h', function () {
    var options = {
      noExit: true
    }
    var cliArguments = ['-h']
    la(simpleHelp(options, cliArguments))
  })

  it('can show help with --help', function () {
    var options = {
      noExit: true
    }
    var cliArguments = ['--help']
    la(simpleHelp(options, cliArguments))
  })
})
