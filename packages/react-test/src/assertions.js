function toBePresent(received) {
    const pass = received.length !== 0;
    const message = pass
        ? () => `${this.utils.matcherHint('.not.toBePresent')} \n\n Expected results to contain 0 nodes, instead found ${received.length}.`
        : () => `${this.utils.matcherHint('.toBePresent')} \n\n Expected to contain at least 1 node, instead found none.`;
    return {message, pass}
}

function toBeFocused(received) {
    const pass = received.getDOMNode() === document.activeElement;
    const message = pass
        ? () => `${this.utils.matcherHint('.not.toBeFocused')} \n\n Expected value to be ${this.utils.printExpected(document.activeElement)}.`
        : () => `${this.utils.matcherHint('.toBeFocused')} \n\n Expected value to be ${this.utils.printExpected(document.activeElement)}.`;

    return {message, pass}
}

expect.extend({
    toBePresent,
    toBeFocused,
});
