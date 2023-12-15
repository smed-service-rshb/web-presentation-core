import React from 'react';
import {compose, withModals} from '@efr/medservice-web-presentation-core';
import {Button, Panel} from '@efr/medservice-web-presentation-ui';

import {PROVIDED_SHARED_POPUP} from '../../../constants/external-modals';


export default compose(
    withModals({
        popup: PROVIDED_SHARED_POPUP.key,
    })
)(
    props => (
        <Panel dataId="panel-id" label="Использование модального окна">
            <Button key="use"
                    name="Использовать"
                    dataId="button-use"
                    onClick={props.modals.popup}/>
        </Panel>
    )
);
