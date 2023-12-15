import React from 'react';
import PropTypes from 'prop-types';

import './styles.css'

import {withPageRouter} from '../../page-router'

import Header from './header'
import Footer from './footer'
import {MainMenu, SubMenu} from './menu'

import buildMenu from './menu-builder'

const DefaultLayout = props => {
    const mainMenu = buildMenu(props.menuData, props.pageRouter);
    const subMenu = mainMenu.find(element => element.active);
    return (
        <div className="full-height">
            <div className="main-container">
                <Header/>
                <MainMenu menuItems={mainMenu}/>
                <div className="wrapper">
                    <SubMenu menuItem={subMenu}/>
                    <div className="content">
                        <div className="container">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

DefaultLayout.propTypes = {
    /**
     * Функция, формирующая дерево навигации(меню)
     */
    menuData: PropTypes.array.isRequired,
};

export default withPageRouter(DefaultLayout)

//TODO покрыть DefaultLayout.jsx