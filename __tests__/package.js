'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const faker = require('faker');

describe('generator-elderfo-typescript-workspace:package', () => {
  const appName = faker.random.word();
  const appVersion = faker.random.number();

  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/package'))
      .withOptions({ 'skip-bootstrap': true })
      .withPrompts({ name: appName, version: appVersion });
  });

  it('should assign name and version to package.json', () => {
    assert.jsonFileContent(`packages/${appName}/package.json`, {
      name: appName,
      version: appVersion,
    });
  });

  it('should copy non-template files', () => {
    assert.file([
      `packages/${appName}/tsconfig.json`,
      `packages/${appName}/__tests__/index.test.ts`,
      `packages/${appName}/src/index.ts`,
    ]);
  });
});
