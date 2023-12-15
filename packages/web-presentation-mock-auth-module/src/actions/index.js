import {EFR_SESSION_MARKER_HEADER_NAME} from '@efr/medservice-web-presentation-core'

const contextStoreKey = 'efr-dev-auth-context';

function transform(data, sessionMaker) {
    return {
        ...data,
        sessionMaker,
        user: {
            ...data.user,
            surname: data.user.surname + sessionMaker,
        }
    }
}

const login = ({RestClient}, data) => (
    RestClient
        .post(`/session`)
        .then(res => {
            const sessionMaker = res.headers[EFR_SESSION_MARKER_HEADER_NAME];
            localStorage.setItem(contextStoreKey, JSON.stringify(data));
            return transform(data, sessionMaker);
        })
);

const logout = () => {
    localStorage.removeItem(contextStoreKey);
    return Promise.resolve();
};

const session = ({RestClient}) => {
    const data = localStorage.getItem(contextStoreKey);
    if (!data) {
        return Promise.reject();
    }
    return RestClient
        .get(`/session`)
        .then(res => {
            const sessionMaker = res.headers[EFR_SESSION_MARKER_HEADER_NAME];
            return transform(JSON.parse(data), sessionMaker);
        })
};

export const LoginAction = {
    name: 'auth.login',
    action: login
};

export const LogoutAction = {
    name: 'auth.logout',
    action: logout
};

export const SessionAction = {
    name: 'auth.session',
    action: session
};