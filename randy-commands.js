var randy = require('randy');

module.exports = {
  d: function(sidesStr) {
    var sides = parseInt(sidesStr, 10);
    if (!sides)
      throw new Error('Unrecognized number of sides.');
    return randy.randInt(sides);
  }
}
