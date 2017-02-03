var Keyboard = require('./lib/Keyboard');
var KeyboardButton = require('./lib/KeyboardButton');
var KeyboardedInput = require('./lib/KeyboardedInput');

module.exports.Keyboard = Keyboard.default || Keyboard;
module.exports = KeyboardedInput.default || KeyboardedInput;
module.exports.KeyboardButton = KeyboardButton.default || KeyboardButton;
