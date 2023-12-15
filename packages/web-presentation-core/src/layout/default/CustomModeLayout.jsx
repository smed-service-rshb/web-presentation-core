import React, {Component} from 'react';

import {withPageRouter} from '../../page-router';
import {compose} from '../../utils';
import Layout from '../Layout';

import DEFAULT from './DefaultLayout';


const fillMenuItemParams = (menuData, params) => (menuData || []).map(item => ({
    ...item,
    params: {
        ...item.params,
        ...params,
    },
    children: item.children && fillMenuItemParams(item.children, params),
}));

const LayoutWrapper = paramsResolver => compose(
    withPageRouter,
)(class LayoutWrapper extends Component {
    state = {};

    _setLayoutData = data => {
        this.setState(data);
    };

    render = () => {
        const {children, pageRouter, menuData, ...otherProps} = this.props;
        const currentPage = pageRouter.currentPage();

        const newParams = paramsResolver({
            currentPage,
            state: this.state,
        });

        const newLayoutProps = {
            menuData: fillMenuItemParams(menuData, newParams),
        };

        return (
            <DEFAULT {...otherProps} {...newLayoutProps}>
                <children.type {...otherProps} {...children.props} setLayoutData={this._setLayoutData}/>
            </DEFAULT>
        );
    }
});

const EMPTY_TRANSFORMER = ({state}) => state;

export default (paramsResolver = EMPTY_TRANSFORMER) => (
    Layout(LayoutWrapper(paramsResolver))
);