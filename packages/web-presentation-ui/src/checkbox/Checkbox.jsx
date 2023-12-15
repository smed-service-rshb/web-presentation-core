import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './styles.css';

class Checkbox extends React.Component {
    handleChange = e => {
        !this.props.disabled && this.props.onChange(e.target.checked);
    };

    _handleMouseLeave = () => {
        this.el.blur();
    };

    render() {
        const inputProps = {
            type: "checkbox",
            className: "checkbox",
            onChange: this.handleChange,
            checked: this.props.checked,
            "data-id": this.props.dataId,
            "tabIndex": this.props.tabIndex,
            "ref": el => {this.el = el;}
        };
        if (this.props.disabled) {
            inputProps['disabled'] = 'disabled';
        }
        return (

            <label className={classNames('checkbox-container', {checked: this.props.checked})} onMouseLeave={this._handleMouseLeave}>
                <input{...inputProps}/>
                <span className="checkbox-style"> </span>
                {this.props.description && <span className="checkbox-label">{this.props.description}</span>}
            </label>
        );
    }

    static propTypes = {
        /**
         * Описание checkbox
         */
        description: PropTypes.string,
        /**
         * Обработчик нажатия на checkbox
         * не срабатывает на неактивном элементе
         */
        onChange: PropTypes.func.isRequired,
        /**
         * Активное состояние checkbox
         */
        checked: PropTypes.bool,
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

export default Checkbox