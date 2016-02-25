'use strict';

/**
 * prepublish -- Runs all scripts defined in `npm-publish.json` scripts entry, but only if pre-publish mode is true.
 * Node / NPM currently has a bug (https://github.com/npm/npm/issues/10074) that will run the `prepublish` script when
 * modules are installed or `npm pack` is executed. In these cases it is not desirable to run actual pre-publish
 * actions. NPM module `in-publish` provides pre-publish detection.
 *
 * `npm-publish.json` must be defined in the root path and contain an object hash named `prepublish` with the
 * following options:
 * ```
 * (Array<string>)   scripts - An array of executable actions / scripts.
 * ```
 */

var inPublish =   require('in-publish').inPublish();

if (inPublish || process.env.NPM_IN_PUBLISH_TEST)
{
   var cp =                require('child_process');
   var fs =                require('fs-extra');
   var stripJsonComments = require('strip-json-comments');

   // Verify that `npm-publish.json` exists.
   try
   {
      if (!fs.statSync('./npm-publish.json').isFile())
      {
         throw new Error("'npm-publish.json' not found in root path.");
      }
   }
   catch(err)
   {
      throw new Error("TyphonJS NPM script (prepublish) error: " + err);
   }

   // Load `npm-publish.json` and strip comments.
   var configInfo = JSON.parse(stripJsonComments(fs.readFileSync('./npm-publish.json', 'utf-8')));

   // Verify that prepublish entry is an object.
   if (typeof configInfo.prepublish !== 'object')
   {
      throw new Error(
       "TyphonJS NPM script (prepublish) error: prepublish entry is not an object or is missing in "
        + "'npm-publish.json'.");
   }

   // Verify scripts entry exists
   if (typeof configInfo.prepublish.scripts === 'undefined')
   {
      throw new Error(
       "TyphonJS NPM script (prepublish) error: prepublish scripts entry is missing in 'npm-publish.json'.");
   }

   if (!Array.isArray(configInfo.prepublish.scripts))
   {
      throw new Error(
       "TyphonJS NPM script (prepublish) error: prepublish scripts entry is not an array in 'npm-publish.json'.");
   }

   // Execute scripts
   for (var cntr = 0; cntr < configInfo.prepublish.scripts.length; cntr++)
   {
      // Build base execution command.
      var exec = configInfo.prepublish.scripts[cntr];

      // Notify what command is being executed then execute it.
      process.stdout.write('Prepublish executing: ' + exec + '\n');
      cp.execSync(exec, { stdio: 'inherit' });
   }
}