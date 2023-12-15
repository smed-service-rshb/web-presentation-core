import React from 'react';
import {compose, withActions} from '@efr/medservice-web-presentation-core';
import {Button, Panel} from '@efr/medservice-web-presentation-ui';

import {PROVIDED_SHARED_ACTION} from '../../../constants/external-actions';


export default compose(
    withActions({
        action: PROVIDED_SHARED_ACTION.name,
    }),
)(
    props => (
        <Panel dataId="panel-id" label="Использование экшкна">
            <Button key="use"
                    name="Использовать"
                    dataId="button-use"
                    onClick={props.actions.action}/>
        </Panel>
    )
);
