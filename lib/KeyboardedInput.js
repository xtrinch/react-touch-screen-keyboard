'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Keyboard = require('./Keyboard');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _KeyboardButton = require('./KeyboardButton');

var _KeyboardButton2 = _interopRequireDefault(_KeyboardButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyboardedInput = function (_React$Component) {
  _inherits(KeyboardedInput, _React$Component);

  function KeyboardedInput(props) {
    _classCallCheck(this, KeyboardedInput);

    var _this = _possibleConstructorReturn(this, (KeyboardedInput.__proto__ || Object.getPrototypeOf(KeyboardedInput)).call(this, props));

    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleFocusLost = _this.handleFocusLost.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.hideKeyboard = _this.hideKeyboard.bind(_this);

    _this.state = {
      showKeyboard: false,
      input: null
    };
    return _this;
  }

  _createClass(KeyboardedInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.input.addEventListener('input', this.handleChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.refs.input.removeEventListener('input', this.handleChange);
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.props.onChange(event);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      this.setState(_extends({}, this.state, { showKeyboard: true }));
    }
  }, {
    key: 'handleFocusLost',
    value: function handleFocusLost(event) {
      var that = this;
      setTimeout(function () {
        if (!document.activeElement.classList.contains("keyboard-button") && !document.activeElement.classList.contains("keyboard") && !document.activeElement.classList.contains("keyboard-row")) {
          that.setState(_extends({}, that.state, { showKeyboard: false }));
        }
      }, 0);
    }
  }, {
    key: 'hideKeyboard',
    value: function hideKeyboard() {
      this.setState(_extends({}, this.state, { showKeyboard: false }));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', { value: this.props.type, type: this.props.type, onFocus: this.handleFocus, onBlur: this.handleFocusLost, ref: 'input' }),
        this.state.showKeyboard && this.props.enabled && _react2.default.createElement(_Keyboard2.default, {
          hideKeyboard: this.hideKeyboard,
          defaultKeyboard: this.props.defaultKeyboard,
          secondaryKeyboard: this.props.secondaryKeyboard,
          inputNode: this.refs.input
        })
      );
    }
  }]);

  return KeyboardedInput;
}(_react2.default.Component);

exports.default = KeyboardedInput;
//# sourceMappingURL=KeyboardedInput.js.map