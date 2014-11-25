'use strict';

module.exports = asyncify;

function asyncify(fn, context) {
  return function() {
    context = context || null;
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return function() {
      var called;
      var argsTmp = args.slice();
      var asyncArgs = new Array(arguments.length);
      for (var i = 0; i < asyncArgs.length; i++) {
        asyncArgs[i] = arguments[i];
      }
      if (asyncArgs.length === 0) {
        throw new Error('arguments error');
      }
      var done = asyncArgs.pop();
      if (typeof done !== 'function') {
        throw new TypeError('the last argument must be function');
      }
      Array.prototype.push.apply(argsTmp, asyncArgs);
      argsTmp.push(function() {
        // if done was has been called, not't call again
        if (called) return;
        called = true;
        done.apply(context, arguments);
      });
      try {
        fn.apply(context, argsTmp);
      } catch (err) {
        done(err);
      }
    };
  };
}