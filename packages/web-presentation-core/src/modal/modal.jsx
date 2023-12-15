import React from 'react';
import PropTypes from 'prop-types';
import ModalProvider from './ModalProvider'
import './styles.css'

const stopPropagation = event => event.stopPropagation();

const modal = (autoClose = false) => Component => {

    return class C extends React.Component {
        constructor(props, context) {
            super(props, context);

            this.modal = {
                close: (action = 'cancel', payload = {}) => {
                    context.close(action, payload)
                }
            };
        }

        render = () => (
            <div className="popup-background" onClick={this._handleClickClose}>
                <div className="popup-container black" onClick={stopPropagation}>
                    {autoClose &&
                        <div className="popup-window-header-close light-gray" onClick={this._handleClickClose}>
                            закрыть
                        </div>
                    }
                    <Component {...this.props} modal={this.modal}/>
                </div>
            </div>
        );

        _handleClickClose = event => {
            event.stopPropagation();
            autoClose && this.modal.close()
        };

        static displayName = `modal(${Component.displayName || Component.name})`;
        static WrappedComponent = Component;

        static contextTypes = ModalProvider.childContextTypes;

        static defaultProps = Component.defaultProps;

        static propTypes = {
            ...Component.propTypes,
            modal: PropTypes.shape({
                /**
                 * Закрыть модальное окно, передав action и payload
                 *    close(action = 'cancel', payload = {})
                 */
                close: PropTypes.func.required
            })
        };
    };
};
modal.window = props => (
    <div>
        <div className="popup-window-header">
            {props.title && <div className="popup-window-title">{props.title}</div>}
        </div>

        <div className="popup-content-message-container">
            <div className="popup-content-message-content">
                {props.children}
            </div>
        </div>

        {props.buttons &&
            <div className="popup-buttons-container">
                {React.Children.toArray(props.buttons)}
            </div>
        }
    </div>
);

export default modal
//TODO покрыть тестами