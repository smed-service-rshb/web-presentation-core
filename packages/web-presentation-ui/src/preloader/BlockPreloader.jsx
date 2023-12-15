import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'

export default class BlockPreloader extends React.Component {
    render = () => {
        if (this.props.active) {
            return (
                <div className="preloader-container-block">
                    <div className="preloader-text-block">Подождите, информация загружается</div>
                    <div className="circle-block"/>
                </div>
            )
        }
        return <div>{this.props.children}</div>
    };

    static propTypes = {
        /**
         * Признак активности блочного прелоадера
         */
        active: PropTypes.bool,
    };

    static defaultProps = {
        active: false
    };
}
