import React from 'react';
import Keyboard from './Keyboard';
import KeyboardButton from './KeyboardButton';

class KeyboardedInput extends React.Component {
  constructor(props) {
    super(props);
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
    this.refs.input.addEventListener('input', this.handleChange);
  }

  componentWillUnmount() {
    this.refs.input.removeEventListener('input', this.handleChange);
  }

  handleChange(event) {
    this.props.onChange(event);
  }

  handleFocus() {
    this.setState({...this.state, showKeyboard: true});
  }

  handleFocusLost(event) {
    var that = this;
    setTimeout(function(){
       if (!document.activeElement.classList.contains("keyboard-button") && !document.activeElement.classList.contains("keyboard") && !document.activeElement.classList.contains("keyboard-row")) {
         that.setState({...that.state, showKeyboard: false});
       }
    }, 0);
  }

  hideKeyboard() {
    this.setState({...this.state, showKeyboard: false});
  }

  render() {
    return (
      <div>
        <input 
	  defaultValue={this.props.value} 
	  type={this.props.type} 
	  onFocus={this.handleFocus} 
	  onBlur={this.handleFocusLost} 
	  min={this.props.min}
	  max={this.props.max}
	  step={this.props.step}
	  ref="input" 
	/>
        {this.state.showKeyboard && this.props.enabled &&
          <Keyboard
            hideKeyboard={this.hideKeyboard}
            defaultKeyboard={this.props.defaultKeyboard}
            secondaryKeyboard={this.props.secondaryKeyboard}
            inputNode={this.refs.input}
          />
        }
      </div>
    );
  }
}

export default KeyboardedInput;
