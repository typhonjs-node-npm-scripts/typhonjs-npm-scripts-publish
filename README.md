![typhonjs-npm-scripts-publish](https://i.imgur.com/2vSMiDl.png)

[![NPM](https://img.shields.io/npm/v/typhonjs-npm-scripts-publish.svg?label=npm)](https://www.npmjs.com/package/typhonjs-npm-scripts-publish)
[![Code Style](https://img.shields.io/badge/code%20style-allman-yellowgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)
[![License](https://img.shields.io/badge/license-MPLv2-yellowgreen.svg?style=flat)](https://github.com/typhonjs-node-npm-scripts/typhonjs-npm-scripts-publish/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/typhonjs/TyphonJS.svg)](https://gitter.im/typhonjs/TyphonJS)

[![Build Status](https://travis-ci.org/typhonjs-node-npm-scripts/typhonjs-npm-scripts-publish.svg?branch=master)](https://travis-ci.org/typhonjs-node-npm-scripts/typhonjs-npm-scripts-publish)
[![Dependency Status](https://www.versioneye.com/user/projects/56e5a1b8df573d003a5f5f8b/badge.svg?style=flat)](https://www.versioneye.com/user/projects/56e5a1b8df573d003a5f5f8b)

Provides NPM scripts for pre-publish & publish actions for TyphonJS NPM modules and beyond.

Node / NPM currently has a bug (https://github.com/npm/npm/issues/10074) that will run the
`prepublish` script when modules are installed or `npm pack` is executed. In these cases it is not desirable to run
actual pre-publish actions. NPM module [in-publish](https://www.npmjs.com/package/in-publish) provides pre-publish detection and is used by this module to detect the actual pre-publish script action when `npm publish` is executed.

Please also take note of this [major NPM publish bug](https://github.com/npm/npm/issues/5082) that affects a wide range of Node / NPM versions. Basically, there is a chance that publishing may omit files. It has bitten TyphonJS NPM module publishing many times.

This NPM module runs all scripts defined in the `publish.prepublish.scripts` entry located in `.npmscriptrc` or `.npmscriptrc.js` in the root path of a project. 

For a comprehensive ES6 build / testing / publishing NPM module please see [typhonjs-npm-build-test](https://www.npmjs.com/package/typhonjs-npm-build-test) as it combines this module along with transpiling ES6 sources with Babel, pre-publish script detection, ESDoc dependencies, testing with Mocha / Istanbul and an Istanbul instrumentation hook for JSPM / SystemJS tests. For a full listing of all TyphonJS NPM script modules available please see [typhonjs-node-npm-scripts](https://github.com/typhonjs-node-npm-scripts) organization on GitHub.

------

To configure the prepublish script provide this entry in `package.json` scripts entry:

```
  "devDependencies": {
    "typhonjs-npm-scripts-publish": "^0.4.0"
  },
  "scripts": {
    "prepublish": "node ./node_modules/typhonjs-npm-scripts-publish/scripts/prepublish.js",
  },
```

`.npmscriptrc` or `.npmscriptrc.js` must be defined in the root path and contain a JSON formatted object hash `publish` with a `prepublish` hash
with the following options:
```
(Array<string>)   scripts - An array of executable actions / scripts.
```

Usually two tasks that are helpful when publishing ES6 NPM modules is ensuring all tests succeed and source code is transpiled for distribution. An example of defining these actions to run in `.npmscriptrc`:
```
{
   "publish":
   {
      "prepublish": { "scripts": [ "npm run eslint", "npm run test", "npm run build" ] }
   }
}
```

Please note that you can add comments to `.npmscriptrc` and `.npmscriptrc.js` must be formatted as a CJS module. Also please see associated TyphonJS NPM scripts modules for how to define test and build scripts or review the documentation for [typhonjs-npm-build-test](https://www.npmjs.com/package/typhonjs-npm-build-test).
