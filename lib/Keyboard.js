'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _KeyboardButton = require('./KeyboardButton');

var _KeyboardButton2 = _interopRequireDefault(_KeyboardButton);

var _LatinLayout = require('./layouts/LatinLayout');

var _LatinLayout2 = _interopRequireDefault(_LatinLayout);

var _CyrillicLayout = require('./layouts/CyrillicLayout');

var _CyrillicLayout2 = _interopRequireDefault(_CyrillicLayout);

var _SymbolsLayout = require('./layouts/SymbolsLayout');

var _SymbolsLayout2 = _interopRequireDefault(_SymbolsLayout);

var _GermanLayout = require('./layouts/GermanLayout');

var _GermanLayout2 = _interopRequireDefault(_GermanLayout);

var _FrenchLayout = require('./layouts/FrenchLayout');

var _FrenchLayout2 = _interopRequireDefault(_FrenchLayout);

var _BackspaceIcon = require('./icons/BackspaceIcon');

var _BackspaceIcon2 = _interopRequireDefault(_BackspaceIcon);

var _LanguageIcon = require('./icons/LanguageIcon');

var _LanguageIcon2 = _interopRequireDefault(_LanguageIcon);

var _ShiftIcon = require('./icons/ShiftIcon');

var _ShiftIcon2 = _interopRequireDefault(_ShiftIcon);

var _DraggableIcon = require('./icons/DraggableIcon');

