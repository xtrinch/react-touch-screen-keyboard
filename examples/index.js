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
      value4: '',
      customMapping: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.com'],
      ],
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleValue1Change = this.handleValue1Change.bind(this);
    this.handleValue2Change = this.handleValue2Change.bind(this);
    this.handleValue3Change = this.handleValue3Change.bind(this);
    this.handleValue4Change = this.handleValue4Change.bind(this);
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

  handleValue4Change(val) {
    this.setState({ value4: val });
  }
  render() {
    return (
      <div>
        <h1>React Touch Screen Keyboard Examples</h1>
        <p>Standard</p>
        <KeyboardedInput
          value={this.state.value}
          onChange={(value) => { this.handleValueChange(value); }}
          opacity={0.8}
          placeholder={'testme'} enabled
        />
        <br />
        <p>Disable Dragging</p>
        <KeyboardedInput
          value={this.state.value1}
          onChange={(value) => { this.handleValue1Change(value); }}
          enabled
          isDraggable={false}
        />
        <br />
        <p>Disable Uppercase</p>
        <KeyboardedInput
          value={this.state.value2}
          onChange={(value) => { this.handleValue2Change(value); }}
          enabled
          isFirstLetterUppercase={false}
        />
        <br />
        <p>Custom Mapping</p>
        <KeyboardedInput
          value={this.state.value3}
          onChange={(value) => { this.handleValue3Change(value); }}
          defaultKeyboard={this.state.customMapping}
          enabled
        />
        <p>Field Type (Email)</p>
        <KeyboardedInput
          value={this.state.value4}
          dataset={{ type: 'email' }}
          onChange={(value) => { this.handleValue4Change(value); }}
          enabled
        />
      </div>
    );
  }
}

ReactDom.render(
  <MainComponent />,
  document.getElementById('app'),
);
