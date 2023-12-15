import checker from './availability-checker'

const checkWithUndefinedAuthContext = checker();
const checkWithNullAuthContext = checker(null);
const checkWithEmptyAuthContext = checker({});
const authContext = v => ({checkPermission: () => v});
const someAuthContext = authContext('sdfsfasfasdfsadfd;fsgsd-gdsfg');

describe('availability-checker', () => {
    test('When availability is boolean => result availability is some', () => {
        const checkers = [
            checkWithUndefinedAuthContext,
            checkWithNullAuthContext,
            checkWithEmptyAuthContext,
            checker(authContext(true)),
            checker(authContext(false)),
            checker(authContext()),
            checker(authContext(null)),
            checker(authContext('sdfsfasfasdfsadfd;fsgsd-gdsfg')),
        ];

        for (let checker of checkers) {
            expect(checker(true)).toBe(true);
            expect(checker(false)).toBe(false);
        }
    });

    test('When availability is not boolean and context not defined => result is false', () => {
        const availabilities = [
            1,
            'sdf23',
            () => true,
            undefined,
            null
        ];
        for (let availability of availabilities) {
            expect(checkWithUndefinedAuthContext(availability)).toBe(false);
            expect(checkWithNullAuthContext(availability)).toBe(false);
        }
    });

    test('When availability is function => function called with context', () => {
        const authContext = someAuthContext;

        const returnValue = true;

        const availability = jest.fn();
        availability.mockReturnValue(returnValue);

        checker(authContext)(availability);

        expect(availability).toHaveBeenCalledWith(authContext);
    });

    test('When availability is function => result related to function result', () => {
        const check = checker(someAuthContext);

        const availabilities = [
            {returnValue: {sdf: 123}, expectedValue: true},
            {returnValue: true, expectedValue: true},
            {returnValue: "www", expectedValue: true},
            {returnValue: 111, expectedValue: true},
            {returnValue: undefined, expectedValue: false},
            {returnValue: null, expectedValue: false},
            {returnValue: false, expectedValue: false},
            {returnValue: 0, expectedValue: false},
        ];


        availabilities.forEach(availabilityCase => {
            const availability = jest.fn();
            availability.mockReturnValue(availabilityCase.returnValue);

            expect(check(availability)).toBe(availabilityCase.expectedValue);
        });
    });

    test('When availability is string => result is checkPermission by this string', () => {
        const positiveCheckPermission = jest.fn();
        positiveCheckPermission.mockReturnValue(true);
        const negativeCheckPermission = jest.fn();
        negativeCheckPermission.mockReturnValue(false);

        const availability = 'some-string';

        expect(checker({checkPermission: positiveCheckPermission})(availability)).toBe(true);
        expect(positiveCheckPermission).toHaveBeenCalledWith(availability);
        expect(checker({checkPermission: negativeCheckPermission})(availability)).toBe(false);
        expect(negativeCheckPermission).toHaveBeenCalledWith(availability);
    });

    test('When availability not boolean, function, string => result false', () => {
        const check = checker(someAuthContext);

        const availabilities = [
            undefined,
            null,
            1,
            {},
        ];

        availabilities.forEach(availabilityCase => {
            expect(check(availabilityCase)).toBe(false);
        });
    });
});