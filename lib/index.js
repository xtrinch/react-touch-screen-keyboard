'use strict';

require('custom-event-polyfill');

var Keyboard = require('./Keyboard');
var KeyboardButton = require('./KeyboardButton');
var KeyboardedInput = require('./KeyboardedInput');

module.exports = KeyboardedInput.default || KeyboardedInput;
module.exports.Keyboard = Keyboard.default || Keyboard;
module.exports.KeyboardButton = KeyboardButton.default || KeyboardButton;