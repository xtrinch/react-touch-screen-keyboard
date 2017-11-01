import React from 'react';
import ReactDom from 'react-dom';
import KeyboardedInput from '../src';
import '../src/Keyboard.css';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    	value: '', 
    	value1: '',
    	value2: '',
    	value3: '',
    	customMapping: [
					      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
					      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@'],
					      ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.com']
					    ]
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleValue1Change = this.handleValue1Change.bind(this);
    this.handleValue2Change = this.handleValue2Change.bind(this);
    this.handleValue3Change = this.handleValue3Change.bind(this);

  }

  handleValueChange(val) {
    this.setState({ value: val });
  }

  handleValue1Change(val) {
    this.setState({ value1: val });
  }

  handleValue2Change(val) {
    this.setState({ value2: val });
  }

   handleValue3Change(val) {
    this.setState({ value3: val });
  }
  render() {
    return (
      <div>
        <p>react-touch-screen-keyboard</p>
        <KeyboardedInput value={this.state.value} onChange={(value) => { this.handleValueChange(value); }} opacity={0.8} placeholder="testme" enabled />
        <br />
        <KeyboardedInput value={this.state.value1} onChange={(value) => { this.handleValue1Change(value); }} enabled isDraggable={false} />
        <br />
        <KeyboardedInput value={this.state.value2} onChange={(value) => { this.handleValue2Change(value); }} enabled isDraggable={true} />
        <br />
        <KeyboardedInput value={this.state.value3} onChange={(value) => { this.handleValue3Change(value); }} defaultKeyboard={this.state.customMapping} enabled isDraggable={true} />
      </div>
    );
  }
}

ReactDom.render(
  <MainComponent />,
  document.getElementById('app'),
);
