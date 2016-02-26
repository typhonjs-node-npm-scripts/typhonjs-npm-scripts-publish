![typhonjs-npm-scripts-publish](http://i.imgur.com/2vSMiDl.png)

[![NPM](https://img.shields.io/npm/v/typhonjs-npm-scripts-publish.svg?label=npm)](https://www.npmjs.com/package/typhonjs-npm-scripts-publish)
[![Code Style](https://img.shields.io/badge/code%20style-allman-yellowgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)
[![License](https://img.shields.io/badge/license-MPLv2-yellowgreen.svg?style=flat)](https://github.com/typhonjs-node-npm/typhonjs-npm-scripts-publish/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/typhonjs/TyphonJS.svg)](https://gitter.im/typhonjs/TyphonJS)

[![Build Status](https://travis-ci.org/typhonjs-node-npm/typhonjs-npm-scripts-publish.svg?branch=master)](https://travis-ci.org/typhonjs-node-npm/typhonjs-npm-scripts-publish)
[![Dependency Status](https://www.versioneye.com/user/projects/56cea7106b21e500355b1140/badge.svg?style=flat)](https://www.versioneye.com/user/projects/56cea7106b21e500355b1140)

Provides NPM scripts for pre-publish & publish actions for TyphonJS NPM modules and beyond.

Node / NPM currently has a bug (https://github.com/npm/npm/issues/10074) that will run the
`prepublish` script when modules are installed or `npm pack` is executed. In these cases it is not desirable to run
actual pre-publish actions. NPM module [in-publish](https://www.npmjs.com/package/in-publish) provides pre-publish detection and used by this module to detect the actual pre-publish script action when `npm publish` is executed.

This NPM modules runs all scripts defined in the `publish.prepublish.scripts` entry located in `npm-scripts.json` in the root path of a project. 

To configure the prepublish script provide this entry in `package.json` scripts entry:

```
  "devDependencies": {
    "typhonjs-npm-scripts-publish": "^0.0.4"
  },
  "scripts": {
    "prepublish": "node ./node_modules/typhonjs-npm-scripts-publish/scripts/prepublish.js",
  },
```

Please note that a collection of scripts for building / testing / publishing is available with the [typhonjs-npm-build-test](https://www.npmjs.com/package/typhonjs-npm-build-test) NPM module. For a full listing of all TyphonJS NPM script modules available please see [typhonjs-node-npm](https://github.com/typhonjs-node-npm) organization on GitHub.

`npm-scripts.json` must be defined in the root path and contain an object hash `publish` with a `prepublish` hash
with the following options:
```
(Array<string>)   scripts - An array of executable actions / scripts.
```

Usually two tasks that are helpful when publishing ES6 NPM modules is ensuring all tests succeed and source code is transpiled for distribution. An example of defining these actions to run in `npm-scripts.json`:
```
{
   "publish":
   {
      "prepublish": { "scripts": [ "npm run test", "npm run build" ] }
   }
}
```
