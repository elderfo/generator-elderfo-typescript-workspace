'use strict';
const fs = require('fs');
const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('skip-bootstrap');
    this.bootstrap = !this.options['skip-bootstrap'];
  }

  configuring() {
    this.log('');
    this.log(`Creating a new TypeScript package in ${this.props.projectPath}`);
    this.log('');
  }

  prompting() {
    let defaultVersion = '';

    if (fs.existsSync('package.json')) {
      const packageJson = require(path.join(process.cwd(), 'package.json'));
      defaultVersion = packageJson.version;
    }

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Package name:',
      },
      {
        type: 'input',
        name: 'version',
        message: `Package version:`,
        default: defaultVersion,
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.packagePath = path.resolve(`packages/${props.name}`);
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('__tests__/index.test.ts'),
      this.destinationPath(`${this.props.packagePath}/__tests__/index.test.ts`)
    );

    this.fs.copy(
      this.templatePath('src/index.ts'),
      this.destinationPath(`${this.props.packagePath}/src/index.ts`)
    );

    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath(`${this.props.packagePath}/tsconfig.json`)
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(`${this.props.packagePath}/package.json`),
      {
        version: this.props.version,
        name: this.props.name,
      }
    );
  }

  install() {
    const cwd = process.cwd();
    process.chdir(this.props.packagePath);

    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true,
    }).then(() => {
      process.chdir(cwd);
      if (this.bootstrap) {
        this.spawnCommandSync('yarn', ['run', 'bootstrap']);
      }
    });
  }

  end() {
    this.log('');
    this.log(
      `Success! Created package ${this.props.name} at ${this.props.projectPath}`
    );
    this.log('');
  }
};
