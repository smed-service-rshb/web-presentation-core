import authorization from './authorization'

describe('authorization', () => {

    test('When undefined right => checkPermission return false', () => {
        const unexpectedRight = 'some-right';
        expect(authorization()(unexpectedRight)).toEqual(false);
    });

    test('When null right => checkPermission return false', () => {
        const unexpectedRight = 'some-right';
        const availableRight = null;
        expect(authorization(availableRight)(unexpectedRight)).toEqual(false);
    });

    test('When empty right => checkPermission return false', () => {
        const unexpectedRight = 'some-right';
        const availableRight = [];
        expect(authorization(availableRight)(unexpectedRight)).toEqual(false);
    });

    test('When check absent right => return false', () => {
        const unexpectedRight = 'another-right';
        const availableRight = ['some-right'];
        expect(authorization(availableRight)(unexpectedRight)).toEqual(false);
    });

    test('When check available right => return true', () => {
        const expectedRight = "some-right";
        const availableRight = [expectedRight];
        expect(authorization(availableRight)(expectedRight)).toEqual(true);
    });
});