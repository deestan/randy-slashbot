var randy = require('randy');

module.exports = {
  d: function(sidesStr) {
    var sides = parseInt(sidesStr, 10);
    if (!sides)
      throw new Error('d <sides>');
    return randy.randInt(sides);
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
  }
}
