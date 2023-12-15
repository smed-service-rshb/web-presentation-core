import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Tab extends React.Component {

    propTypes: {
        /**
         * Наименование таба
         */
        label: PropTypes.string.isRequired,
        /**
         * Содержимое таба
         */
        children: PropTypes.element.isRequired,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Количество уведомлений
         */
        badge:  PropTypes.number,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,
        /**
         * Активный таб
         */
        selected: PropTypes.number,
        /**
         * Обработчик изменения активного таба
         */
        onChange: PropTypes.func,
        /**
         * Признак задизабленности
         */
        disabled: PropTypes.bool
    };

    render() {
        return (<div className="tab-content">
                {this.props.children}
            </div>
        );
    }
}
export default Tab