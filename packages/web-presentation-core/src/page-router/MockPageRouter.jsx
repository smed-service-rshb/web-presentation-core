import React from 'react';
import {PageRouter} from './index'


export default class MockPageRouter extends React.Component {
    static childContextTypes = PageRouter.childContextTypes;

    static childContext = {
        pageRouter: MockPageRouter.pageRouter

    };

    getChildContext() {
        return {pageRouter: this.props.pageRouter}
    }

    render() {
        return <div>{this.props.children}</div>
    }

    static createPageRouter = () => ({
        open: jest.fn(),
        openIndex: jest.fn(),
        openExternalPage: jest.fn(),
        back: jest.fn(),
        currentPage: jest.fn(),
        markPage: jest.fn(),
        markPrevPage: jest.fn()
    })
}