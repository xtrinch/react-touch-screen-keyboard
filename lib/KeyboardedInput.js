'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Keyboard = require('./Keyboard');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyboardedInput = function (_React$Component) {
  _inherits(KeyboardedInput, _React$Component);

  function KeyboardedInput(props) {
    _classCallCheck(this, KeyboardedInput);

    var _this = _possibleConstructorReturn(this, (KeyboardedInput.__proto__ || Object.getPrototypeOf(KeyboardedInput)).call(this, props));

    _this.focus = _this.focus.bind(_this);
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.handleFocusLost = _this.handleFocusLost.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.hideKeyboard = _this.hideKeyboard.bind(_this);
    _this.handleOnBlur = _this.handleOnBlur.bind(_this);
    _this.handleOnFocus = _this.handleOnFocus.bind(_this);

    _this.state = {
      showKeyboard: false,
      input: null
    };
    return _this;
  }

  _createClass(KeyboardedInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.input.addEventListener('input', this.handleChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.input.removeEventListener('input', this.handleChange);
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.input.focus();
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.props.onChange(event.target.value, event.target.name);
    }
  }, {
    key: 'handleOnBlur',
    value: function handleOnBlur(value) {
      this.props.onBlur(value);
    }
  }, {
    key: 'handleOnFocus',
    value: function handleOnFocus(value) {
      this.props.onFocus(value);
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus() {
      var _this2 = this;

      var that = this;
      // Prevent blinking of the keyboard if opaque
      setTimeout(function () {
        if (that.input && typeof that.props.value !== 'undefined') {
          that.input.focus();
          that.input.select();
          that.input.setSelectionRange(that.props.value.length, that.props.value.length);

          // Only trigger on first focus
          if (_this2.state.showKeyboard === false && that.props.onFocus) {
            that.props.onFocus(that.props.value);
          }

          that.setState(_extends({}, _this2.state, { showKeyboard: true }));
        }
      }, 0);
    }
  }, {
    key: 'handleFocusLost',
    value: function handleFocusLost() {
      var that = this;
      setTimeout(function () {
        if (!document.activeElement.classList.contains('keyboard-button') && !document.activeElement.classList.contains('keyboard') && !document.activeElement.classList.contains('keyboard-row') && !document.activeElement.classList.contains('react-draggable-transparent-selection')) {

          if (that.props.onBlur) {
            that.props.onBlur(that.props.value);
          }

          that.setState(_extends({}, that.state, { showKeyboard: false }));
        }
      }, 0);
    }
  }, {
    key: 'hideKeyboard',
    value: function hideKeyboard() {
      if (this.props.onBlur) {
        this.props.onBlur(this.props.value);
      }

      this.setState(_extends({}, this.state, { showKeyboard: false }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return [_react2.default.createElement('input', {
        key: '_input',
        name: this.props.name,
        className: this.props.inputClassName,
        placeholder: this.props.placeholder,
        required: this.props.required,
        value: this.props.value,
        type: this.props.type,
        onFocus: this.handleFocus,
        onBlur: this.handleFocusLost,
        min: this.props.min,
        max: this.props.max,
        step: this.props.step,
        pattern: this.props.pattern,
        onChange: this.handleChange,
        readOnly: this.props.readOnly === true,
        ref: function ref(e) {
          _this3.input = e;
        }
      }), _react2.default.createElement(
        'div',
        { key: '_container', className: this.props.containerClassName },
        this.state.showKeyboard && this.props.enabled && this.props.readOnly !== true && _react2.default.createElement(_Keyboard2.default, {
          hideKeyboard: this.hideKeyboard,
          defaultKeyboard: this.props.defaultKeyboard,
          secondaryKeyboard: this.props.secondaryKeyboard,
          inputNode: this.input,
          dataset: this.props.dataset,
          opacity: this.props.opacity,
          isDraggable: this.props.isDraggable,
          isFirstLetterUppercase: this.props.isFirstLetterUppercase,
          uppercaseAfterSpace: this.props.uppercaseAfterSpace,
          keyboardClassName: this.props.keyboardClassName,
          showNumericRow: this.props.showNumericRow,
          showShift: this.props.showShift,
          showSymbols: this.props.showSymbols,
          showSpacebar: this.props.showSpacebar,
          showSubmit: this.props.showSubmit
        })
      )];
    }
  }]);

  return KeyboardedInput;
}(_react2.default.Component);

KeyboardedInput.propTypes = {
  name: _propTypes2.default.any,
  containerClassName: _propTypes2.default.any,
  inputClassName: _propTypes2.default.any,
  keyboardClassName: _propTypes2.default.any,
  placeholder: _propTypes2.default.any,
  value: _propTypes2.default.any.isRequired,
  type: _propTypes2.default.any,
  min: _propTypes2.default.any,
  max: _propTypes2.default.any,
  step: _propTypes2.default.any,
  pattern: _propTypes2.default.any,
  readOnly: _propTypes2.default.any,
  enabled: _propTypes2.default.any,
  required: _propTypes2.default.bool,
  defaultKeyboard: _propTypes2.default.any,
  secondaryKeyboard: _propTypes2.default.any,
  opacity: _propTypes2.default.any,
  isDraggable: _propTypes2.default.any,
  isFirstLetterUppercase: _propTypes2.default.any,
  uppercaseAfterSpace: _propTypes2.default.any,
  dataset: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  showNumericRow: _propTypes2.default.bool,
  showShift: _propTypes2.default.bool,
  showSymbols: _propTypes2.default.bool,
  showSpacebar: _propTypes2.default.bool,
  showSubmit: _propTypes2.default.bool
};
exports.default = KeyboardedInput;
module.exports = exports['default'];