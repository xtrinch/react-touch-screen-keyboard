import React from 'react';
import PropTypes from 'prop-types';

import Keyboard from './Keyboard';

class KeyboardedInput extends React.Component {
  static propTypes = {
    name: PropTypes.any,
    containerClassName: PropTypes.any,
    inputClassName: PropTypes.any,
    keyboardClassName: PropTypes.any,
    placeholder: PropTypes.any,
    value: PropTypes.any.isRequired,
    type: PropTypes.any,
    min: PropTypes.any,
    max: PropTypes.any,
    step: PropTypes.any,
    pattern: PropTypes.any,
    readOnly: PropTypes.any,
    enabled: PropTypes.any,
    defaultKeyboard: PropTypes.any,
    secondaryKeyboard: PropTypes.any,
    opacity: PropTypes.any,
    isDraggable: PropTypes.any,
    isFirstLetterUppercase: PropTypes.any,
    uppercaseAfterSpace: PropTypes.any,
    dataset: PropTypes.any,
    onChange: PropTypes.func,
    showNumericRow: PropTypes.bool,
    showShift: PropTypes.bool,
    showSymbols: PropTypes.bool,
    showSpacebar: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleFocusLost = this.handleFocusLost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideKeyboard = this.hideKeyboard.bind(this);

    this.state = {
      showKeyboard: false,
      input: null,
    };
  }

  componentDidMount() {
    this.input.addEventListener('input', this.handleChange);
  }

  componentWillUnmount() {
    this.input.removeEventListener('input', this.handleChange);
  }

  focus() {
    this.input.focus();
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  handleFocus() {
    const that = this;
    // Prevent blinking of the keyboard if opaque
    setTimeout(() => {
      if (that.input && typeof (that.props.value) !== 'undefined') {
        that.input.focus();
        that.input.select();
        that.input.setSelectionRange(that.props.value.length, that.props.value.length);
        that.setState({ ...this.state, showKeyboard: true });
      }
    }, 0);
  }

  handleFocusLost() {
    const that = this;
    setTimeout(() => {
      // console.error(document.activeElement.classList);
      console.error(window.event);
      if (!document.activeElement.classList.contains('keyboard-button')
        && !document.activeElement.classList.contains('keyboard')
        && !document.activeElement.classList.contains('keyboard-row')
        && !document.activeElement.classList.contains('react-draggable-transparent-selection')) {
        that.setState({ ...that.state, showKeyboard: false });
      }
    }, 0);
  }

  hideKeyboard() {
    this.setState({ ...this.state, showKeyboard: false });
  }

  render() {
    return (
      <div className={this.props.containerClassName}>
        <input
          name={this.props.name}
          className={this.props.inputClassName}
          placeholder={this.props.placeholder}
          value={this.props.value}
          type={this.props.type}
          onFocus={this.handleFocus}
          onBlur={this.handleFocusLost}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          pattern={this.props.pattern}
          onChange={this.handleChange}
          readOnly={this.props.readOnly === true}
          ref={(e) => { this.input = e; }}
        />
        {this.state.showKeyboard && this.props.enabled && this.props.readOnly !== true &&
        <Keyboard
          hideKeyboard={this.hideKeyboard}
          defaultKeyboard={this.props.defaultKeyboard}
          secondaryKeyboard={this.props.secondaryKeyboard}
          inputNode={this.input}
          dataset={this.props.dataset}
          opacity={this.props.opacity}
          isDraggable={this.props.isDraggable}
          isFirstLetterUppercase={this.props.isFirstLetterUppercase}
          uppercaseAfterSpace={this.props.uppercaseAfterSpace}
          keyboardClassName={this.props.keyboardClassName}
          showNumericRow={this.props.showNumericRow}
          showShift={this.props.showShift}
          showSymbols={this.props.showSymbols}
          showSpacebar={this.props.showSpacebar}
        />
        }
      </div>
    );
  }
}

export default KeyboardedInput;
