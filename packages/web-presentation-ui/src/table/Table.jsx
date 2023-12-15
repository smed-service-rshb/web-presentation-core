import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Scrollbars} from 'react-custom-scrollbars';

import './styles.css'

class Table extends React.Component {
    render = () => (
        <div className="table-wrap" style={{width: this.props.width}}>
            <Scrollbars autoHeight autoHeightMax={this.props.maxHeight}>
                <table className={classNames('table', this.props.net)}>
                    {this.props.children}
                </table>
            </Scrollbars>
        </div>
    );

    static defaultProps = {
        net: 'horizontal',
        width: '100%',
        maxHeight: '10000px'
    };

    static propTypes = {
        /*
         * Тип отображения сетки(вертикальный, горизонтальный, полный, не отображать)
         * По умолчанию сетка отображается вертикально
         */
        net: PropTypes.oneOf(['vertical', 'horizontal', 'none', 'full']),
        /**
         * Ширина таблицы
         */
        width: PropTypes.string,
        /**
         * Максимальная высота таблицы
         */
        maxHeight: PropTypes.string
    };
}

export default Table