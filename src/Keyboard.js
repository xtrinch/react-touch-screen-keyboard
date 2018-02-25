import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable'; // The default

import KeyboardButton from './KeyboardButton';

import LatinLayout from './layouts/LatinLayout';
import CyrillicLayout from './layouts/CyrillicLayout';
import SymbolsLayout from './layouts/SymbolsLayout';
import GermanLayout from './layouts/GermanLayout';

import BackspaceIcon from './icons/BackspaceIcon';
import LanguageIcon from './icons/LanguageIcon';
import ShiftIcon from './icons/ShiftIcon';
import DraggableIcon from './icons/DraggableIcon';

export default class Keyboard extends PureComponent {
  static propTypes = {
    inputNode: PropTypes.any.isRequired,
    onClick: PropTypes.func,
    isFirstLetterUppercase: PropTypes.bool,
    uppercaseAfterSpace: PropTypes.bool,
    defaultKeyboard: PropTypes.any,
    secondaryKeyboard: PropTypes.string,
    hideKeyboard: PropTypes.func,
    opacity: PropTypes.number,
    isDraggable: PropTypes.bool,
    dataset: PropTypes.any,
    keyboardClassName: PropTypes.any,
  };

  static defaultProps = {
    rightButtons: [],
    isFirstLetterUppercase: true,
    uppercaseAfterSpace: false,
    isDraggable: true,
    defaultKeyboard: 'us',
    dataset: { type: 'input' },
  };

  constructor(props) {
    super(props);
    this.handleLetterButtonClick = this.handleLetterButtonClick.bind(this);
    this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleShiftClick = this.handleShiftClick.bind(this);
    this.handleSymbolsClick = this.handleSymbolsClick.bind(this);
    this.handleLanguageClick = this.handleLanguageClick.bind(this);
    this.handleDragKeyClick = this.handleDragKeyClick.bind(this);

    this.state = {
      currentLanguage: props.defaultKeyboard,
      showSymbols: false,
      uppercase: this.isUppercase(),
    };
  }

  getKeys() {
    let keysSet;
    if (this.state.showSymbols) {
      keysSet = SymbolsLayout;
    } else if (this.state.currentLanguage === 'us') {
      keysSet = LatinLayout;
    } else if (this.state.currentLanguage === 'de') {
      keysSet = GermanLayout;
    } else if (this.state.currentLanguage === 'ru') {
      keysSet = CyrillicLayout;
    } else if (this.state.currentLanguage) {
      keysSet = this.state.currentLanguage;
    } else {
      keysSet = LatinLayout;
    }

    return this.state.uppercase ?
      keysSet.map(keyRow => keyRow.map(key => key.toUpperCase()))
      : keysSet;
  }

  getSymbolsKeyValue() {
    let symbolsKeyValue;
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

  handleLanguageClick() {
    this.setState({ currentLanguage: this.state.currentLanguage === this.props.defaultKeyboard
      ? this.props.secondaryKeyboard : this.props.defaultKeyboard });
  }

  clearInput() {
    const { inputNode } = this.props;

    inputNode.value = '';
    if (this.props.onClick) {
      this.props.onClick('');
    }

    setTimeout(() => {
      inputNode.focus();
    }, 0);
    inputNode.dispatchEvent(new CustomEvent('input'));
  }

  handleShiftClick() {
    this.setState({ uppercase: !this.state.uppercase });
  }

  handleSymbolsClick() {
    this.setState({ showSymbols: !this.state.showSymbols });
  }

  handleLetterButtonClick(key) {
    const { inputNode } = this.props;
    const { value } = inputNode;
    let selectionStart;
    let selectionEnd;
    try {
      selectionStart = inputNode.selectionStart;
      selectionEnd = inputNode.selectionEnd;
    } catch (e) {
      selectionStart = value.length;
      selectionEnd = value.length;
    }
    const nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);

    inputNode.value = nextValue;
    if (this.props.onClick) {
      this.props.onClick(nextValue);
    }
    setTimeout(() => {
      inputNode.focus();
      try {
        const offset = !isFinite(key) ? key.length : 1;
        inputNode.setSelectionRange(selectionStart + offset, selectionStart + offset);
      } catch (e) {
        console.error(e);
      }
    });
    this.setState({ uppercase: this.isUppercase() });
    inputNode.dispatchEvent(new CustomEvent('input'));
  }

