'use strict'

const updateNotifier = require('update-notifier')

function noArguments (minLength, args) {
  console.assert(Array.isArray(args), 'missing arguments')
  return args.length < minLength
}

function getPackage (options) {
  var pkg

  if (options.package) {
    pkg = options.package
  } else if (options.packagePath) {
    pkg = require(options.packagePath)
  }

  return pkg
}

function showHelp (options) {
  var helpMessage = options.help || options.helpMessage

  var pkg = getPackage(options)

  var pkgInfo
  if (pkg) {
    pkgInfo = pkg.name + '@' + pkg.version + '\n - ' + pkg.description
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

function simpleBinHelp (options, cliArguments) {
  console.assert(options, 'missing options')

  if (!cliArguments) {
    cliArguments = process.argv
  }

  var pkg = getPackage(options)
  if (pkg) {
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

    if (options.noExit) {
      return false
    }
    process.exit(0)
  }

  return true
}

module.exports = simpleBinHelp
