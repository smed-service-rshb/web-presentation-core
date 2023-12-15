import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import './styles.css'

class Button extends React.Component {
    static buttonTypes = {
        primary: 'primary',
        secondary: 'secondary',
        special: 'special',
        additional: 'additional',
        specialOrange: 'specialOrange',
        secondaryGray: 'secondaryGray'
    };

    _handleMouseLeave = (e) => {
        e.target.blur();
    };

    _handleClick = (e) => {
        e.target.blur();
        //вызываем обработчик только для незадизабленной кнопки
        !this.props.disabled && this.props.onClick && this.props.onClick()
    };

    _handleKeyPress = (e) => {
        e.stopPropagation()
    };

    render() {
        return <button
            className={classNames('buttons', `button-${this.props.type}`, {disabled: this.props.disabled}, {'button-icon': this.props.icon && (this.props.type === 'secondary' || this.props.type === 'secondaryGray')})}
            onClick={this._handleClick}
            onMouseLeave={this._handleMouseLeave}
            onKeyPress={this._handleKeyPress}
            data-id={this.props.dataId}
            tabIndex={this.props.tabIndex}
        >
            <span className="buttons-text">
                {this.props.icon && (this.props.type === 'secondary' || this.props.type === 'secondaryGray') &&
                    <img src={this.props.icon} alt="" className="button-icon-item"/>
                }
                {this.props.name}
            </span>
        </button>
    }

    static propTypes = {
        /**
         * Наименование кнопки
         */
        name: PropTypes.string.isRequired,
        /**
         * Обработчик нажатия на кнопку
         * Не вызывается, если кнопка задизаблена
         */
        onClick: PropTypes.func,
        /**
         * Тип кнопки
         */
        type: PropTypes.oneOf(['primary', 'secondary', 'special', 'additional', 'specialOrange', 'secondaryGray']).isRequired,

        /**
         * Признак задизабленности
         */
        disabled: PropTypes.bool.isRequired,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,
        /**
         * Иконка кнопки. Использовать только совместно с типами кнопок secondary и secondaryGray!
         */
        icon: PropTypes.string
    };

    static defaultProps = {
        type: Button.buttonTypes.primary,
        disabled: false
    };

}
export default Button