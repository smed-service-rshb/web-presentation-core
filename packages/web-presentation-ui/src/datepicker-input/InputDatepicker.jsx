import React from 'react';
import PropTypes from 'prop-types';
import Datepicker from '../datepicker';
import Input from '../input';
import classNames from 'classnames'

import './styles.css';


export default class InputDatepicker extends React.Component {

    state = {
        showOverlay: this.props.show && !this.props.disabled
    };

    input = null;

    closeDatepicker = () => this.setState({showOverlay: false});

    openDatepicker = () => !this.props.disabled && this.setState({showOverlay: true});

    onSelectDate = date => {
        this.closeDatepicker();
        this.props.onChange(date);
        this.input.focus();
    };

    render() {
        return (
            <div className="relative" data-id={this.props.dataId}>
                {this.state.showOverlay && <div className="datepicker-background" onClick={this.closeDatepicker}/>}
                <div className="relative datepicker-container">
                    <div className={classNames('datepicker-icon', {disabled: this.props.disabled})}
                         onClick={this.openDatepicker}
                         data-id={this.props.dataId + '-icon'}/>
                    <Input
                        type="text"
                        ref={el => {this.input = el;}}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        disabled={this.props.disabled}
                        onFocusChange={this.props.onInputFocusChange}
                        tabIndex={this.props.tabIndex}
                        dataId={this.props.dataId + '-input'}
                        mask={Input.getDateMask()}
                        error={this.props.error}
                    />
                </div>
                {this.state.showOverlay &&
                    <div className="datepicker-overlay">
                        <Datepicker
                            onChange={this.onSelectDate}
                            value={this.props.value}
                            dataId={this.props.dataId + '-calendar'}/>
                    </div>}
            </div>
        );
    }

    static propTypes = {
        /**
         * Значение инпута
         */
        value: PropTypes.string,

        /**
         * Обработчик изменения значения элемента
         * Первым параметром в функцию передается новое значение поля,
         * вторым значением передается логический признак, обозначающий заполненность поля
         */
        onChange: PropTypes.func.isRequired,

        /**
         * Блокирует доступ и изменение элемента
         */
        disabled: PropTypes.bool,

        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,

        /**
         * Показывать ли DatePicker изначально
         */
        show: PropTypes.bool,

        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,

        /**
         * Признак ошибки валидации поля
         */
        error: PropTypes.bool,

        /**
         * Обработчик изменения фокуса
         * Возвращает true - если происходит событие onFocus на Input
         * Возвращает false - если происходит событие onBlur на Input
         */
        onInputFocusChange: PropTypes.func
    };

    static defaultProps = {
        onInputFocusChange: ()=>{}
    };
}