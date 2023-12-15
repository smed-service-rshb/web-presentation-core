import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import './styles.css'

class Textarea extends React.Component {

    _handleChange = (e) => {
        e.preventDefault();

        //вызываем обработчик только для незадизейбленного элемента
        !this.props.disabled && this.props.onChange && this.props.onChange(e.target.value);
    };

    handleKeyPress = (event) => {
        event.stopPropagation();
    };

    render() {
        return (
            <textarea className={classNames('textarea', {'textarea-error': this.props.error})}
                      value={this.props.value}
                      onChange={this._handleChange}
                      onKeyPress={this.handleKeyPress}
                      rows={this.props.rows}
                      form={this.props.form}
                      maxLength={this.props.maxLength}
                      name={this.props.name}
                      placeholder={this.props.placeholder}
                      disabled={this.props.disabled}
                      tabIndex={this.props.tabIndex}
                      data-id={this.props.dataId}
                      style={{'width': this.props.width}}
            />
        )
    }

    static propTypes = {
        /**
         * Обработчик изменения значения элемента
         */
        onChange: PropTypes.func.isRequired,
        /**
         * Высота поля в строках текста
         */
        rows: PropTypes.number,
        /**
         * Максимальное число введенных символов
         */
        maxLength: PropTypes.number,
        /**
         * Имя поля, предназначенное для его идентификации
         */
        name: PropTypes.string,
        /**
         * Указывает замещающийся текст
         */
        placeholder: PropTypes.string,
        /**
         * Блокирует доступ и изменение элемента
         */
        disabled: PropTypes.bool,
        /**
         * Значение поля
         */
        value: PropTypes.string,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,
        /**
         * Ошибка валидации поля
         */
        error: PropTypes.bool,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Ширина элемента.
         * Используются любые единицы измерения (px, %, ...)
         */
        width: PropTypes.string
    };

}
export default Textarea