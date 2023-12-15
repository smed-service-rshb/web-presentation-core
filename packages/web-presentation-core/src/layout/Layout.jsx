import React, {Component} from 'react';

export default Layout => TargetComponent => class C extends Component {
    static displayName = `withLayout(${Layout.displayName || Layout.name})`;
    static WrappedComponent = TargetComponent;

    static propTypes = {
        ...TargetComponent.propTypes,
    };
    static defaultProps = TargetComponent.defaultProps;

    static CustomLayout = Layout;

    render = () => <TargetComponent {...this.props}/>;
}
