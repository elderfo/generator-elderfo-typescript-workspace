'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the transcendent ' +
          chalk.red('generator-elderfo-typescript-workspace') +
          ' generator!'
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Application name',
      },
      {
        type: 'input',
        name: 'version',
        message: 'Application version',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('jest.json'),
      this.destinationPath(`${this.props.name}/jest.json`)
    );

    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath(`${this.props.name}/tsconfig.json`)
    );

    this.fs.copyTpl(
      this.templatePath('_lerna.json'),
      this.destinationPath(`${this.props.name}/lerna.json`),
      { version: this.props.version }
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath(`${this.props.name}/package.json`),
      {
        version: this.props.version,
        name: this.props.name,
      }
    );
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true,
    });
  }
};
