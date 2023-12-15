import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

import MenuItemPropType from './MenuItemPropType'

import {withPageRouter} from '../../../page-router'

const MainMenu = props => {

    const handleIndexPage = e => {
        e.preventDefault();
        props.pageRouter.openIndex()
    };

    if (!props.menuItems){
        return null
    }
    return (
        <div className="full-height main-menu-container">
            <div className="main-menu-wrapper">
                <div className="header-logo">
                    <a href="#index" className="logo" onClick={handleIndexPage}> </a>
                </div>
                <ul className="main-menu">
                    {
                        props.menuItems.map(item => {
                            return <li className={classNames('main-menu-item', {active: item.active})}
                                       data-id={item.dataId}
                                       key={item.name}
                                       onClick={item.onClick}>
                                <span>{item.name}</span>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
};

MainMenu.propTypes = {
    menuItems: PropTypes.arrayOf(MenuItemPropType)
};

export default withPageRouter(MainMenu)

//TODO покрыть тестами MainMenu