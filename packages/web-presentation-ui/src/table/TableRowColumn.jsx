import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'

class TableRowColumn extends React.Component {
    render() {
        return <td className={classNames(`align-${this.props.align}`, {'active-cell': this.props.active})} colSpan={this.props.colSpan} onClick={this.props.onClick} style={this.props.style} data-id={this.props.dataId}>
            {this.props.children}
        </td>
    }

    static defaultProps = {
        onClick: (() =>{}),
        align: "left",
        colSpan: "1",
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
        dataId: PropTypes.string.isRequired,

        /**
         * Стиль ячейки
         */
        style: PropTypes.object,

        /**
         * выравнивание в ячейке
         */
        align: PropTypes.oneOf(['center', 'left', 'right']),
        /**
         * Активная ячейка таблицы
         */
        active: PropTypes.bool,
        /**
         * Количество ячеек для объединения по горизонтали
         */
        colSpan: PropTypes.string,
    }
}
export default TableRowColumn