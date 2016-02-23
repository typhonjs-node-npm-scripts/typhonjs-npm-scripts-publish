'use strict';

/**
 * prepublish -- Runs all scripts defined in `npm-pre-publish.json` scripts entry, but only if pre-publish mode is true.
 * Node / NPM currently has a bug (https://github.com/npm/npm/issues/10074) that will run the `prepublish` script when
 * modules are installed or `npm pack` is executed. In these cases it is not desirable to run actual pre-publish
 * actions. NPM module `in-publish` provides pre-publish detection.
 *
 * `npm-pre-publish.json` must be defined in the root path and contains the following options:
 * ```
 * (Array<string>)   scripts - An array of paths to scripts to execute.
 * ```
 */

var inPublish =   require('in-publish').inPublish();

if (inPublish || process.env.NPM_IN_PUBLISH_TEST)
{
   var cp =                require('child_process');
   var fs =                require('fs-extra');
   var stripJsonComments = require('strip-json-comments');

   // Verify that `npm-pre-publish.json` exists.
   try
   {
      if (!fs.statSync('./npm-pre-publish.json').isFile())
      {
         throw new Error("'npm-pre-publish.json' not found in root path.");
      }
   }
   catch(err)
   {
      throw new Error("TyphonJS NPM script (prepublish) error: " + err);
   }

   // Load `npm-pre-publish.json` and strip comments.
   var configInfo = JSON.parse(stripJsonComments(fs.readFileSync('./npm-pre-publish.json', 'utf-8')));

   // Verify scripts entry exists
   if (typeof configInfo.scripts === 'undefined')
   {
      throw new Error(
       "TyphonJS NPM script (prepublish) error: scripts entry is missing in 'npm-pre-publish.json'.");
   }

   if (!Array.isArray(configInfo.scripts))
   {
      throw new Error(
       "TyphonJS NPM script (prepublish) error: scripts entry is not an array in 'npm-pre-publish.json'.");
   }

   // Execute scripts
   for (var cntr = 0; cntr < configInfo.scripts.length; cntr++)
   {
      // Build base execution command.
      var exec = configInfo.scripts[cntr];

      // Notify what command is being executed then execute it.
      process.stdout.write('Prepublish executing: ' + exec + '\n');
      cp.execSync(exec, { stdio: 'inherit' });
   }
}