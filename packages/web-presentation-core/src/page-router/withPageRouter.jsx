import React from 'react';
import PageRouter, {pageRouterPropType} from './PageRouter'

const withPageRouter = Component => class C extends React.Component {
    render = () => <Component {...this.props} pageRouter={this.context.pageRouter}/>;

    static displayName = `withPageRouter(${Component.displayName || Component.name})`;
    static WrappedComponent = Component;

    static contextTypes = PageRouter.childContextTypes;

    static propTypes = {
        ...Component.propTypes,
        pageRouter: pageRouterPropType
    };
    static defaultProps = Component.defaultProps;
};
export default withPageRouter