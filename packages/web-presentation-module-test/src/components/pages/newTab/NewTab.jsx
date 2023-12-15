import React from 'react';
import {
    compose,
    withPageRouter
} from '@efr/medservice-web-presentation-core';
import {Button, Form, Panel} from '@efr/medservice-web-presentation-ui';
import {PageKeys} from '../index'

class NewTab extends React.Component {

    render = () => {
        const fromButtons = [
            <Button key="open-new-tab"
                    name="Открытие страницы в новой вкладке"
                    dataId="button-open-new-tab"
                    onClick={() => {this.props.pageRouter.openNewTab(PageKeys.LONG_REQUEST_PAGE_KEY)}}
            />,
            <Button key="open-new-tab2"
                    name="Открытие страницы в новой вкладке (с именем окна)"
                    dataId="button-open-new-tab2"
                    onClick={() => {this.props.pageRouter.openNewTab(PageKeys.LONG_REQUEST_PAGE_KEY, {}, "longReq")}}
            />,
        ];

        return (
            <Panel label="MyTest" dataId="my-test-panel">
                <Form buttons={fromButtons} dataId="testForm"/>
            </Panel>
        )
    }
}

export default compose(
    withPageRouter,
)(NewTab)