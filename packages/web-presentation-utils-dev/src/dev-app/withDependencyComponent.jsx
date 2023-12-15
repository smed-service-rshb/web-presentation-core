import React from 'react';

import {ActionsContext} from "@efr/medservice-web-presentation-core/src/actions/ActionProvider";
import ModalProvider from "@efr/medservice-web-presentation-core/src/modal/ModalProvider";
import PageRouter from "@efr/medservice-web-presentation-core/src/page-router/PageRouter";


export default ({actionResolver, modalResolver, pageResolver}) => Component => class C extends React.Component {
    static CustomLayout = Component.CustomLayout;

    static displayName = `withDependencyComponent(${Component.displayName || Component.name})`;
    static WrappedComponent = Component;

    static propTypes = Component.propTypes;
    static defaultProps = Component.defaultProps;

    static contextTypes = {
        ...ModalProvider.childContextTypes,
        ...PageRouter.childContextTypes,
    };

    static childContextTypes = {
        ...ModalProvider.childContextTypes,
        ...PageRouter.childContextTypes,
    };

    _wrap = (contextName, method, resolver, context) => ({
        [contextName]: {
            ...context[contextName],
            [method]: (key, ...args) => {
                resolver(key);
                return context[contextName][method](key, ...args);
            },
        }
    });

    getChildContext = () => ({
        ...this.context,
        ...this._wrap('modalsLocator', 'get', modalResolver, this.context),
        ...this._wrap('pageRouter', 'open', pageResolver, this.context),
    });

    render = () => (
        <ActionsContext.Consumer>
            {context => (
                <ActionsContext.Provider value={{
                    ...context,
                    ...this._wrap('actionsLocator', 'get', actionResolver, context)
                }}>
                    <Component {...this.props}/>
                </ActionsContext.Provider>
            )}
        </ActionsContext.Consumer>
    );
};
