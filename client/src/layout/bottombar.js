import React from 'react';
import { Layout } from 'antd';
import IntlMessages from '../utils/IntlMessages';

const { Footer } = Layout;

const Bottombar = () => (
    <Footer style={{ textAlign: 'center' }}>
    <IntlMessages id="footer.copyright" />
          </Footer>
);

export default Bottombar;