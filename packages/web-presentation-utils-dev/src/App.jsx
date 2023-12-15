import React from 'react';
import {render as renderDOM} from 'react-dom'

import {DevApplication} from './dev-app'
import AppConfig from 'AppConfig';

const createDevApp = (modulesDefinition, navigationTree = () => ([]), restClientSettings = {}) => {
    return <DevApplication modulesDefinition={modulesDefinition}
                           navigationTree={navigationTree}
                           restClientSettings={restClientSettings}/>
};

const DevApp = ({cfg, restSettings}) => createDevApp(cfg.modules, cfg.navigation, restSettings);

const render = (container, restSettings) => {
    renderDOM(<DevApp cfg={AppConfig} restSettings={restSettings}/>, container)
};

export {render};
