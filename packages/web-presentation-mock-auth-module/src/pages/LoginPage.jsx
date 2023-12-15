import React from 'react';
import {Button, Grid, Panel} from '@efr/medservice-web-presentation-ui';
import {compose, layouts, withAuthContext, withPageRouter} from "@efr/medservice-web-presentation-core";
import dboMenu from "./dbo-menu.json";

const columns = [
    {key: 'right', name: 'Права'},
];

const transform = rights => rights.map(right => ({right}));

const LoginPage = rights => class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dataSource = Grid.createDataSource(this.getData);
    };

    getData = () => (
        Promise.resolve(transform(rights))
            .then(result => {
                return ({
                    rows: result,
                    hasMore: false
                })
            })
    );

    _buildAuthContext = () => {
        return {
            "user": {
                "id": "2",
                "surname": "Пупкин",
                "name": "Вася",
                "middleName": "Сергеевич",
                "mobilePhone": "900 000 00 00",
                "email": "mail@mail.ru",
                "position": "ОПР"
            },
            "rights": this.getSelectedRights(),
            menu: dboMenu,
        }
    };

    getSelectedRights = () => this.rightsGrid.getSelectedRows().map(item => item.right);

    _handleLogin = () => {
        const buildAuth = this._buildAuthContext();
        this.props.authContext.login(buildAuth)
            .then(() => {
                this.props.pageRouter.openIndex()
            })
            .catch(console.log)
    };

    render = () => {
        return (
            <Panel label={'Страница входа'} dataId="login-module-panel">
                <Grid
                    columns={columns}
                    dataSource={this.dataSource}
                    emptyMessage="Права не найдены."
                    ref={rightsGrid => this.rightsGrid = rightsGrid}
                    dataId="rightsGridId"
                />
                <div>
                    <Button onClick={this._handleLogin} name="Войти" dataId="buttonLogin"/>
                </div>
            </Panel>
        )
    }
};

export default rights => ({
    key: 'login',
    path: '/login',
    component: compose(
        layouts.EMPTY,
        withPageRouter,
        withAuthContext,
    )(LoginPage(rights)),
    availability: ({authenticated}) => !authenticated,
});