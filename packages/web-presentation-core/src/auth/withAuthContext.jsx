import React from 'react';
import {AuthContext} from './AuthProvider'


const withAuthContext = Component => class C extends React.Component {
    render = () => (
        <AuthContext.Consumer>
            {({authContext}) => <Component {...this.props} authContext={authContext}/>}
        </AuthContext.Consumer>
    );

    static displayName = `withAuthContext(${Component.displayName || Component.name})`;
    static WrappedComponent = Component;

    static propTypes = {
        ...Component.propTypes,
    };

    static defaultProps = Component.defaultProps;
};

export default withAuthContext;
