import React from "react";
import {FormattedHTMLMessage, injectIntl} from "react-intl";

const InjectMessage = props => <FormattedHTMLMessage {...props} />;
export default injectIntl(InjectMessage, {
  withRef: false
});
