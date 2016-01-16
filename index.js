'use strict'

var updateNotifier = require('update-notifier')
var wrap = require('word-wrap')

function isHelp (arg) {
  return arg === '-h' || arg === '--help'
}

function hasHelpArgument (args) {
  return args.some(isHelp)
}

function noArguments (minLength, args) {
  console.assert(Array.isArray(args), 'missing arguments')
  return args.length < minLength
}

function getPackage (options) {
  var pkg = options.pkg || options.package

  if (!pkg && options.packagePath) {
    pkg = require(options.packagePath)
  }

  return pkg
}

function showHelp (options) {
  var helpMessage = options.help || options.helpMessage

  var pkg = getPackage(options)

  var pkgInfo
  if (pkg) {
    pkgInfo = pkg.name ? pkg.name : ''
    if (pkg.version) {
      pkgInfo += '@' + pkg.version
    }
    if (pkg.description) {
      pkgInfo += '\n' + wrap(pkg.description, { width: 60, indent: ' > ' })
    }
  }

  if (pkgInfo) {
    console.log(pkgInfo)
  }
  if (helpMessage) {
    console.log(helpMessage)
  }
  if (!pkgInfo && !helpMessage) {
    console.log('Incorrect CLI arguments')
    if (pkg && pkg.name) {
      console.log('Check out instructions for this module using `npm home ' + pkg.name + '`')
    }
  }
}

function finish (options) {
  if (options.noExit) {
    return false
  }
  process.exit(0)
}

function simpleBinHelp (options, cliArguments) {
  console.assert(options, 'missing options')

  if (!cliArguments) {
    cliArguments = process.argv
  }

  if (hasHelpArgument(cliArguments)) {
    showHelp(options)
    finish(options)
    return true
  }

  var pkg = getPackage(options)
  if (pkg && pkg.name && pkg.version) {
    updateNotifier({ pkg: pkg }).notify()
  }

  var minArguments = options.minArguments ||
    options.min ||
    options.n

  if (noArguments(minArguments, cliArguments)) {
    showHelp(options)

    if (typeof options.onFail === 'function') {
      options.onFail()
    }

    return finish(options)
  }

  return true
}

module.exports = simpleBinHelp
