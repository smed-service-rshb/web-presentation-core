#!/usr/bin/env node

const path = require('path');
const CLIEngine = require("eslint").CLIEngine;

const cli = new CLIEngine({
    configFile: path.join(__dirname, '../index.js'),
    useEslintrc: false,
    ignorePattern : ["node_modules/**", "build/**"],
    extensions: ['jsx','js']
});

const report = cli.executeOnFiles(["."]);

if (report.errorCount > 0 || report.warningCount > 0) {
    console.log(cli.getFormatter()(report.results));
    process.exit(1);
}