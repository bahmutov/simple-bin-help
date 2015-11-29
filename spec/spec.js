var la = require('lazy-ass');
var check = require('check-more-types');

describe('simple bin help', function () {
  var simpleHelp = require('..');
  it('is a function', function () {
    la(check.fn(simpleHelp));
  });

  it('is successful', function () {
    var options = {
      minArguments: 2
    };
    var cliArguments = ['foo', 'bar', 'baz'];
    la(simpleHelp(options, cliArguments));
  });

  it('checks number of arguments', function () {
    var options = {
      minArguments: 10,
      noExit: true
    };
    var cliArguments = ['foo', 'bar', 'baz'];
    la(!simpleHelp(options, cliArguments));
  });
});
