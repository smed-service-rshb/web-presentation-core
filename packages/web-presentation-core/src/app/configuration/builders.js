const publicPath = process.env.__EFR__PUBLIC_PATH__ || "/efr";

export class PagesBuilder {
    data = [];

    add = (page, moduleName) => {
        const paramTypes = this._calcParamTypes(page.component.propTypes);
        this.data.push({
            ...page,
            path: publicPath + page.path,
            moduleName,
            paramTypes
        })
    };

    _calcParamTypes = propTypes => {
        if (!propTypes) {
            return null
        }
        const paramTypes = {};
        Object.keys(propTypes).forEach(key => {
            paramTypes[key] = {
                parse: propTypes[key].parse || (value => value),
                format: value => value
            }
        });
        return paramTypes
    };

    build = () => (this.data)
}

export class ActionsBuilder {
    data = [];
    add = action => {
        this.data.push(action)
    };

    build = () => (this.data)
}

export class ModalsBuilder {
    data = [];
    add = (modal, moduleName) => {
        this.data.push({
            ...modal,
            moduleName,
        })
    };

    build = () => (this.data)
}

export class NavigationBuilder {
    constructor(tree, pages) {
        this.navigationTree = tree;
        this.pages = pages;
    }

    build = () => this.navigationTree;
}