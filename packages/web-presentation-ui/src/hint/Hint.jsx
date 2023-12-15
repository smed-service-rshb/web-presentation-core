import React from 'react';
import PropTypes from 'prop-types';
import classNames  from 'classnames'
import TetherComponent from 'react-tether'
import './styles.css';

class Hint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    changeOpenState = () => {
        this.setState({isOpen: !this.state.isOpen})
    };

    saveOpenState = () => {
        this.setState({isOpen: this.state.isOpen})
    };

    render() {
        return(
            <div className="hint-container black">
                <TetherComponent attachment="top left" targetAttachment="bottom left">
                    <span className={classNames('hint-container-title green', {'hint-container-title-undotted': this.props.unDotted})}
                          onMouseEnter={this.changeOpenState}
                          onMouseLeave={this.changeOpenState}>
                          {this.props.name}
                    </span>

                    {this.state.isOpen &&
                        <div className={classNames('hint-content', {'full-space': this.props.full})}
                             onMouseEnter={this.saveOpenState}
                             onMouseLeave={this.changeOpenState}
                        >
                            {this.props.children}
                        </div>
                    }
                </TetherComponent>
            </div>
        )
    }
    static propTypes = {
        /**
         * Содержимое подсказки
         */
        children: PropTypes.node.isRequired,
        /**
         * Признак отсутствия отступов контента
         */
        full: PropTypes.bool.isRequired,
        /**
         * Название элемента. По умолчанию выводится подсказка в виде "?"
         */
        name: PropTypes.node.isRequired,
        /**
         * Признак необходимости убрать подчеркивание у name в подсказке
         */
        unDotted: PropTypes.bool.isRequired
    };
}


Hint.defaultProps = {
    full: false,
    name: <div className="hint-icon"></div>,
    unDotted: false
};

export default Hint