import React from 'react'
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars';
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import './styles.css';


class Search extends React.Component {

    handleChange = value => {
        !this.props.disabled && this.props.onChange(value);
    };

    closeMenu(){
       this.search.select.closeMenu();
    }

    render () {
        if (!this.props.loadOptions) {
            return null
        }

        return (
            <div className="search search-wrapper" data-id={this.props.dataId} style={{'width': this.props.width}} tabIndex={this.props.tabIndex}>
                <Select.Async
                    ref = {r => this.search=r}
                    openOnFocus={this.props.openOnFocus}
                    onChange={this.handleChange}
                    loadOptions={this.props.loadOptions}
                    placeholder={this.props.placeholder}
                    loadingPlaceholder=""
                    searchPromptText=""
                    noResultsText=""
                    filterOptions={this.props.filterOptions}
                    value={this.props.value}
                    clearable={false}
                    searchable={true}
                    cache = {this.props.cache}
                    multi={this.props.multi}
                    disabled={this.props.disabled}
                    menuRenderer={menuRenderer(this.props.optionRenderer, this.props.customOption)}
                    key={this.props.id}
                    dataId={`search-${this.props.dataId}`}
                    labelKey={this.props.labelKey}
                    valueKey={this.props.valueKey}
                />
            </div>
        );
    }

    static propTypes = {
        /**
         * Признак задизабленности
         */
        disabled: PropTypes.bool,
        /**
         * Функция, возвращающая промис, предоставляющая массив элементов выпадающего списка
         */
        loadOptions: PropTypes.func,
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
         * Значение элемента выпадающего списа
         */
        value: PropTypes.any,
        /**
         * Отображение дополнительного элемента списка
         */
        customOption: PropTypes.arrayOf(PropTypes.element),
        /**
         * Поиск по label
         */
        labelKey: PropTypes.string,
        /**
         * Поиск по value
         */
        valueKey: PropTypes.string,
        /**
         * Вывод подсказывающего текста
         */
        placeholder: PropTypes.string,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,
        /**
         * Кэширование
         */
        cache: PropTypes.bool,
        /**
         * Выбор нескольких значений
         */
        multi: PropTypes.bool,
        /**
         * Фильтрация по умолчанию либо кастомная функция фильтрации
         */
        filterOptions: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func
        ]),
        /**
         * Метод отрисовки элемента выпадающего списка
         */
        optionRenderer: PropTypes.func,
        /**
         *  Открыть меню, когда элемент управления получает фокус
         */
        openOnFocus: PropTypes.bool
    };

    static defaultProps = {
        onChange: ()=>(null),
        customOption: [],
        placeholder: '',
        openOnFocus: true,
    };
}

const menuRenderer = (customOptionRenderer, customOption) =>
    ({
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
    }) => {

    let Option = optionComponent;

    if (customOptionRenderer) {
        optionRenderer = customOptionRenderer;
    }

    return (
        <div className="searching-dropdown">
            <Scrollbars autoHeight autoHeightMax={150}>
                <div className="searching-options">
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
            </Scrollbars>

            {customOption.length > 0 && <div className="searching-link-wrapper">
                {customOption.map((item, index) =><div key={index}>{item}</div>)}
            </div>}
        </div>
    );
};

export default Search;