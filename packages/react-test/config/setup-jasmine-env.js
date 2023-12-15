import {JUnitXmlReporter} from 'jasmine-reporters';

jasmine.VERBOSE = true;  // eslint-disable-line

const junitReporter = new JUnitXmlReporter({
    savePath: "output/test-reports",
    consolidateAll: false,
});
jasmine.getEnv().addReporter(junitReporter); // eslint-disable-line