import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import RadioButton  from '../radio-button'
import './styles.css';

class Switcher extends React.Component {

    static switcherTypes = {
        primary: 'primary',
        secondary: 'secondary',
        radio: 'radio',
        radioVerticalList: 'radioVerticalList'
    };

    handleClick = (index, event) => {
        if (this.props.disabled) {
            return;
        }

        event.preventDefault();

        if (this.props.selected === index) {
            this.props.unSelectable && this.props.onChange(null);
            return;
        }

        this.props.onChange && this.props.onChange(index);
    };

    _handleMouseLeave = (e) => {
        e.currentTarget.blur();
    };

    render() {
        if (this.props.values.length === 0) {
            return null
        }

        const checked = items => this.props.selected === items.id;

        const radioType = this.props.type === 'radioVerticalList' || this.props.type === 'radio';

        return (
            <div className="switcher">
                <ul className={classNames('switcher_labels', `switcher-${this.props.type}`, {disabled: this.props.disabled})}>
                    {
                        this.props.values.map(items => (
                            <li key={items.id}>
                                <button
                                    className={classNames('switcher-item', {currentSwitcher: checked(items)}, {'switcher-item-radio': radioType})}
                                    id={items.id}
                                    onClick={this.handleClick.bind(this, items.id)}
                                    data-id={this.props.dataId + items.id}
                                    tabIndex={items.tabIndex || 0}
                                    onMouseLeave={this._handleMouseLeave}
                                >
                                    {this.props.type === 'radio' &&
                                        <RadioButton checked={checked(items)}
                                                     onChange={this.handleClick.bind(this, items.id)}
                                                     dataId={`radio-` + this.props.dataId +  items.id}
                                                     tabIndex={-1}
                                                     disabled={this.props.disabled}
                                        />
                                    }

                                    {this.props.type === 'radioVerticalList' &&
                                        <RadioButton checked={checked(items)}
                                                     onChange={this.handleClick.bind(this, items.id)}
                                                     dataId={`radio-` + this.props.dataId +  items.id}
                                                     tabIndex={-1}
                                                     disabled={this.props.disabled}
                                        />
                                    }
                                    <span className="switcher-item-text">{items.name}</span>

                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }

    static propTypes = {
        /**
         * Активный переключатель.
         */
        selected: PropTypes.string,
        /**
         * Массив переключателей
         */
        values: PropTypes.arrayOf(
            PropTypes.shape({
                /**
                 * Название переключателя
                 */
                name: PropTypes.string.isRequired,
                /**
                 * Идентификатор переключателя
                 */
                id: PropTypes.string.isRequired
            })
        ).isRequired,
        /**
         * Обработчик нажатия на переключатель:
         *    function onChange(valueId)
         * valueId - идентификатор выбранного переключателя
         * не срабатывает на активном элементе
         */
        onChange: PropTypes.func.isRequired,
        /**
         * Тип переключателя
         */
        type: PropTypes.oneOf(['primary', 'secondary', 'radio', 'radioVerticalList']).isRequired,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number,
        /**
         * Признак задизабленности.
         * Не вызывается onClick, если кнопка задизаблена
         */
        disabled: PropTypes.bool.isRequired,
        /**
         * Возможность снять текущее выделение переключателя.
         */
        unSelectable: PropTypes.bool.isRequired,
        /**
         * data-id свитчера
         */
        dataId: PropTypes.string

    };

    static defaultProps = {
        type: Switcher.switcherTypes.primary,
        disabled: false,
        unSelectable: false,
        dataId: "",
        onChange: ()=> null
    }
}
export default Switcher