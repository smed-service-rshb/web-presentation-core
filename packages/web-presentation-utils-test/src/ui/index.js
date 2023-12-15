import {compose} from '@efr/medservice-web-presentation-core';
import {EnzymeComponentWrapper} from './utils'

import withButton from './button-support'
import withGrid from './grid-support'
import withPanel from './panel-support'

const wrap = originalComponent => compose(
    withButton,
    withGrid,
    withPanel,
)(new EnzymeComponentWrapper(originalComponent, wrap));


export default wrap;


