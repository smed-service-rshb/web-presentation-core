import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './styles.css';

class Dropdown extends React.Component {

    state = {isOpen: false};

    static DropdownTypes = {
        primary: 'primary',
        secondary: 'secondary',
    };

    _handleMouseLeave = (e) => {
        e.target.blur();
    };

    _handleClick = () => {
        if (this.props.disabled) {
            return;
        }
        if (!this.state.isOpen) {
            // добавляем/удаляем обработчик события onClick
            window.addEventListener('click', this._handleOutsideClick, false);
        } else {
            window.removeEventListener('click', this._handleOutsideClick, false);
        }

        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    _handleOutsideClick = e => {
        // игнорируем клики на самом компоненте
        if (this.node.contains(e.target)) {
            return;
        }

        this._handleClick();
    };

    _handleItemClick = onClick => e => {
        e.preventDefault();
        onClick();
        this._handleClick();
    };

    render() {
        if (this.props.values.length === 0) {
            return null
        }
        return (
            <div className={classNames('dropdown', `dropdown-${this.props.type ? this.props.type : ''}`)}
                    id={this.props.id}
                    ref={node => {this.node = node;}}
                    >
                <button className={classNames('dropdown-button', {disabled: this.props.disabled})}
                        onMouseLeave={this._handleMouseLeave}
                        data-id={this.props.id}
                        tabIndex={this.props.tabIndex}
                        onClick={this._handleClick}
                >
                    <span className="dropdown-button-text">{this.props.name}</span>
                </button>
                {this.state.isOpen &&
                <div className="dropdown-list">
                    {
                        this.props.values.map(items => (
                            <a key={items.id}
                               className="dropdown-list-item"
                               onClick={this._handleItemClick(items.onClick)}
                               id={items.id}
                               data-id={items.id}
                               href="#"
                            >
                                {items.name}
                            </a>
                        ))
                    }
                </div>
                }
            </div>

        );
    }

    static propTypes = {
        /**
         *  Название элемента
         */
        name: PropTypes.string.isRequired,
        /**
         * Тип компонента
         */
        type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
        /**
         * Массив элементов меню
         */
        values: PropTypes.arrayOf(
            PropTypes.shape({
                /**
                 * Название элемента
                 */
                name: PropTypes.string.isRequired,
                /**
                 * Идентификатор элемента
                 */
                id: PropTypes.string.isRequired,
                /**
                 *  Обработчик нажатия на элемент
                 */
                onClick: PropTypes.func.isRequired
            })
        ).isRequired,
        /**
         * Признак задизабленности.
         * Не вызывается, если кнопка задизаблена
         */
        disabled: PropTypes.bool.isRequired,
        /**
         *  Идентификатор компонента
         */
        id: PropTypes.string.isRequired,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number
    };

    static defaultProps = {
        disabled: false,
        type: Dropdown.DropdownTypes.primary
    };

}

export default Dropdown