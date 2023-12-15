const {resolve} = require('path'); //NOSONAR

module.exports = {
    rootDir: resolve(process.cwd()),
    testURL: 'http://localhost:8888', //NOSONAR
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    testPathIgnorePatterns: [
        '/node_modules/'
    ],
    testMatch: [
        '**/*.test.{js,jsx}'
    ],
    transformIgnorePatterns: [
        '/node_modules/(?!@efr)'
    ],
    setupTestFrameworkScriptFile: resolve(__dirname, 'setup-jasmine-env.js')
};
