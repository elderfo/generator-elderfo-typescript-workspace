'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('skip-bootstrap');
    this.bootstrap = !this.options['skip-bootstrap'];
  }

  configuring() {
    this.log('');
    this.log(`Creating a new TypeScript project in ${this.props.projectPath}`);
    this.log('');
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay("Let's generate a TypeScript monorepo project!"));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Project name:',
      },
      {
        type: 'input',
        name: 'version',
        message: 'Project version:',
        default: '0.0.1',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.projectPath = path.join(process.cwd(), this.props.name);
    });
  }

  end() {
    this.log('');
    this.log(
      `Success! Created ${this.props.name} at ${this.props.projectPath}`
    );
    this.log('');
    this.log('To create your first package run:');
    this.log('');
    this.log(chalk.cyan('  cd ') + this.props.name);
    this.log(chalk.cyan('  yarn generate-package'));
    this.log('');
  }

  writing() {
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath(`${this.props.name}/webpack.config.js`)
    );

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
    const cwd = process.cwd();
    process.chdir(this.props.projectPath);

    this.installDependencies({
      bower: false,
      npm: false,
      yarn: true,
    }).then(() => {
      if (this.bootstrap) {
        this.spawnCommandSync('yarn', ['run', 'bootstrap']);
        this.spawnCommandSync('yarn', [
          'add',
          'generator-elderfo-typescript-project',
          '-D',
          '-W',
        ]);
      }

      process.chdir(cwd);
    });
  }
};
