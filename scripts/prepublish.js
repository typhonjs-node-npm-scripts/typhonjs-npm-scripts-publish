'use strict';

/**
 * prepublish -- Runs all scripts defined in `.npmscriptrc` `publish.prepublish.scripts` entry, but only if
 * pre-publish mode is true. Node / NPM currently has a bug (https://github.com/npm/npm/issues/10074) that will run the
 * `prepublish` script when modules are installed or `npm pack` is executed. In these cases it is not desirable to run
 * actual pre-publish actions. NPM module `in-publish` provides pre-publish detection.
 *
 * `.npmscriptrc` must be defined in the root path and contain an object hash `publish` with a `prepublish` hash
 * with the following options:
 * ```
 * (Array<string>)   scripts - An array of executable actions / scripts.
 * ```
 */

var inPublish =   require('in-publish').inPublish();

if (inPublish || process.env.NPM_IN_PUBLISH_TEST)
{
   var runner =   require('typhonjs-npm-scripts-runner');

   runner.run('.npmscriptrc', 'publish.prepublish.scripts', 'Prepublish');
}