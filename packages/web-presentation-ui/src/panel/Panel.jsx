import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../hint';
import './styles.css'

const RightData = ({rightData, rightDataWidth}) => {
    if (!rightData) {
        return null;
    }
    const style = {};
    if (rightDataWidth) {
        style.width = rightDataWidth;
    }
    return <div className="panel-right-text" style={style}>{rightData}</div>;
};

class Panel extends React.Component {
    render() {
        return (
            <div className="panel-wrapper" data-id={this.props.dataId}>
                {this.props.labelSecondary &&
                <label className="panel-label-secondary">
                    {this.props.labelSecondary}
                    <RightData {...this.props}/>
                </label>
                }
                {this.props.label &&
                <label className="panel-label">{this.props.label}
                    {this.props.hint &&
                    <Hint>
                        {React.Children.toArray(this.props.hint)}
                    </Hint>
                    }
                </label>
                }
                <div className="panel-content">{this.props.children}</div>
            </div>
        )
    }

    static propTypes = {
        /**
         * Основной заголовок панели
         */
        label: PropTypes.string,
        /**
         * Дополнительный заголовок панели
         */
        labelSecondary: PropTypes.string,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Отображение подсказки
         */
        hint: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.element),
            PropTypes.element,
            PropTypes.string
        ]),
        /**
         * Дополнительные элементы справа
         */
        rightData: PropTypes.node,
        /**
         * Ширина блока элементов справа
         */
        rightDataWidth: PropTypes.string
    };
}

export default Panel