import React from 'react';
import './styles.css'

export const PreloaderContext = React.createContext();

const Waiter = () => (
    <div className="area-for-loader">
        <div className="preloader-container">
            <div className="circle"/>
            <div className="preloader-text">Подождите,<br/> страница загружается</div>
        </div>
    </div>
);

export default class PreloaderProvider extends React.Component {
    state = {countReq: 0};

    show = () => {
        ++this.state.countReq;
        this.setState({countReq: this.state.countReq})
    };

    hide = () => {
        if (this.state.countReq > 0) {
            --this.state.countReq;
            this.setState({countReq: this.state.countReq})
        }
    };

    preloader = {
        show: this.show,
        hide: this.hide
    };

    render = () => {
        if (this.props.children) {
            return (
                <PreloaderContext.Provider value={this.preloader}>
                    {this.state.countReq > 0 && <Waiter/>}
                    {this.props.children}
                </PreloaderContext.Provider>
            )
        }
        return null
    };
}
