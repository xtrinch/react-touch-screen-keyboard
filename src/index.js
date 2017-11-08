require('custom-event-polyfill');

const Keyboard = require('./Keyboard');
const KeyboardButton = require('./KeyboardButton');
const KeyboardedInput = require('./KeyboardedInput');

module.exports.Keyboard = Keyboard.default || Keyboard;
module.exports = KeyboardedInput.default || KeyboardedInput;
module.exports.KeyboardButton = KeyboardButton.default || KeyboardButton;
