import React from 'react'
import ReactDom from 'react-dom'
import CustomReactModule from '../src/index';

ReactDom.render(
  <div>
    <p>You rendered the CustomReactModule:</p>
    <CustomReactModule />
  </div>,
  document.getElementById('app')
)
