// Jest file that transform unrecognizable `require` statements to something known.
// Eg: require('logo.svg') => 'logo.svg'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  process(src, filename, config, options) {
    return `module.exports = '${path.basename(filename)}';`;
  }
};
