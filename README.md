# generator-elderfo-typescript-project [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Boilerplate generator for typescript monorepos not intended to be published to npm.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-elderfo-typescript-project using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-elderfo-typescript-project
```

Then generate your new project:

```bash
yo elderfo-typescript-project
```

## Configuration

The generator will prompt you for two values:
* `Project Name` - the name of the project. _Note:_ when running the generator, you will want to be in the folder above where you want the package to be created
* `Project Version` - the version to be used with the application

## Structure

The application configuration expects the application to be structured like:

```
<project-name>/
|-- packages/
|-- tools/
|-- jest.json
|-- lerna.json
|-- package.json
|-- tsconfig.json
`-- webpack.config.js
```

* `packages` is for the main applicaiton packages
* `tools` is for dev packages, such as pre-processors, data generators, etc...

## Npm/yarn Run Scripts

* `bootstrap` - convinence method for `lerna bootstrap`
* `build` - runs `build` on all packages with a defined `build` script
* `clean-all` - cleans all `node_modules` and `build` folders
* `dev` - runs the `dev` script in parallel on all packages that have one defined
* `pretest` - pre-builds packages for testing
* `test` - runs tests at a global level
* `generate-package`- generates a package

## License

MIT © [Chris Getsfred](http://www.elderfo.com)


[npm-image]: https://badge.fury.io/js/generator-elderfo-typescript-project.svg
[npm-url]: https://npmjs.org/package/generator-elderfo-typescript-project
[travis-image]: https://travis-ci.org/elderfo/generator-elderfo-typescript-project.svg?branch=master
[travis-url]: https://travis-ci.org/elderfo/generator-elderfo-typescript-project
[daviddm-image]: https://david-dm.org/elderfo/generator-elderfo-typescript-project.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/elderfo/generator-elderfo-typescript-project
[coveralls-image]: https://coveralls.io/repos/elderfo/generator-elderfo-typescript-project/badge.svg
[coveralls-url]: https://coveralls.io/r/elderfo/generator-elderfo-typescript-project
