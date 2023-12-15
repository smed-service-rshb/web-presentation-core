import Mocks, {IB6Mocks} from './src/actions/_mocks_'
import AuthMocks from '@efr/medservice-web-presentation-mock-auth-module/src/actions/_mocks_'

export default () => ({registerMock}) => {
    registerMock(Object.keys(Mocks).map(key => Mocks[key]));
    registerMock(Object.keys(IB6Mocks).map(key => IB6Mocks[key]), '/ib6');

    registerMock(AuthMocks.CREATE_SESSION);
    registerMock(AuthMocks.GET_SESSION)
};
