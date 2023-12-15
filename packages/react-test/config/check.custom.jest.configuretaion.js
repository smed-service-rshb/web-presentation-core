const {resolve} = require('path'); //NOSONAR
const {existsSync} = require('fs'); //NOSONAR

const packageJson = require(resolve(process.cwd(), 'package.json')); //NOSONAR
const jasmineConfigPath = resolve(process.cwd(), 'setup-jasmine-env.js');

if (packageJson.jest) {
    throw Error("Необходимо удалить определение секции `jest` в `package.json`")
}
if (existsSync(jasmineConfigPath)) {
    throw Error("Необходимо удалить файл `setup-jasmine-env.js`")
}
