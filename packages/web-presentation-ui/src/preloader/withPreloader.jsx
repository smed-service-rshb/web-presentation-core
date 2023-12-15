import React from 'react';
import {PreloaderContext} from './PreloaderProvider'


const withPreloader = Component => class C extends React.Component {

    render = () => (
        <PreloaderContext.Consumer>
            {preloader => <Component {...this.props} preloader={preloader}/>}
        </PreloaderContext.Consumer>
    );

    static displayName = `withPreloader(${Component.displayName || Component.name})`;
    static WrappedComponent = Component;

    static propTypes = {
        ...Component.propTypes,
    };

    static defaultProps = Component.defaultProps;
};

export default withPreloader