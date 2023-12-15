#!/usr/bin/env node

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const jest = require('jest'); //NOSONAR
const jestConfig = require('../config/jest.config.js'); //NOSONAR

require('../config/check.custom.jest.configuretaion.js'); //NOSONAR
const argv = [];

argv.push('--env', 'jsdom');
argv.push('--config', JSON.stringify(jestConfig));

jest.run(argv);