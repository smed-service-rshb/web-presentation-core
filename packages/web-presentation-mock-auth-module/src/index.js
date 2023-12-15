import createLoginPage from './pages/LoginPage'
import * as Actions from './actions/index'

export default rights => ({name, page, action}) => {
    name('login');
    page(createLoginPage(rights));
    Object.keys(Actions).forEach(actionDescription => {
        action(Actions[actionDescription]);
    });

}
