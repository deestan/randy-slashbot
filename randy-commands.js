var randy = require('randy');

module.exports = {
  d: function(sidesStr, callback) {
    var sides = parseInt(sidesStr, 10);
    if (!sides)
      return callback('d <sides>');
    callback(null, randy.randInt(sides) + 1);
  },

  int: function(args, callback) {
    var syntaxError = 'int [min] <max>';
    if (!args.length || args.length > 2)
      return callback(syntaxError);
    for (var i=0; i < args.length; i++)
      if (!/^\d+$/.test(args[i]))
        return callback(syntaxError);
    var max = parseInt(args.pop(), 10);
    var min = parseInt(args.pop(), 10) || 0;
    return callback(null, randy.randInt(min, max));
  },

  choice: function(stuffs, callback) {
    if (!stuffs.length)
      return callback('choose [item1] [item2]...');
    callback(null, randy.choice(stuffs));
  },

  shuffle: function(stuffs, callback) {
    if (!stuffs.length)
      return callback('shuffle [item1] [item2]...');
    callback(null, randy.shuffle(stuffs).join(" "));
  },

  sample: function(stuffs, callback) {
    var count = parseInt(stuffs.shift(), 10);
    if (!stuffs.length || !count)
      return callback('sample <count> [item1] [item2]...');
    callback(null, randy.sample(stuffs, count).join(" "));
  },

  uniform: function(args, callback) {
    var syntaxError = 'uniform | uniform <max> | uniform <min> <max>';
    if (args.length > 2)
      return callback(syntaxError);
    for (var i=0; i < args.length; i++)
      if (!/^\d*\.?\d*$/.test(args[i]))
        return callback(syntaxError);
    var max = parseFloat(args.pop()) || 1;
    var min = parseFloat(args.pop()) || 0;
    callback(null, randy.uniform(min, max));
  },

  triangular: function(args, callback) {
    var syntaxError = 'triangular <min> <max> [mode]';
    if (args.length > 3)
      return callback(syntaxError);
    for (var i=0; i < args.length; i++)
      if (!/^\d*\.?\d*$/.test(args[i]))
        return callback(syntaxError);
    var min = parseFloat(args.shift());
    var max = parseFloat(args.shift());
    var mode = (min + max) / 2;
    if (args.length)
      mode = parseFloat(args.shift());
    callback(null, randy.triangular(min, max, mode));
  }
}
