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
  }
}