  handleDragKeyClick() {
    const { inputNode } = this.props;
    setTimeout(() => {
      inputNode.focus();
    }, 0);
  }

  isUppercase() {
    const { inputNode, isFirstLetterUppercase, uppercaseAfterSpace, dataset } = this.props;
    return inputNode.type !== 'password' &&
      dataset.type !== 'email' &&
      ((!inputNode.value.length && isFirstLetterUppercase) 
      || (inputNode.value.length > 0 && inputNode.value[inputNode.value.length - 1] == ' ' && uppercaseAfterSpace));
  }

  handleBackspaceClick() {
    const { inputNode } = this.props;
    const { value } = inputNode;
    let selectionStart;
    let selectionEnd;
    try {
      selectionStart = inputNode.selectionStart;
      selectionEnd = inputNode.selectionEnd;
    } catch (e) {
      selectionStart = 0;
      selectionEnd = value.length;
    }

    let nextValue;
    let nextSelectionPosition;
    if (selectionStart === selectionEnd) {
      nextValue = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
      nextSelectionPosition = selectionStart - 1;
    } else {
      nextValue = value.substring(0, selectionStart) + value.substring(selectionEnd);
      nextSelectionPosition = selectionStart;
    }
    nextSelectionPosition = (nextSelectionPosition > 0) ? nextSelectionPosition : 0;

    inputNode.value = nextValue;
    if (this.props.onClick) {
      this.props.onClick(nextValue);
    }
    setTimeout(() => {
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

  render() {
    const { inputNode, secondaryKeyboard } = this.props;
    const keys = this.getKeys();
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsKeyValue = this.getSymbolsKeyValue();

    return (
      <Draggable 
        disabled={this.props.isDraggable === false}
        defaultPosition={{x: 0, y: 0}}
      >
        <div
          className={`keyboard keyboard-wrapper ${typeof(this.props.keyboardClassName) !== 'undefined' ? this.props.keyboardClassName : ''}`}
          style={{ opacity: `${typeof (this.props.opacity) !== 'undefined' ? this.props.opacity : 1}` }}
        >
          <div className="keyboard-row">
            {numbers.map(button =>
              <KeyboardButton
                value={button}
                onClick={this.handleLetterButtonClick}
                classes={'keyboard-numberButton'}
                key={button}
              />,
            )}
            <KeyboardButton
              value={<BackspaceIcon />}
              onClick={this.handleBackspaceClick}
            />
          </div>

          {keys.map((row, i) =>
            <div key={`r${i}`} className="keyboard-row">
              {keys.length === i + 1 &&
                <KeyboardButton
                  classes="shift-symbols"
                  value={<ShiftIcon />}
                  onClick={this.handleShiftClick}
                />
              }
              {row.map((button, ii) =>
                <KeyboardButton
                  value={button}
                  onClick={this.handleLetterButtonClick}
                  key={`b${ii}`}
                />,
              )}

              {keys.length === i + 1 &&
                <KeyboardButton
                  classes="shift-symbols"
                  value={symbolsKeyValue}
                  onClick={this.handleSymbolsClick}
                />
              }
            </div>,
          )}

          <div className="keyboard-row">
            {typeof secondaryKeyboard !== 'undefined' ?
              <KeyboardButton
                value={<LanguageIcon />}
                onClick={this.handleLanguageClick}
              />
              : null}
            {inputNode.dataset.type === 'email' ?
              <KeyboardButton
                value={'@'}
                onClick={this.handleLetterButtonClick}
              />
              : null}
            {this.props.isDraggable !== false ?
              <KeyboardButton
                value={<DraggableIcon />}
                classes=""
                onClick={this.handleDragKeyClick}
              />
              : null}
            <KeyboardButton
              value={' '}
              classes="keyboard-space"
              onClick={this.handleLetterButtonClick}
            />
            {inputNode.dataset.type === 'email' ?
              <KeyboardButton
                value={'.'}
                onClick={this.handleLetterButtonClick}
              />
              : null}
            <KeyboardButton
              value={'↧'}
              classes="keyboard-submit-button"
              onClick={this.props.hideKeyboard}
            />
          </div>
        </div>
      </Draggable>
    );
  }
}
