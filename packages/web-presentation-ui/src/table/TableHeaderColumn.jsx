import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'


class TableHeaderColumn extends React.Component {
    render() {

        return <th className={classNames('col-title light-gray', {active: this.props.active})} colSpan={this.props.colSpan} style={this.props.style} onClick={this.props.onClick} data-id={this.props.dataId}>
            {this.props.children}
        </th>
    }

    static defaultProps = {
        onClick: (() =>{}),
        colSpan: "1",
    };

    static propTypes = {
        /**
         * Дочерние элементы
         */
        children: PropTypes.node,

        /*
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
         * Активный столбец таблицы
         */
        active: PropTypes.bool,

        /**
         * Количество ячеек для объединения по горизонтали
         */
        colSpan: PropTypes.string,
    }
}
export default TableHeaderColumn