import {bindGetProp, bindSimulate, findComponent} from './utils'

export default originalComponent => {
    originalComponent.findButton = id => {
        const button = findComponent(originalComponent, 'Button', id);
        ['name'].forEach(bindGetProp(button));
        ['click'].forEach(bindSimulate(button));
        return button;
    };
    return originalComponent
}
