[![npm version](https://badge.fury.io/js/react-touch-screen-keyboard.svg)](https://badge.fury.io/js/react-touch-screen-keyboard)
[![npm](https://img.shields.io/npm/dt/react-touch-screen-keyboard.svg)]()
# react-touch-screen-keyboard

![alt tag](https://raw.githubusercontent.com/xTrinch/react-touch-screen-keyboard/master/keyboard.png)

## Quick start

This library will render a draggable virtual keyboard on the bottom of the screen when the input is selected. The usage is very simple - instead of using the input tag, use the KeyboardedInput tag from the library. You can control the input's value via the callback function you give to its props.

Currently supported keyboards: us, de, ru

**Installing via npm**

```
npm install react-touch-screen-keyboard
```

### Example

```js

import React from 'react';
import KeyboardedInput from 'react-touch-screen-keyboard';
import 'react-touch-screen-keyboard/lib/Keyboard.css'; // if you just want css
import 'react-touch-screen-keyboard/lib/Keyboard.scss'; // if you've got sass-loader

class Input extends React.Component {
  render() {
    return (
      <KeyboardedInput
        enabled
        type={this.props.type}
        onChange={this.props.onChange}
        value={this.props.value}
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        name={this.props.name}
        className={this.props.className}
        placeholder={this.props.placeholder}
        defaultKeyboard="de"
        secondaryKeyboard="us" // optional
        isFirstLetterUppercase={true} // optional, default is `false`
        isDraggable={false} // optional, default is `true`
        readOnly={this.props.readOnly} // optional
        opacity={0.9} // optional
      />
    );
  }
}
export default Input;

```

#### Use Custom Keyboard

You can pass a Nx3 sized array into `defaultKeyboard` prop to render a customize layout.

**Note:** The array must be 3 rows, however the size of the row's columns is not limited.

```js

import React from 'react';
import KeyboardedInput from 'react-touch-screen-keyboard';
import 'react-touch-screen-keyboard/lib/Keyboard.css';

class Input extends React.Component {
  render() {
    const CustomMapping = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', '.com']
    ];
      
    return (
      <KeyboardedInput
        enabled
        type={this.props.type}
        value={this.props.value}
        name={this.props.name}
        defaultKeyboard={CustomMapping}
      />
    );
  }
}
export default Input;

```

#### Running Local Example

    # NPM
    $ npm run-script start
    
    # Yarn
    $ yarn start
