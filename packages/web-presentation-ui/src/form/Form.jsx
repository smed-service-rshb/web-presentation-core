import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import Notification  from '../notification'
import Button from '../button'
import './styles.css'

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.primaryButtonHandler = this.getPrimaryButtonHandler();
    }

    handleKeyPress = event => {
        if (event.which !== 13) {
            return
        }

        event.preventDefault();
        if (this.props.onKeyPress) {
            this.props.onKeyPress();
        }
        else if (this.primaryButtonHandler) {
            this.primaryButtonHandler()
        }
    };

    getPrimaryButtonHandler = ()=> {
        for (let i = 0; i < this.props.buttons.length; i++) {
            if (this.props.buttons[i].props.type === Button.buttonTypes.primary) {
                return this.props.buttons[i].props.onClick;
            }
        }
    };

    render() {
        return (
            <div className={classNames ('form', `field-columns-${this.props.fieldColumns}`)}
                 onKeyPress={this.handleKeyPress}
                 data-id={this.props.dataId}
            >
                {this.props.errors && this.props.errors.length > 0 &&
                    <Notification type="error">
                        <ul className="list">
                            {this.props.errors.map(items => (
                                <li key={items}>
                                    {items}
                                </li>
                            ))}
                        </ul>
                    </Notification>
                }

                {this.props.warnings && this.props.warnings.length > 0 &&
                    <Notification type="warning">
                        <ul>
                            {this.props.warnings.map(items => (
                                <li key={items}>
                                    {items}
                                </li>
                            ))}
                        </ul>
                    </Notification>
                }

                {this.props.notice && this.props.notice.length > 0 &&
                    <Notification type="notice">
                        <ul>
                            {this.props.notice.map(items => (
                                <li key={items}>
                                    {items}
                                </li>
                            ))}
                        </ul>
                    </Notification>
                }

                <div>{this.props.children}</div>

                {this.props.buttons.length > 0 &&
                    <div className="form-buttons">
                        {React.Children.toArray(this.props.buttons)}
                    </div>
                }
            </div>
        )
    }

    static propTypes = {
        /**
         * Количество полей в строке
         */
        fieldColumns: PropTypes.number,
        /*
         * Массив ссылок, являющихся react-компонентами.
         */
        buttons: PropTypes.arrayOf(PropTypes.element),
        /**
         * Событие нажатия клавиши Enter
         */
        onKeyPress: PropTypes.func,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Отображение ошибок
         */
        errors: PropTypes.arrayOf(PropTypes.string),
        /**
         * Отображение предупреждений
         */
        warnings: PropTypes.arrayOf(PropTypes.string),
        /**
         * Отображение информационных сообщений
         */
        notice: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {
        fieldColumns: 1,
        buttons: []
    };


}
export default Form