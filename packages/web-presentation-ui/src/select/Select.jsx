import React from 'react'
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import SelectComponent from 'react-select'
import classNames  from 'classnames'
import 'react-select/dist/react-select.css';
import './styles.css';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        !this.props.disabled && this.props.onChange && this.props.onChange(value);
    };

    render () {
        if (!this.props.options || this.props.options.length === 0) {
            return null
        }

        return (
            <div className="section select-wrapper"
                 id={this.props.id}
                 data-id={this.props.dataId}
                 style={{'width': this.props.width}}
                 tabIndex={this.props.tabIndex}
                 >

                <SelectComponent
                    openOnFocus
                    arrowRenderer={arrowRenderer}
                    onChange={this.handleChange}
                    options={this.props.options}
                    placeholder={this.props.placeholder || ''}
                    value={this.props.value}
                    clearable={false}
                    searchable={false}
                    disabled={this.props.disabled}
                    menuRenderer={menuRenderer}
                    {...this.props}
                />
            </div>
        );
    }

    static propTypes = {
        /**
         * Идентификатор элемента
         */
        id: PropTypes.string,
        /**
         * Вывод подсказывающего текста
         */
        placeholder: PropTypes.string,
        /**
         * Признак задизабленности
         */
        disabled: PropTypes.bool,
        /**
         * Массив элементов выпадающего списка
         */
        options: PropTypes.arrayOf(
            PropTypes.shape({
                /**
                 * Значение элемента выпадающего списа
                 */
                value: PropTypes.string.isRequired,
                /**
                 * Отображаемое название элемента выпадающего списа
                 */
                label: PropTypes.string.isRequired
            })
        ),
        /**
         * Обработчик нажатия на элемент
         */
        onChange: PropTypes.func,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Ширина элемента.
         * Используются любые единицы измерения (px, %, ...)
         */
        width: PropTypes.string,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number
    };
}

function arrowRenderer () {
    return (
        <div className="select-arrow"></div>
    );
}

function menuRenderer ({
    focusedOption,
    instancePrefix,
    onFocus,
    onSelect,
    optionClassName,
    optionComponent,
    optionRenderer,
    options,
    valueArray,
    valueKey,
    onOptionRef
    }) {
    let Option = optionComponent;

    return (
        <Scrollbars autoHeight autoHeightMax={150}>
            <div className="select-dropdown">
                <div className="select-options">
                    {options.map((option, i) => {
                        let isSelected = valueArray && valueArray.indexOf(option) > -1;
                        let isFocused = option === focusedOption;
                        let optionClass = classNames(optionClassName, {
                            'Select-option': true,
                            'is-selected': isSelected,
                            'is-focused': isFocused,
                            'is-disabled': option.disabled
                            });

                        return (
                            <Option
                                className={optionClass}
                                instancePrefix={instancePrefix}
                                isDisabled={option.disabled}
                                isFocused={isFocused}
                                isSelected={isSelected}
                                key={`option-${i}-${option[valueKey]}`}
                                onFocus={onFocus}
                                onSelect={onSelect}
                                option={option}
                                optionIndex={i}
                                ref={ref => { onOptionRef(ref, isFocused); }}
                            >
                                {optionRenderer(option, i)}
                            </Option>
                            );
                        })}
                </div>
            </div>
        </Scrollbars>
    );
}


export default Select;