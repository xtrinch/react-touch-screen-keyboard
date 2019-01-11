import React from 'react';
import ReactDom from 'react-dom';
import KeyboardedInput from '../src';
import '../src/Keyboard.scss';

export default class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      customMapping: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@', '*sh'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.com', '*bs'],
      ],
    };
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleValue1Change = this.handleValue1Change.bind(this);
    this.handleValue2Change = this.handleValue2Change.bind(this);
    this.handleValue3Change = this.handleValue3Change.bind(this);
    this.handleValue4Change = this.handleValue4Change.bind(this);
    this.handleValue5Change = this.handleValue5Change.bind(this);
    this.handleValue6Change = this.handleValue6Change.bind(this);
    this.handleValue7Change = this.handleValue7Change.bind(this);
    this.handleValue8Change = this.handleValue8Change.bind(this);
    this.handleValue9Change = this.handleValue9Change.bind(this);
    this.handleValue10Change = this.handleValue10Change.bind(this);
    this.handleFocusButtonClicked = this.handleFocusButtonClicked.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);

    this.input7ref = null;
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

  handleValue5Change(val) {
    this.setState({ value5: val });
  }

  handleValue6Change(val) {
    this.setState({ value6: val });
  }

  handleValue7Change(val) {
    this.setState({ value7: val });
  }

  handleValue8Change(val) {
    this.setState({ value8: val });
  }

  handleValue9Change(val) {
    this.setState({ value9: val });
  }

  handleValue10Change(val) {
    this.setState({ value10: val });
  }

  handleValue11Change = (val) => {
    this.setState(_ => ({ value11: val }));
  };
  handleFocusButtonClicked() {
    this.input7ref.focus();
  }

  handleOnFocus() {
    this.handleValue10Change('default value');
  }

  render() {
    return (
      <div>
        <h1>React Touch Screen Keyboard Examples</h1>

        <p>Standard</p>
        <KeyboardedInput
          value={this.state.value}
          onChange={(value) => {
            this.handleValueChange(value);
          }}
          opacity={0.8}
          placeholder={'testme'}
          required
          enabled
        />
        <br />

        <p>Disable Dragging</p>
        <KeyboardedInput
          value={this.state.value11}
          onChange={(value) => {
            this.handleValue11Change(value);
          }}
          enabled
          isDraggable={false}
        />
        <br />

        <p>Disable Submit</p>
        <KeyboardedInput
          value={this.state.value1}
          onChange={(value) => {
            this.handleValue1Change(value);
          }}
          enabled
          showSubmit={false}
        />
        <br />

        <p>Disable Uppercase</p>
        <KeyboardedInput
          value={this.state.value2}
          onChange={(value) => {
            this.handleValue2Change(value);
          }}
          enabled
          isFirstLetterUppercase={false}
        />
        <br />

        <p>Custom Mapping</p>
        <KeyboardedInput
          value={this.state.value3}
          onChange={(value) => {
            this.handleValue3Change(value);
          }}
          defaultKeyboard={this.state.customMapping}
          enabled
        />
        <br />

        <p>Field Type (Email)</p>
        <KeyboardedInput
          value={this.state.value4}
          dataset={{ type: 'email' }}
          onChange={(value) => {
            this.handleValue4Change(value);
          }}
          enabled
          keyboardClassName="testme"
        />
        <br />

        <p>Uppercase After Space (name entry)</p>
        <KeyboardedInput
          value={this.state.value5}
          onChange={(value) => {
            this.handleValue5Change(value);
          }}
          enabled
          uppercaseAfterSpace
        />
        <br />

        <p>Custom container className </p>
        <span>Can create inline inputs </span>
        <KeyboardedInput
          value={this.state.value6}
          onChange={(value) => {
            this.handleValue6Change(value);
          }}
          enabled
          uppercaseAfterSpace
          containerClassName={'custom-class'}
        />
        <span> for more flexibility building forms</span>
        <br />

        <p>Programmatically Focus Input</p>
        <KeyboardedInput
          ref={(ref) => {
            this.input7ref = ref;
          }}
          value={this.state.value7}
          onChange={(value) => {
            this.handleValue7Change(value);
          }}
          enabled
        />
        <button onClick={this.handleFocusButtonClicked}>Click To Focus</button>
        <br />

        <p>Hidden numeric row, hidden shift, hidden symbols, hidden spacebar</p>
        <KeyboardedInput
          value={this.state.value8}
          onChange={(value) => {
            this.handleValue8Change(value);
          }}
          enabled
          showNumericRow={false}
          showShift={false}
          showSymbols={false}
          showSpacebar={false}
        />
        <br />

        <p>Callback (onBlur)</p>
        <KeyboardedInput
          value={this.state.value9}
          onChange={(value) => {
            this.handleValue9Change(value);
          }}
          onBlur={(value) => {
            alert(`Triggered Blur: ${value}`);
          }}
          enabled
        />
        <br />

        <p>Callback (onFocus)</p>
        <KeyboardedInput
          value={this.state.value10}
          onChange={(value) => {
            this.handleValue10Change(value);
          }}
          onFocus={this.handleOnFocus}
          enabled
        />
        <br />
      </div>
    );
  }
}

ReactDom.render(<MainComponent />, document.getElementById('app'));
