
import React, { Component } from 'react';
import SvgStyle from './svgStyle';

export default class Reject extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <SvgStyle>
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <path className="cls-4" d="M12.14,5.24a.64.64,0,0,0-.45.17L9,8.11l-2.7-2.7a.64.64,0,0,0-.45-.17.68.68,0,0,0-.45.17.7.7,0,0,0,0,.9L8.09,9l-2.7,2.7a.7.7,0,0,0,0,.9.67.67,0,0,0,.45.16.64.64,0,0,0,.45-.16L9,9.91l2.7,2.77a1,1,0,0,0,.45.15.64.64,0,0,0,.45-.22.7.7,0,0,0,0-.9L9.89,9l2.7-2.7a.7.7,0,0,0,0-.9.66.66,0,0,0-.45-.17M9,16.74A7.73,7.73,0,0,1,9,1.29a7.85,7.85,0,0,1,5.47,2.25A7.74,7.74,0,0,1,9,16.74M9,0A9,9,0,0,0,2.62,2.64,9.2,9.2,0,0,0,0,9a9,9,0,0,0,9,9,9.2,9.2,0,0,0,6.37-2.62A9,9,0,0,0,9,0"/>
      </svg>
    </SvgStyle>
  }
};
