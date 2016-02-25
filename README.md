![typhonjs-npm-scripts-publish](http://i.imgur.com/2vSMiDl.png)

[![NPM](https://img.shields.io/npm/v/typhonjs-npm-scripts-publish.svg?label=npm)](https://www.npmjs.com/package/typhonjs-npm-scripts-publish)
[![Code Style](https://img.shields.io/badge/code%20style-allman-yellowgreen.svg?style=flat)](https://en.wikipedia.org/wiki/Indent_style#Allman_style)
[![License](https://img.shields.io/badge/license-MPLv2-yellowgreen.svg?style=flat)](https://github.com/typhonjs-node-npm/typhonjs-npm-scripts-publish/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/typhonjs/TyphonJS.svg)](https://gitter.im/typhonjs/TyphonJS)

[![Build Status](https://travis-ci.org/typhonjs-node-npm/typhonjs-npm-scripts-publish.svg?branch=master)](https://travis-ci.org/typhonjs-node-npm/typhonjs-npm-scripts-publish)
[![Dependency Status](https://www.versioneye.com/user/projects/56cea7106b21e500355b1140/badge.svg?style=flat)](https://www.versioneye.com/user/projects/56cea7106b21e500355b1140)

Provides NPM scripts for pre-publish & publish actions for TyphonJS NPM modules and beyond.

Runs all scripts defined in `npm-publish.json` prepublish -> scripts entry, but only if pre-publish mode is true.
Node / NPM currently has a bug (https://github.com/npm/npm/issues/10074) that will run the `prepublish` script when
modules are installed or `npm pack` is executed. In these cases it is not desirable to run actual pre-publish
actions. NPM module [in-publish](https://www.npmjs.com/package/in-publish) provides pre-publish detection.

`npm-publish.json` must be defined in the root path and contain an object hash named `prepublish` with the following options:
```
(Array<string>)   scripts - An array of executable actions / scripts.
```
