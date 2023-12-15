import {User, Rights} from './mockAuthContext'

const session = authContextBuilder => () => {
    const userBuilder = User.defaultUser();
    const rightsBuilder = Rights.defaultRights();
    authContextBuilder({user: userBuilder, rights: rightsBuilder.addAll});

    return Promise.resolve({
        user: userBuilder.build(),
        rights: rightsBuilder.build()
    })
};
const NOP = () => ({});

const login = NOP;
const logout = NOP;


export default (authContextBuilder = NOP) => ({action}) => {
    action({
        name: 'auth.session',
        action: session(authContextBuilder)
    });
    action({
        name: 'auth.login',
        action: login
    });
    action({
        name: 'auth.logout',
        action: logout
    });
}