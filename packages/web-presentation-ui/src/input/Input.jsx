import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './styles.css'
import InputMask from 'react-text-mask';
import { createNumberMask } from 'text-mask-addons'

const placeholderChar = "_";

class MaskInput extends InputMask {
    focus = () => {
        this.inputElement.focus();
    };

    defaultProps: InputMask.defaultProps;

    propTypes: InputMask.propTypes;
}

class Input extends React.Component {

    static getNumberMask({
        integerLimit = null,
        decimalLimit = 0,
        showThousandsSeparatorSymbol = true
        } = {}) {
        let allowDecimal = decimalLimit !== 0;
        let thousandsSeparatorSymbol = showThousandsSeparatorSymbol ? " " : "";
        return createNumberMask({thousandsSeparatorSymbol, prefix: "", integerLimit, allowDecimal, decimalLimit});
    };

    static getDateMask = () => {
        return [/\d/,/\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];
    };

    static getMobilePhoneMask = () => {
        return ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    };

    convertMaskToPlaceholder = () => {
        if (this.props.placeholder) {
            return this.props.placeholder;
        }
        let mask = this.props.mask;
        if (mask instanceof Array) {
            return mask.map((char) => {
                return (char instanceof RegExp) ? placeholderChar : char
            }).join('');
        }
    };

    isMaskInputFilled = (fullValue, unmaskValue, cursorPosition) =>
        this.props.mask.length && unmaskValue === fullValue && cursorPosition === this.props.mask.length;

    _handleChange = e => {
        //вызываем обработчик только для незадизейбленного элемента
        if (!this.props.disabled) {
            const value = e.target.value;
            if (this.props.mask) {
                const unmaskValue = this.getValueWithoutPlaceholderChars(value);
                this.props.onChange(unmaskValue, this.isMaskInputFilled(value, unmaskValue, e.target.selectionStart));
            }
            else {
                this.props.onChange(value);
            }
        }

    };

    // Публичный метод, ставящий фокус на поле input
    focus = () => {
        this.input.focus();
    };

    handleMaskInputClick = e => {
        if (!this.props.mask) {
            return;
        }
        const value = this.input.inputElement.value;
        const maskPosition = value.indexOf(placeholderChar);
        const cursorPosition = e.target.selectionStart;
        if (maskPosition === -1 || cursorPosition < maskPosition) {
            return;
        }
        this.input.inputElement.setSelectionRange(maskPosition, maskPosition);
    };

    handleInputFocus = () => {
        this.props.onFocusChange(true);
    };

    handleMaskInputFocus = e => {
        this.handleMaskInputClick(e);
        this.props.onFocusChange(true);
    };

    handleInputBlur = () => {
        this.props.onFocusChange(false);
    };

    componentDidMount = () => {
        if (!this.props.mask) {
            return;
        }
        let value = this.input.inputElement.value;
        let valueWithoutPlaceholderChars = this.getValueWithoutPlaceholderChars(value);
        if (valueWithoutPlaceholderChars !== value) {
            this.props.onChange(valueWithoutPlaceholderChars);
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (!this.props.mask) {
            return;
        }
        let value = this.getValueWithoutPlaceholderChars(this.input.inputElement.value);
        if (prevProps.value !== value) {
            this.props.onChange(value);
        }
    };

    getValueWithoutPlaceholderChars = (value) => {
        let placeholderCharPos = value.indexOf(placeholderChar);
        if (placeholderCharPos !== -1) {
            //нельзя делать пропуски при вводе по маске - такие попытки игнорим
            return value.substring(0, placeholderCharPos);
        }
        return value;
    };

    render = () => {
        if (this.props.mask) {
            return <MaskInput className={classNames('input', {'input-error': this.props.error})}
                ref={el => {
                    this.input = el;
                }}
                type={this.props.type}
                value={this.props.value}
                form={this.props.form}
                maxLength={this.props.maxLength}
                name={this.props.name}
                placeholder={this.convertMaskToPlaceholder()}
                disabled={this.props.disabled}
                onChange={this._handleChange}
                onFocus={this.handleMaskInputFocus}
                onBlur={this.handleInputBlur}
                onClick={this.handleMaskInputClick}
                tabIndex={this.props.tabIndex}
                data-id={this.props.dataId}
                style={{'width': this.props.width}}
                mask={this.props.mask}
                guide={true}
                keepCharPositions={false}
                placeholderChar={placeholderChar}
                showMask={false}
            />
        } else {
            return <input className={classNames('input', {'input-error': this.props.error})}
               ref={el => {
                  this.input = el;
               }}
               type={this.props.type}
               value={this.props.value}
               onChange={this._handleChange}
               form={this.props.form}
               maxLength={this.props.maxLength}
               name={this.props.name}
               placeholder={this.props.placeholder}
               disabled={this.props.disabled}
               onFocus={this.handleInputFocus}
               onBlur={this.handleInputBlur}
               tabIndex={this.props.tabIndex}
               data-id={this.props.dataId}
               style={{'width': this.props.width}}
            />
        }

    };

    static propTypes = {
        /**
         * Тип поля.
         * Значение по умолчанию text
         */
        type: PropTypes.oneOf(['text', 'password', 'reset', 'hidden']).isRequired,
        /**
         * Значение поля
         */
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        /**
         * Обработчик изменения значения элемента
         * Первым параметром в функцию передается новое значение поля,
         * для полей с маской (кроме функциональных масок) вторым значением
         * передается логический признак, обозначающий заполненность поля
         */
        onChange: PropTypes.func.isRequired,
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
         * Обработчик изменения фокуса
         * Возвращает true - если происходит событие onFocus
         * Возвращает false - если происходит событие onBlur
         */
        onFocusChange: PropTypes.func,
        /**
         * Ширина элемента.
         * Используются любые единицы измерения (px, %, ...)
         */
        width: PropTypes.string,
        /**
         * Маска.
         * Задается либо функцией либо массивом из RegExp символов
         */
        mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func])
    };

    static defaultProps = {
        value: '',
        onChange: () => (null),
        type: 'text',
        onFocusChange: () => (null)
    };
}

export default Input