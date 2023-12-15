import React from 'react';
import PropTypes from 'prop-types';


class TableRow extends React.Component {
    render() {
        return <tr onClick={this.props.onClick} data-id={this.props.dataId}>
            {this.props.children}
        </tr>
    };

    static defaultProps = {
        onClick: (() =>{})
    };

    static propTypes = {
        /**
         * Дочерние элементы
         */
        children: PropTypes.node,

        /**
         * Обработчик клика на строку
         */
        onClick: PropTypes.func,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired
    };
}
export default TableRow