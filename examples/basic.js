'use strict'

var simpleBinHelp = require('simple-bin-help')

var options = {
  noExit: true,
  help: 'basic example help',
  minArguments: 3,
  pkg: {}
}
console.log('min arguments 3, calling with empty package')
simpleBinHelp(options)

options = {
  noExit: true,
  help: 'has package object',
  minArguments: 3,
  pkg: {
    name: 'basic-example',
    version: '1.0.0-dev'
  }
}
console.log('min arguments 3, calling with package')
simpleBinHelp(options)

var join = require('path').join
options = {
  noExit: true,
  help: 'basic example, path to real package.json',
  minArguments: 3,
  packagePath: join(__dirname, '..', 'package.json'),
  onFail: function () {
    console.log('fail callback, show extra info')
  }
}
console.log('real package.json path')
simpleBinHelp(options)
