import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class CustomReactModule extends Component {
  render() {
    return <div>Hello world!</div>;
  }
}

CustomReactModule.propTypes = {};

CustomReactModule.defaultProps = {};
