export default (pages, indexPage) => () => ({
    findApplicable: predicate => {
        for (const page of pages) {
            const result = predicate(page);
            if (!!result) {
                return result
            }
        }
        return null
    },
    get: key => pages.find(page => page.key === key),
    map: (...args) => pages.map(...args),
    index: () => indexPage,
    [Symbol.iterator]: pages[Symbol.iterator],
});
