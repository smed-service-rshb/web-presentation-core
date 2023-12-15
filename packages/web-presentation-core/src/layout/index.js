import DEFAULT, {CustomModeLayout} from './default';
import EMPTY from './empty'
import Layout from './Layout';


export {
    DEFAULT,
    EMPTY,
    Layout,
    CustomModeLayout,
}

export const AllPagePropsMenuDataLayout = CustomModeLayout(({currentPage} = {}) => ({...currentPage.params}));
export const ManuallySetupMenuDataLayout = CustomModeLayout();
