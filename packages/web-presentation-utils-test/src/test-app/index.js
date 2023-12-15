import React from 'react';
import TestHelper from '@efr/medservice-react-test'
//TODO надо с этими зависимостями что-то делать.
import MockPageRouter from '@efr/medservice-web-presentation-core/src/page-router/MockPageRouter'
import {ActionProvider} from '@efr/medservice-web-presentation-core/src/actions/index'
import {ModalProvider} from '@efr/medservice-web-presentation-core/src/modal/index'
import SystemModule from '@efr/medservice-web-presentation-core/src/module-system/index'

import {MOCK_PORT} from '../with-mock'
import wrapComponent from '../ui'
import MockAuthModule from './mockAuthModule'
import TestAuthProvider from './TestAuthProvider'

const NOP = args => args;

const processModuleDefinitions = (...moduleDefinitions) => {
    const actions = [];
    const actionPromises = {};
    const action = actionDefinition => {
        let resolve, reject;
        actionPromises[actionDefinition.name] = new Promise((r, e) => {
            resolve = r;
            reject = e
        });

        const action = args => actionDefinition.action(args)
            .then(result => {
                process.nextTick(resolve);
                return result;
            })
            .catch(error => {
                process.nextTick(reject);
                throw error;
            })
        ;

        actions.push({...actionDefinition, action})
    };
    const modals = [];
    const modal = modalDefinition => {
        modals.push(modalDefinition)
    };

    moduleDefinitions.forEach(definition => definition({name: NOP, page: NOP, action, modal}));

    return {actions, actionPromises, modals}
};

const restClientSettings = {protocol: 'http', host: 'localhost', port: MOCK_PORT, prefix: '/api', timeout: 500};//TODO разобраться с таймаутом

class RightsAccessChecker {
    constructor(allRights = []) {
        this._expectedRights = [...allRights];
        this._uncheckedRights = [...allRights];
        this._unexpectedRights = []
    }

    checked = right => {
        this._uncheckedRights = this._uncheckedRights.filter(uncheckedRight => uncheckedRight !== right);

        if (!this._expectedRights.some(expectedRight => expectedRight === right)) {
            this._unexpectedRights.push(right);
        }
    };

    check = () => {
        if (this._unexpectedRights.length > 0) {
            throw new Error("Неизвестные пермишены: " + JSON.stringify(this._unexpectedRights))
        }
        if (this._uncheckedRights.length > 0) {
            throw new Error("Не все пермишены проверены: " + JSON.stringify(this._uncheckedRights))
        }
    };
}

class TestApplicationComponent extends React.Component {
    state = {};

    _onChangeContext = authContext => {
        this.setState({authContext});
        this.props.onChangeContext();
    };

    render = () => (
        <ActionProvider actions={this.props.actions} restClientSettings={this.props.restClientSettings}>
            <TestAuthProvider onChangeContext={this._onChangeContext}
                              rightsAccessChecker={this.props.rightsAccessChecker}
                              authContext={this.state.authContext}
            >
                <ModalProvider modals={this.props.modals}>
                    <MockPageRouter pageRouter={this.props.pageRouter}>
                        <this.props.Component.type {...this.props.Component.props}/>
                    </MockPageRouter>
                </ModalProvider>
            </TestAuthProvider>
        </ActionProvider>
    )
}

class TestApplication {

    constructor(modulesDefinitions) {
        this._modulesDefinitions = modulesDefinitions;
        this._rightsAccessChecker = new RightsAccessChecker()
    }

    withRights = allRights => {
        this._rightsAccessChecker = new RightsAccessChecker(allRights);
        return this
    };

    withAuthContext = authContextBuilder => {
        this._authContextBuilder = authContextBuilder;
        return this
    };

    render = Component => {
        const {actions, actionPromises, modals} = processModuleDefinitions(this._modulesDefinitions, MockAuthModule(this._authContextBuilder), SystemModule);

        const pageRouter = MockPageRouter.createPageRouter();

        const rightsAccessChecker = this._rightsAccessChecker;

        return new Promise(resolve => {
            const component = TestHelper.render(<TestApplicationComponent
                modals={modals}
                pageRouter={pageRouter}
                rightsAccessChecker={rightsAccessChecker}
                onChangeContext={() => resolve(component)}
                actions={actions}
                restClientSettings={restClientSettings}
                Component={Component}
            />);
        })
            .then(component => component.update())
            .then(component => ({
                component: wrapComponent(component),
                actions: actionPromises,
                pageRouter
            }))
            .then(s => rightsAccessChecker.check() || s)
    };
}

const updater = args => () => {
    args.component.update();
    return args;
};

const waitActions = (...actions) => args => Promise
    .all(actions.map(action => args.actions[action.name]))
    .then(updater(args))
    .catch(updater(args))
;

export default modulesDefinitions => (new TestApplication(modulesDefinitions))

export {waitActions}

