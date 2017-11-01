import React from 'react';
import ReactDom from 'react-dom';
import KeyboardedInput from '../src';
import '../src/Keyboard.css';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', value1: '' };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleValue1Change = this.handleValue1Change.bind(this);
  }

  handleValueChange(val) {
    this.setState({ value: val });
  }

  handleValue1Change(val) {
    this.setState({ value1: val });
  }

  render() {
    return (
      <div>
        <p>react-touch-screen-keyboard</p>
        <KeyboardedInput onChange={(value) => { this.handleValueChange(value); }} opacity={0.8} enabled />
        <br />
        <KeyboardedInput onChange={(value) => { this.handleValue1Change(value); }} enabled />
      </div>
    );
  }
}

ReactDom.render(
  <MainComponent />,
  document.getElementById('app'),
);
