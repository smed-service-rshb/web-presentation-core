import React from 'react';
import PropTypes from 'prop-types';

class TableHeader extends React.Component {
    render() {
        return <thead>
            {this.props.children}
        </thead>
    };

    static propTypes = {
        /**
         * Дочерние элементы
         */
        children: PropTypes.node
    }
}
export default TableHeader