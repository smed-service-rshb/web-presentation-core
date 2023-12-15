import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './styles.css';

class Label extends React.Component {
    static LabelTypes = {
        primary: 'primary',
        secondary: 'secondary',
    };

    render() {
        return (
            <div className={classNames('label', `label-${this.props.type ? this.props.type : ''}`)}>
                {this.props.children}
            </div>
        )
    }

    static propTypes = {
        /**
         * Содержимое уведомления
         */
        children: PropTypes.string.isRequired,
        /**
         * Тип компонента
         */
        type: PropTypes.oneOf(['primary', 'secondary'])
    };

    static defaultProps = {
        type: Label.LabelTypes.secondary
    };
}
export default Label