import React from 'react';
import PropTypes from 'prop-types';
import {withPreloader} from "@efr/medservice-web-presentation-ui";
import {restClientSettingsType, ActionsContext} from './ActionProvider'
import WithPreloader from '../integration/WithPreloader'
import createRestClient, {createBackendUrlBuilder} from '../integration'

const isString = value => typeof value === 'string' || value instanceof String;

const withActions = actionsToProps => Component => {
    const buildGetAction = ({actionsLocator, restClientSettings}, preloader) => actionsDefinition => {
        const rc = createRestClient(restClientSettings);
        const actionName = isString(actionsDefinition) ? actionsDefinition : actionsDefinition.action;
        const RestClient = isString(actionsDefinition) || !actionsDefinition.withoutPreloader ? WithPreloader(preloader)(rc) : rc;
        const action = actionsLocator.get(actionName);
        return (...args) => {
            return action({
                RestClient,
            }, ...args);
        }
    };
    const buildActions = (getAction, existActions) => {
        const result = existActions || {};
        if (!actionsToProps) {
            return result
        }
        for (const actionsName of Object.keys(actionsToProps)) {
            result[actionsName] = getAction(actionsToProps[actionsName])
        }
        return result;
    };

    class C extends React.Component {
        constructor(props) {
            super(props);
            this.getAction = buildGetAction(this.props.actionsContext, props.preloader);
            this.actions = buildActions(this.getAction, props.actions);
        }

        render = () => (
            <Component {...this.props} actions={this.actions} getAction={this.getAction}
                       restClientSettings={this.props.actionsContext.restClientSettings}
                       buildBackendUrl={createBackendUrlBuilder(this.props.actionsContext.restClientSettings)}
            />
        );

        static WrappedComponent = Component;
        static displayName = `withActions(${Component.displayName || Component.name})`;

        static propTypes = {
            ...Component.propTypes,
            actions: PropTypes.object,
            getAction: PropTypes.func,
            restClientSettings: restClientSettingsType,
            buildBackendUrl: PropTypes.func,
        };
        static defaultProps = Component.defaultProps;
    }

    const ResultComponent = props => (
        <ActionsContext.Consumer>
            {actionsContext => <C {...props} actionsContext={actionsContext}/>}
        </ActionsContext.Consumer>
    );

    ResultComponent.propTypes = C.propTypes;
    ResultComponent.defaultProps = Component.defaultProps;

    return withPreloader(ResultComponent);
};

export default withActions