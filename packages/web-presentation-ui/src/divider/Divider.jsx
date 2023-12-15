import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import './styles.css'

class Divider extends React.Component {

    static dividerTypes = {
        default: 'default',
        incomplete: 'incomplete',
        clear: 'clear'
    };

    render() {
        return (
            <div className={classNames('divider', `divider-${this.props.type}`)}>
                <div className={classNames('divider-border', {'divider-border-text': this.props.description})}></div>
                {this.props.description && <div className="divider-description">{this.props.description}</div>}
            </div>
        )
    }
    static propTypes = {
        /**
         * Невидимый разделитель
         */
        clear: PropTypes.bool,
        /**
         * Описание разделителя
         */
        description: PropTypes.string,
        /**
         * Тип разделителя
         */
        type: PropTypes.oneOf(['default', 'incomplete', 'clear']).isRequired
    };

    static defaultProps = {
        type: Divider.dividerTypes.default
    };

}
export default Divider