var _DraggableIcon2 = _interopRequireDefault(_DraggableIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // The default

var Keyboard = function (_PureComponent) {
  _inherits(Keyboard, _PureComponent);

  function Keyboard(props) {
    _classCallCheck(this, Keyboard);

    var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, props));

    _this.getCharacterClassName = function (letter) {
      var char = '' + letter;
      if (char.length > 1) {
        return '';
      }
      return 'keyboard-key-' + char.charCodeAt(0);
    };

    _this.handleLetterButtonClick = _this.handleLetterButtonClick.bind(_this);
    _this.handleBackspaceClick = _this.handleBackspaceClick.bind(_this);
    _this.clearInput = _this.clearInput.bind(_this);
    _this.handleShiftClick = _this.handleShiftClick.bind(_this);
    _this.handleSymbolsClick = _this.handleSymbolsClick.bind(_this);
    _this.handleLanguageClick = _this.handleLanguageClick.bind(_this);
    _this.handleDragKeyClick = _this.handleDragKeyClick.bind(_this);

    _this.state = {
      currentLanguage: props.defaultKeyboard,
      showSymbols: false,
      uppercase: _this.isUppercase()
    };
    return _this;
  }

  _createClass(Keyboard, [{
    key: 'getKeys',
    value: function getKeys() {
      var keysSet = void 0;
      if (this.state.showSymbols) {
        keysSet = _SymbolsLayout2.default;
      } else if (this.state.currentLanguage === 'us') {
        keysSet = _LatinLayout2.default;
      } else if (this.state.currentLanguage === 'de') {
        keysSet = _GermanLayout2.default;
      } else if (this.state.currentLanguage === 'fr') {
        keysSet = _FrenchLayout2.default;
      } else if (this.state.currentLanguage === 'ru') {
        keysSet = _CyrillicLayout2.default;
      } else if (this.state.currentLanguage) {
        keysSet = this.state.currentLanguage;
      } else {
        keysSet = _LatinLayout2.default;
      }

      return this.state.uppercase ? keysSet.map(function (keyRow) {
        return keyRow.map(function (key) {
          return isFinite(key) ? key : key.toUpperCase();
        });
      }) : keysSet;
    }
  }, {
    key: 'getSymbolsKeyValue',
    value: function getSymbolsKeyValue() {
      var symbolsKeyValue = void 0;
      if (!this.state.showSymbols) {
        symbolsKeyValue = '.?!&';
      } else if (this.state.currentLanguage === 'us' || this.state.currentLanguage === 'de') {
        symbolsKeyValue = 'Abc';
      } else if (this.state.currentLanguage === 'ru') {
        symbolsKeyValue = 'Абв';
      } else {
        symbolsKeyValue = 'Abc';
      }
      return symbolsKeyValue;
    }
  }, {
    key: 'handleLanguageClick',
    value: function handleLanguageClick() {
      this.setState({ currentLanguage: this.state.currentLanguage === this.props.defaultKeyboard ? this.props.secondaryKeyboard : this.props.defaultKeyboard });
    }
  }, {
    key: 'clearInput',
    value: function clearInput() {
      var inputNode = this.props.inputNode;


      inputNode.value = '';
      if (this.props.onClick) {
        this.props.onClick('');
      }

      setTimeout(function () {
        inputNode.focus();
      }, 0);
      inputNode.dispatchEvent(new CustomEvent('input'));
    }
  }, {
    key: 'handleShiftClick',
    value: function handleShiftClick() {
      this.setState({ uppercase: !this.state.uppercase });
    }
  }, {
    key: 'handleSymbolsClick',
    value: function handleSymbolsClick() {
      this.setState({ showSymbols: !this.state.showSymbols });
    }
  }, {
    key: 'handleLetterButtonClick',
    value: function handleLetterButtonClick(key) {
      var inputNode = this.props.inputNode;
      var value = inputNode.value;

      var selectionStart = void 0;
      var selectionEnd = void 0;
      try {
        selectionStart = inputNode.selectionStart;
        selectionEnd = inputNode.selectionEnd;
      } catch (e) {
        selectionStart = value.length;
        selectionEnd = value.length;
      }
      var nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);

      inputNode.value = nextValue;
      if (this.props.onClick) {
        this.props.onClick(nextValue);
      }
      setTimeout(function () {
        inputNode.focus();
        try {
          var offset = !isFinite(key) ? key.length : 1;
          inputNode.setSelectionRange(selectionStart + offset, selectionStart + offset);
        } catch (e) {
          console.error(e);
        }
      });
      this.setState({ uppercase: this.isUppercase() });
      inputNode.dispatchEvent(new CustomEvent('input'));
    }
  }, {
    key: 'handleDragKeyClick',
    value: function handleDragKeyClick() {
      var inputNode = this.props.inputNode;

      setTimeout(function () {
        inputNode.focus();
      }, 0);
    }
  }, {
    key: 'isUppercase',
    value: function isUppercase() {
      var _props = this.props,
          inputNode = _props.inputNode,
          isFirstLetterUppercase = _props.isFirstLetterUppercase,
          uppercaseAfterSpace = _props.uppercaseAfterSpace,
          dataset = _props.dataset;

      return inputNode.type !== 'password' && dataset.type !== 'email' && (!inputNode.value.length && isFirstLetterUppercase || inputNode.value.length > 0 && inputNode.value[inputNode.value.length - 1] === ' ' && uppercaseAfterSpace);
    }
  }, {
    key: 'handleBackspaceClick',
    value: function handleBackspaceClick() {
      var inputNode = this.props.inputNode;
      var value = inputNode.value;

      var selectionStart = void 0;
      var selectionEnd = void 0;
      try {
        selectionStart = inputNode.selectionStart;
        selectionEnd = inputNode.selectionEnd;
      } catch (e) {
        selectionStart = 0;
        selectionEnd = value.length;
      }

      var nextValue = void 0;
      var nextSelectionPosition = void 0;
      if (selectionStart === selectionEnd) {
        nextValue = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
        nextSelectionPosition = selectionStart - 1;
      } else {
        nextValue = value.substring(0, selectionStart) + value.substring(selectionEnd);
        nextSelectionPosition = selectionStart;
      }
      nextSelectionPosition = nextSelectionPosition > 0 ? nextSelectionPosition : 0;

      inputNode.value = nextValue;
      if (this.props.onClick) {
        this.props.onClick(nextValue);
      }
      setTimeout(function () {
        inputNode.focus();
        try {
          inputNode.setSelectionRange(nextSelectionPosition, nextSelectionPosition);
        } catch (e) {
          console.error(e);
        }
      }, 0);
      this.setState({ uppercase: this.isUppercase() });
      inputNode.dispatchEvent(new CustomEvent('input'));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          inputNode = _props2.inputNode,
          secondaryKeyboard = _props2.secondaryKeyboard;

      var keys = this.getKeys();
      var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
      var symbolsKeyValue = this.getSymbolsKeyValue();

      return _react2.default.createElement(
        _reactDraggable2.default,
        {
          disabled: this.props.isDraggable === false,
          defaultPosition: { x: 0, y: 0 }
        },
        _react2.default.createElement(
          'div',
          {
            className: 'keyboard keyboard-wrapper ' + (typeof this.props.keyboardClassName !== 'undefined' ? this.props.keyboardClassName : ''),
            style: { opacity: '' + (typeof this.props.opacity !== 'undefined' ? this.props.opacity : 1) }
          },
          this.props.showNumericRow ? _react2.default.createElement(
            'div',
            { className: 'keyboard-row' },
            numbers.map(function (button) {
              return _react2.default.createElement(_KeyboardButton2.default, {
                value: button,
                onClick: _this2.handleLetterButtonClick,
                classes: 'keyboard-numberButton ' + _this2.getCharacterClassName(button),
                key: button
              });
            }),
            _react2.default.createElement(_KeyboardButton2.default, {
              classes: 'backspace-button',
              value: _react2.default.createElement(_BackspaceIcon2.default, null),
              onClick: this.handleBackspaceClick
            })
          ) : null,
          keys.map(function (row, i) {
            return _react2.default.createElement(
              'div',
              { key: 'r' + i, className: 'keyboard-row' },
              keys.length === i + 1 && _this2.props.showShift && _react2.default.createElement(_KeyboardButton2.default, {
                classes: 'shift-symbols',
                value: _react2.default.createElement(_ShiftIcon2.default, null),
                onClick: _this2.handleShiftClick
              }),
              row.map(function (button, ii) {
                switch (button.toLowerCase()) {
                  case '*bs':
                    return _react2.default.createElement(_KeyboardButton2.default, {
                      classes: 'backspace-button',
                      value: _react2.default.createElement(_BackspaceIcon2.default, null),
                      onClick: _this2.handleBackspaceClick,
                      key: 'b' + ii
                    });

                  case '*sh':
                    return _react2.default.createElement(_KeyboardButton2.default, {
                      classes: 'shift-symbols',
                      value: _react2.default.createElement(_ShiftIcon2.default, null),
                      onClick: _this2.handleShiftClick,
                      key: 'b' + ii
                    });

                  default:
                    return _react2.default.createElement(_KeyboardButton2.default, {
                      value: button,
                      classes: _this2.getCharacterClassName(button),
                      onClick: _this2.handleLetterButtonClick,
                      key: 'b' + ii
                    });
                }
              }),
              keys.length === i + 1 && _this2.props.showSymbols && _react2.default.createElement(_KeyboardButton2.default, {
                classes: 'shift-symbols',
                value: symbolsKeyValue,
                onClick: _this2.handleSymbolsClick
              })
            );
          }),
          _react2.default.createElement(
            'div',
            { className: 'keyboard-row' },
            typeof secondaryKeyboard !== 'undefined' ? _react2.default.createElement(_KeyboardButton2.default, {
              value: _react2.default.createElement(_LanguageIcon2.default, null),
              onClick: this.handleLanguageClick
            }) : null,
            inputNode.dataset.type === 'email' ? _react2.default.createElement(_KeyboardButton2.default, {
              value: '@',
              onClick: this.handleLetterButtonClick
            }) : null,
            this.props.isDraggable !== false ? _react2.default.createElement(_KeyboardButton2.default, {
              value: _react2.default.createElement(_DraggableIcon2.default, null),
              classes: 'keyboard-draggable-button',
              onClick: this.handleDragKeyClick
            }) : null,
            this.props.showSpacebar ? _react2.default.createElement(_KeyboardButton2.default, {
              value: ' ',
              classes: 'keyboard-space',
              onClick: this.handleLetterButtonClick
            }) : null,
            inputNode.dataset.type === 'email' ? _react2.default.createElement(_KeyboardButton2.default, {
              value: '.',
              onClick: this.handleLetterButtonClick
            }) : null,
            this.props.showSubmit ? _react2.default.createElement(_KeyboardButton2.default, {
              value: String.fromCharCode('8615'),
              classes: 'keyboard-submit-button',
              onClick: this.props.hideKeyboard
            }) : null
          )
        )
      );
    }
  }]);

  return Keyboard;
}(_react.PureComponent);

