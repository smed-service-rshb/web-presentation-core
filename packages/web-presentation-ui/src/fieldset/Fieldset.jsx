import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import './styles.css'

class Fieldset extends React.Component {

    static borders = {
        none: 'none',
        dotted: 'dotted'
    };

    render() {
        return (
            <div className={classNames ('fieldset-container black', `fieldset-container-border-${this.props.border}`, `field-columns-${this.props.columns}`)} >
                {this.props.title && <div className="fieldset-legend">{this.props.title}</div>}
                {this.props.subtitle && <div className="fieldset-subtitle">{this.props.subtitle}</div>}
                <div className="fieldset-content">{this.props.children}</div>
            </div>
        )
    }

    static propTypes = {
        /**
         * Заголовок блока
         */
        title: PropTypes.string,
        /**
         * Подзаголовок блока
         */
        subtitle: PropTypes.string,
        /**
         * Тип границы блока
         */
        border: PropTypes.string,
        /**
         * Количество колонок
         */
        columns: PropTypes.number
    };

    static defaultProps = {
        border: Fieldset.borders.none,
        columns: 1
    };

}
export default Fieldset