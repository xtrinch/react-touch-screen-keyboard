import React from 'react';
import ReactDom from 'react-dom';
import KeyboardedInput from '../src';
import '../src/Keyboard.css';

ReactDom.render(
  <div>
    <p>react-touch-screen-keyboard</p>
    <KeyboardedInput enabled />
    <br />
    <KeyboardedInput enabled />
	<br />
    <KeyboardedInput enabled />
    <br />
    <KeyboardedInput enabled />
  </div>,
  document.getElementById('app')
)
