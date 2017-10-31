import React, {PureComponent, PropTypes} from 'react';
import KeyboardButton from './KeyboardButton';

import LatinLayout from './layouts/LatinLayout';
import CyrillicLayout from './layouts/CyrillicLayout';
import SymbolsLayout from './layouts/SymbolsLayout';
import GermanLayout from './layouts/GermanLayout';

import BackspaceIcon from './icons/BackspaceIcon';
import LanguageIcon from './icons/LanguageIcon';
import ShiftIcon from './icons/ShiftIcon';
import DraggableIcon from './icons/DraggableIcon';

import Draggable from 'react-draggable'; // The default

export default class Keyboard extends PureComponent {
	static propTypes = {
		inputNode: PropTypes.any.isRequired,
		onClick: PropTypes.func,
		isFirstLetterUppercase: PropTypes.bool,
		defaultKeyboard: PropTypes.any,
		secondaryKeyboard: PropTypes.string,
		hideKeyboard: PropTypes.func,
		opacity: PropTypes.number,
		isDraggable: PropTypes.bool,
	};

	static defaultProps = {
		rightButtons: [],
		isFirstLetterUppercase: false,
		isDraggable: false,
		defaultKeyboard: 'us',
	};

	constructor(props) {
		super(props);
		this.handleLetterButtonClick = this.handleLetterButtonClick.bind(this);
		this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
		this.handleLanguageClick = this.handleLanguageClick.bind(this);
		this.clearInput = this.clearInput.bind(this);
		this.handleShiftClick = this.handleShiftClick.bind(this);
		this.handleSymbolsClick = this.handleSymbolsClick.bind(this);
		this.handleDragKeyClick = this.handleDragKeyClick.bind(this);

		this.state = {
			currentLanguage: props.defaultKeyboard,
			showSymbols: false,
			uppercase: this.isUppercase(),
		};
	}

	handleLanguageClick() {
		this.setState({currentLanguage: this.state.currentLanguage === this.props.defaultKeyboard ? this.props.secondaryKeyboard : this.props.defaultKeyboard });
	}

	clearInput() {
		const {inputNode} = this.props;

		inputNode.value = '';
		if (this.props.onClick) {
			this.props.onClick('');
		}

		setTimeout(() => {
			inputNode.focus();
		}, 0);
		inputNode.dispatchEvent(new Event('input'));
	}

	handleShiftClick() {
		this.setState({uppercase: !this.state.uppercase});
	}

	handleSymbolsClick() {
		this.setState({showSymbols: !this.state.showSymbols});
	}

	handleLetterButtonClick(key) {
		const {inputNode} = this.props;
		const {value} = inputNode;
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
				let offset = !isFinite(key) ? key.length : 1;
				inputNode.setSelectionRange(selectionStart + offset, selectionStart + offset);
			} catch (e) {}
		}, 0);
		this.setState({uppercase: this.isUppercase()});
		inputNode.dispatchEvent(new Event('input'));
	}

	handleDragKeyClick() {
		const {inputNode} = this.props;
		setTimeout(() => {
			inputNode.focus();
		}, 0);
	}

	isUppercase() {
		const {inputNode, isFirstLetterUppercase} = this.props;
		return inputNode.type !== 'password' &&
			inputNode.dataset.type !== 'email' &&
			!inputNode.value.length && isFirstLetterUppercase;
	}

	handleBackspaceClick() {
		const {inputNode} = this.props;
        const {value} = inputNode;
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
			} catch (e) {}
		}, 0);
		this.setState({uppercase: this.isUppercase()});
		inputNode.dispatchEvent(new Event('input'));
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

	render() {
		const {rightButtons, inputNode, secondaryKeyboard} = this.props;
		const keys = this.getKeys();
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
		const symbolsKeyValue = this.getSymbolsKeyValue();

		return (
			<Draggable>
				<div className="keyboard keyboard-wrapper" style={{ opacity: `${typeof(this.props.opacity) !== 'undefined' ? this.props.opacity : 1}`}}>
					<div className="keyboard-row">
						{numbers.map((button) =>
							<KeyboardButton
								value={button}
								onClick={this.handleLetterButtonClick}
								classes={"keyboard-numberButton"}
								key={button}
							/>
						)}
						<KeyboardButton
							value={<BackspaceIcon />}
							onClick={this.handleBackspaceClick}
						/>
					</div>

					<div className="keyboard-row">
						{keys[0].map((button) =>
							<KeyboardButton
								value={button}
								onClick={this.handleLetterButtonClick}
								key={button}
							/>
						)}
					</div>

					<div className="keyboard-row">
						{keys[1].map((button) =>
							<KeyboardButton
								value={button}
								onClick={this.handleLetterButtonClick}
								key={button}
							/>
						)}
					</div>

					<div className="keyboard-row">
						<KeyboardButton
							classes="shift-symbols"
							value={<ShiftIcon />}
							onClick={this.handleShiftClick}
						/>
						{keys[2].map((button) =>
							<KeyboardButton
								value={button}
								onClick={this.handleLetterButtonClick}
								key={button}
							/>
						)}
						<KeyboardButton
							classes="shift-symbols"
							value={symbolsKeyValue}
							onClick={this.handleSymbolsClick}
						/>
					</div>

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
						{this.props.isDraggable ?
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
