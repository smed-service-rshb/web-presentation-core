const equals = (page, currentPage) => {
    if (page === currentPage) {
        return true;
    }

    if (!(page instanceof Object) || !(currentPage instanceof Object)) {
        return false;
    }

    if (page.key !== currentPage.key) {
        return false
    }

    for (const param in page.params) {
        if (!page.params.hasOwnProperty(param)) {
            continue;
        }

        if (!currentPage.params.hasOwnProperty(param)) {
            return false;
        }

        if (page.params[param] !== currentPage.params[param]) {
            return false;
        }
    }
    return true
};

const related = (menuItemDefinition, currentPage) => menuItemDefinition.related && menuItemDefinition.related.some(relationRule => {
    if (typeof relationRule === 'function') {
        return !!relationRule(currentPage);
    }

    if (typeof relationRule === 'string' || relationRule instanceof String) {
        return relationRule === currentPage.key;
    }
    return false
});

const isActive = (page, currentPage) => equals(page, currentPage) || related(page, currentPage);

const fakeOnClickObject = {
    onClick: e => {
        e.preventDefault();
    }
};

const onClick = (page, pageRouter) => e => {
    e.preventDefault();
    !page.disabled && !page.href && pageRouter.open(page.key, page.params);
    !page.disabled && page.href && pageRouter.openExternalPage(page.href);
};

const checkMenuItem = itemDefinition => {
    if (!itemDefinition.dataId && !itemDefinition.disabled) {
        console.log(`Нужно задать dataId для ${itemDefinition.name}`);
        throw new Error("Нужно задать dataId для " + itemDefinition.name);
    }

    return {
        then: item => item,
    };
};

const defaultGroup = 'defaultGroup';

const menuLeafItem = itemDefinition => checkMenuItem(itemDefinition).then({
    for: pageRouter => {
        const active = isActive(itemDefinition, pageRouter.currentPage() || {});
        const group = itemDefinition.mode || defaultGroup;
        const activeGroup = active ? group : null;

        const switchTo = switchedGroup => (group === switchedGroup || group === defaultGroup) ? {
            ...itemDefinition,
            active,
            onClick: onClick(itemDefinition, pageRouter),
            page: itemDefinition,
        } : null;

        return {
            active,
            group,
            activeGroup,
            switchTo,
        }
    },
});

const menuNodeItem = itemDefinition => checkMenuItem(itemDefinition).then({
    for: pageRouter => {
        const menuItem = itemDefinition => itemDefinition.children ? menuNodeItem(itemDefinition) : menuLeafItem(itemDefinition);
        const menuItemsWithRouter = (itemDefinition.children || []).map(menuItem).map(menuItem => menuItem.for(pageRouter));
        const activeMenuItem = menuItemsWithRouter.find(element => element.active);
        const active = !!activeMenuItem;
        const activeGroup = active ? activeMenuItem.activeGroup : null;
        return {
            active,
            activeGroup,
            switchTo: group => {
                const children = menuItemsWithRouter.map(menuItem => menuItem.switchTo(group)).filter(Boolean);
                if (children.length === 0) {
                    return null;
                }
                const {onClick} = children.find(page => !page.disabled) || fakeOnClickObject;
                return {
                    ...itemDefinition,
                    node: true,
                    active: children.some(element => element.active),
                    onClick,
                    children,
                    disabled: children.every(page => page.disabled),
                };
            },
        }
    },
});

export default (menuItemsDefinition, pageRouter) => {
    const rootMenuItemWithRouter = menuNodeItem({
        dataId: menuItemsDefinition,
        children: menuItemsDefinition,
    }).for(pageRouter);
    const activeGroup = rootMenuItemWithRouter.activeGroup || defaultGroup;
    const rootMenuItemSwitchedToActiveGroup = rootMenuItemWithRouter.switchTo(activeGroup) || {children: []};
    return rootMenuItemSwitchedToActiveGroup.children.filter(Boolean).filter(item => !item.disabled);
};
