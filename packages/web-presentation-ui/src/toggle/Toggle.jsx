import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './styles.css';

class Toggle extends React.Component {
    state = {};

    handleChange = e => {
        !this.props.disabled && this.props.onChange(e.target.checked);
    };

    _handleMouseLeave = () => {
        this.node.blur();
    };

    render() {
        const opts = {};
        if (this.props.disabled) {
            opts['disabled'] = 'disabled';
        }
        return (

            <label className={classNames('toggle', {checked: this.props.checked})}>
                <input type="checkbox"
                       className="toggle-target"
                       onChange={this.handleChange}
                       checked={this.props.checked}
                       data-id={this.props.dataId}
                       tabIndex={this.props.tabIndex}
                       ref={node => {this.node = node;}}
                       {...opts}
                />
                <span className="toggleStyle" onMouseLeave={this._handleMouseLeave}>
                    {this.props.checked && <span className="toggleHint agree">Да</span>}
                    {!this.props.checked && <span className="toggleHint disagree">Нет</span>}
                </span>
                {this.props.description && <span className="toggleLabel" onMouseLeave={this._handleMouseLeave}>{this.props.description}</span>}
            </label>
        );
    }

    static propTypes = {
        /**
         * Описание переключателя
         */
        description: PropTypes.string,
        /**
         * Обработчик нажатия на переключатель
         * не срабатывает на неактивном элементе
         */
        onChange: PropTypes.func.isRequired,
        /**
         * Активное состояние переключателя
         */
        checked: PropTypes.bool.isRequired,
        /**
         * Признак задизабленности
         */
        disabled: PropTypes.bool,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Последовательность перехода между элементами при нажатии на клавишу Tab
         */
        tabIndex: PropTypes.number
    };

    static defaultProps = {
        checked: false,
        onChange: () => (null),
    };
}

export default Toggle