import React, { Component } from 'react';
import SvgStyle from './svgStyle';

export default class AssetGallery extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <SvgStyle>
      <svg id="Asset_Gallery" data-name="Asset Gallery" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.83 15">
        <path id="Fill-1-2" className="color1" d="M2,4V19H21.83V4ZM3,5H20.81v7.47l-4-3.13-4.17,2.9L9.42,8.83,3,12.77Zm0,9,6.23-3.84L16.75,18H3Zm10.37-1,3.44-2.39,4,3.18V18H18.15Z" transform="translate(-2 -4)" />
      </svg>
    </SvgStyle>
  }
};