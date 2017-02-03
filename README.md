# react-screen-keyboard

![alt tag](https://raw.githubusercontent.com/xTrinch/react-touch-screen-keyboard/master/keyboard.png)

## Quick start

This library will render a virtual keyboard on the bottom of the screen when the input is selected. The usage is very simple - instead of using the input tag, use the KeyboardedInput tag from the library. You can control the input's value via the callback function you give to its props.

**Installing via npm**

```
npm install react-touch-screen-keyboard
```

### Example

```js

import React from 'react';
import KeyboardedInput from 'react-screen-keyboard';
import 'react-screen-keyboard/src/Keyboard.css';

class Input extends React.Component {
  render() {
    return (
      <KeyboardedInput
        enabled
        type={this.props.type}
        onChange={this.props.onChange}
        value={this.props.value}
        defaultKeyboard="de"
        secondaryKeyboard="us" // optional
      />
    );
  }
}
export default Input;

```
