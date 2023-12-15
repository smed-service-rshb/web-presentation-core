import React from 'react';
import {compose, withPageRouter} from '@efr/medservice-web-presentation-core';
import {Button, Panel} from '@efr/medservice-web-presentation-ui';

import {PROVIDED_SHARED_PAGE} from '../../../constants/external-pages';


export default compose(
    withPageRouter,
)(
    props => (
        <Panel dataId="panel-id" label="Использование страницы">
            <Button key="use"
                    name="Использовать"
                    dataId="button-use"
                    onClick={()=>props.pageRouter.open(PROVIDED_SHARED_PAGE.key)}/>
        </Panel>
    )
);
