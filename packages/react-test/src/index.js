import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import './assertions'

Enzyme.configure({adapter: new Adapter()});

const originalConsole = console;

//TODO Warning: Possible EventEmitter memory leak detected. 11 unhandledRejection listeners added. Use emitter.setMaxListeners() to increase limit
process.on('unhandledRejection', error => {
    originalConsole.error(error);
    throw error
});

export default {
    render(component) {
        global.console = {
            ...originalConsole,

            warn: jest.fn(error => {
                originalConsole.warn(error);
                throw new Error(error);
            }),

            error: jest.fn(error => {
                originalConsole.error(error);
                throw new Error(error);
            }),
        };

        const result = mount(component);

        expect(result).toBeDefined();
        expect(console.warn).not.toBeCalled();
        expect(console.error).not.toBeCalled();

        //ХАК. Новый enzyme ищет классы у родителя
        result.hasClass = args => result.children().hasClass(args);
        return result
    },
}
