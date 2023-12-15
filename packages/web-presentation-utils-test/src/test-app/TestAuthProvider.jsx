//TODO надо с этими зависимостями что-то делать.
import React from 'react';
import AuthProvider, {AuthContext} from '@efr/medservice-web-presentation-core/src/auth/AuthProvider'

const checkPermission = (checker, original) => (permission, serviceName) => {
    checker.checked(permission, serviceName);
    return original(permission, serviceName)
};

class AuthContextAdapter extends React.Component {
    buildContext = context => {
        const authContext = context.authContext;
        return {
            ...context,
            authContext: {
                ...authContext,
                checkPermission: checkPermission(this.props.rightsAccessChecker, authContext.checkPermission)
            }
        };
    };
    render = () => (
        <AuthContext.Consumer>
            {context =>
                <AuthContext.Provider value={this.buildContext(context)}>
                    {this.props.children}
                </AuthContext.Provider>
            }
        </AuthContext.Consumer>
    )
}

export default class TestAuthProvider extends React.Component {
    render = () => {
        const props = {
            ...this.props
        };
        delete props.rightsAccessChecker;
        return (
            <AuthProvider {...props}>
                <AuthContextAdapter rightsAccessChecker={this.props.rightsAccessChecker}>
                    {this.props.children}
                </AuthContextAdapter>
            </AuthProvider>
        )
    }
}
