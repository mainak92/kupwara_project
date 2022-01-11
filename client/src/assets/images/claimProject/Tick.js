import React, { Component } from 'react';
import SvgStyle from './svgStyle';

export default class Tick extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <SvgStyle>
      <svg id="Layer_3" data-name="Layer 3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <g id="check-circle-o">
      <path id="Shape-19" className="cls-1" d="M9,18a9,9,0,1,1,6.36-2.64A8.88,8.88,0,0,1,9,18ZM9,1.27a7.73,7.73,0,1,0,5.47,2.26A7.72,7.72,0,0,0,9,1.27ZM6.78,12.82a.64.64,0,0,1-.54-.32L4.32,9.15a.63.63,0,0,1,.24-.86h0a.64.64,0,0,1,.86.24h0l1.5,2.63,5.76-5.78a.62.62,0,0,1,.89,0,.63.63,0,0,1,0,.9L7.25,12.61h0l-.15.12a.61.61,0,0,1-.32.08Z" transform="translate(0 0)"/>
      </g>
      </svg>
    </SvgStyle>
  }
};
