import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import './styles.css'

class Notification extends React.Component {

    static notificationTypes = {
        warning: 'warning',
        error: 'error',
        notice: 'notice'
    };

    _handleClose = () => {
        this.props.onClose && this.props.onClose();
    };

    render() {
        if (!this.props.isOpen){
            return null;
        }
        return (
            <div className={classNames('notification', `notification-${this.props.type}`)}>
                {this.props.title &&
                    <div className="notification-title black">{this.props.title}</div>
                }
                {this.props.onClose &&
                    <div className="notification-close light-gray" onClick={this._handleClose}>Закрыть</div>
                }
                {this.props.type === 'error' && this.props.isErrorsTitleRequired &&
                    <div className="notification-subtitle bold red">Ошибки</div>
                }
                {this.props.children}
            </div>
        )
    }

    static propTypes = {
        /**
         * Тип предупреждения. По умолчанию warning
         */
        type: PropTypes.oneOf(['warning', 'error', 'notice']).isRequired,
        /**
         * Заголовок блока
         */
        title: PropTypes.string,
        /**
         * Закрытие блока
         */
        onClose: PropTypes.func,
        /**
         * Отображение блока
         */
        isOpen: PropTypes.bool,
        /**
         * Отображение подзаголовка "Ошибки"
         */
        isErrorsTitleRequired: PropTypes.bool
    };

    static defaultProps = {
        type: Notification.notificationTypes.warning,
        isOpen: true,
        isErrorsTitleRequired: true
    };

}
export default Notification