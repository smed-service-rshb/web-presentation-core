import {bindGetProp, findComponent} from './utils'

export default originalComponent => {
    originalComponent.findPanel = id => {
        const panel = findComponent(originalComponent, 'Panel', id);
        ['label'].forEach(bindGetProp(panel));
        return panel;
    };
    return originalComponent
}