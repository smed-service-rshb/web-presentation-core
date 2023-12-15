import React from 'react';
import classNames from 'classnames'

import MenuItemPropType from './MenuItemPropType'

const SubMenu = props => {
    if (!props.menuItem || !props.menuItem.children) {
        return null
    }
    return (
        <div className="left-menu-container">
            <div className="left-menu">
                <div className="left-menu-title">{props.menuItem.name}</div>
                {
                    buildTree(props.menuItem)
                }
            </div>
        </div>
    )
};

const itemClick = item =>{
    if (!item.children){
        return item.onClick;
    }
}

const buildTree = (props) => {
    const subMenu = props.children.map(item => {
        return <li className={classNames('left-menu-item', {'left-menu-item-disabled': item.disabled})} key={item.name}>
            <div data-id={item.dataId} onClick={itemClick(item)} className={classNames("left-menu-link", {active: item.active && !item.children}, {'left-menu-item-title': item.children})}>{item.name}</div>
            {!!item.children && buildTree(item)}
        </li>
    });

    return (
        <ul className="left-menu-content">
            {subMenu}
        </ul>
    )
};

SubMenu.propTypes = {
    menuItem: MenuItemPropType
};

export default SubMenu
//TODO покрыть тестами SubMenu