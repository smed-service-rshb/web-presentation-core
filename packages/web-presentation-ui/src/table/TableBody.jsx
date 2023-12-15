import React from 'react';
import PropTypes from 'prop-types';


class TableBody extends React.Component {
    render() {

        return <tbody>
            {this.props.children}
        </tbody>
    }

    static propTypes = {
        /**
         * Дочерние элементы
         */
        children: PropTypes.node,
    }
}
export default TableBody