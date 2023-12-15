const capitalize = name => name.charAt(0).toUpperCase() + name.slice(1);

const bindSimulate = component => name => {
    component[`simulate${capitalize(name)}`] = () => component.simulate(name);
    return component
};

const bindGetProp = component => name => {
    component[`get${capitalize(name)}`] = () => component.prop(name);
    return component
};
const findComponent = (component, name, id) => component.find(name).filterWhere(grid => grid.prop('dataId') === id);


class EnzymeComponentWrapper {
    constructor(reactWrapper, wrap = _ => (_)) {
        this.reactWrapper = reactWrapper;
        this.length = reactWrapper.length;
        this.wrap = wrap;

        [
            'at',
            'filterWhere',
            'find',
            'simulate',
            'update',
        ].forEach(this.proxyWrap);

        [
            'prop',
            'text',
        ].forEach(this.proxy);
    }

    proxyWrap = methodName => {
        this[methodName] = (...args) => this.wrap(this.reactWrapper[methodName](...args))
    };

    proxy = methodName => {
        this[methodName] = (...args) => this.reactWrapper[methodName](...args)
    };
}

export {
    bindSimulate,
    bindGetProp,
    findComponent,
    EnzymeComponentWrapper
}