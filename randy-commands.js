var randy = require('randy');

module.exports = {
  d: function(sidesStr) {
    var sides = parseInt(sidesStr, 10);
    if (!sides)
      throw new Error('d <sides>');
    return randy.randInt(sides) + 1;
  },

  choice: function(stuffs) {
    if (!stuffs.length)
      throw new Error('choose [item1] [item2]...');
    return randy.choice(stuffs);
  },

  shuffle: function(stuffs) {
    if (!stuffs.length)
      throw new Error('shuffle [item1] [item2]...');
    return randy.shuffle(stuffs).join(" ");
  },

  sample: function(stuffs) {
    var count = parseInt(stuffs.shift(), 10);
    if (!stuffs.length || !count)
      throw new Error('sample <count> [item1] [item2]...');
    return randy.sample(stuffs, count).join(" ");
  },

  uniform: function(args) {
    var syntaxError = new Error('uniform | uniform <max> | uniform <min> <max>');
    if (args.length > 2)
      throw syntaxError;
    args.forEach(function(x) { if (!/^\d*\.?\d*$/.test(x)) throw syntaxError; });
    var max = parseFloat(args.pop()) || 1;
    var min = parseFloat(args.pop()) || 0;
    return randy.uniform(min, max);
  },

  triangular: function(args) {
    var syntaxError = new Error('triangular <min> <max> [mode]');
    if (args.length > 3)
      throw syntaxError;
    args.forEach(function(x) { if (!/^\d*\.?\d*$/.test(x)) throw syntaxError; });
    var min = parseFloat(args.shift());
    var max = parseFloat(args.shift());
    var mode = (min + max) / 2;
    if (args.length)
      mode = parseFloat(args.shift());
    return randy.triangular(min, max, mode);
  }
}
