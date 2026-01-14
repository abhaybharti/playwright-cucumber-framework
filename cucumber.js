// const path = require('path');
import path from 'path';

module.exports = {
  default: {
    require: [
      path.join(__dirname, 'src/tests/steps/**/*.ts'),
      path.join(__dirname, 'src/support/hooks.ts'),
    ],
    requireModule: ['ts-node/register'],
    format: [
      '@cucumber/pretty-formatter',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
    ],
    paths: [path.join(__dirname, 'src/tests/features/**/*.feature')],
    timeout: 30000
  }
};