Keyboard.propTypes = {
  inputNode: _propTypes2.default.any.isRequired,
  onClick: _propTypes2.default.func,
  isFirstLetterUppercase: _propTypes2.default.bool,
  uppercaseAfterSpace: _propTypes2.default.bool,
  defaultKeyboard: _propTypes2.default.any,
  secondaryKeyboard: _propTypes2.default.string,
  hideKeyboard: _propTypes2.default.func,
  opacity: _propTypes2.default.number,
  isDraggable: _propTypes2.default.bool,
  dataset: _propTypes2.default.any,
  keyboardClassName: _propTypes2.default.any,
  showNumericRow: _propTypes2.default.bool,
  showShift: _propTypes2.default.bool,
  showSymbols: _propTypes2.default.bool,
  showSpacebar: _propTypes2.default.bool,
  showSubmit: _propTypes2.default.bool
};
Keyboard.defaultProps = {
  rightButtons: [],
  isFirstLetterUppercase: true,
  uppercaseAfterSpace: false,
  isDraggable: true,
  defaultKeyboard: 'us',
  dataset: { type: 'input' },
  showNumericRow: true,
  showShift: true,
  showSymbols: true,
  showSpacebar: true,
  showSubmit: true
};
exports.default = Keyboard;
module.exports = exports['default'];