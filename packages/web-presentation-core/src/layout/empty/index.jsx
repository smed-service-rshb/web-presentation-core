import React, {Component} from 'react';

import Layout from '../Layout';

class Empty extends Component {
    render = () => React.Children.only(this.props.children);
}

export default Layout(Empty);
