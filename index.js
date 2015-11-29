function noArguments(minLength, args) {
  console.assert(Array.isArray(args), 'missing arguments');
  return args.length < minLength;
}

function showHelp(options) {
  var helpMessage = options.help || options.helpMessage;

  var pkg;
  if (options.package) {
    pkg = options.package;
  } else if (options.packagePath) {
    pkg = require(options.packagePath);
  }

  var pkgInfo;
  if (pkg) {
    pkgInfo = pkg.name + '@' + pkg.version + ' - ' + pkg.description;
    pkgInfo += '\nis used incorrectly, check out instructions `manpm ' + pkg.name + '`';
  }

  if (pkgInfo) {
    console.log(pkgInfo);
  }
  if (helpMessage) {
    console.log(helpMessage);
  }
  if (!pkgInfo && !helpMessage) {
    console.log('Incorrect CLI arguments');
  }
}

function simpleBinHelp(options, cliArguments) {
  console.assert(options, 'missing options');

  if (!cliArguments) {
    cliArguments = process.argv;
  }

  var minArguments = options.minArguments ||
    options.min ||
    options.n;
  if (noArguments(minArguments, cliArguments)) {
    showHelp(options);
    if (options.exit) {
      process.exit(0);
    } else {
      return false;
    }
  }

  return true;
}

module.exports = simpleBinHelp;
