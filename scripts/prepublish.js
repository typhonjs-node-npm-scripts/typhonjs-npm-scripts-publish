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
   var cp =                require('child_process');
   var fs =                require('fs');
   var stripJsonComments = require('strip-json-comments');

   // Verify that `.npmscriptrc` exists.
   try
   {
      if (!fs.statSync('./.npmscriptrc').isFile())
      {
         throw new Error("'.npmscriptrc' not found in root path.");
      }
   }
   catch(err)
   {
      throw new Error("TyphonJS NPM script (prepublish) error: " + err);
   }

   // Load `.npmscriptrc` and strip comments.
   var configInfo = JSON.parse(stripJsonComments(fs.readFileSync('./.npmscriptrc', 'utf-8')));

   // Verify that publish entry is an object.
   if (typeof configInfo.publish !== 'object')
   {
      throw new Error(
       "TyphonJS NPM script (prepublish) error: 'publish' entry is not an object or is missing in "
       + "'.npmscriptrc'.");
   }

   // Verify that prepublish entry is an object.
   if (typeof configInfo.publish.prepublish !== 'object')
   {
      throw new Error(
       "TyphonJS NPM script (prepublish) error: 'publish.prepublish' entry is not an object or is missing in "
        + "'.npmscriptrc'.");
   }

   var prepublishConfig = configInfo.publish.prepublish;

   // Verify scripts entry exists
   if (typeof prepublishConfig.scripts === 'undefined')
   {
      throw new Error(
       "TyphonJS NPM script (prepublish) error: 'publish.prepublish.scripts' entry is missing in '.npmscriptrc'.");
   }

   if (!Array.isArray(prepublishConfig.scripts))
   {
      throw new Error(
       "TyphonJS NPM script (prepublish) error: 'publish.prepublish.scripts' entry is not an array in "
        + "'.npmscriptrc'.");
   }

   // Execute scripts
   for (var cntr = 0; cntr < prepublishConfig.scripts.length; cntr++)
   {
      // Build base execution command.
      var exec = prepublishConfig.scripts[cntr];

      // Notify what command is being executed then execute it.
      process.stdout.write('Prepublish executing: ' + exec + '\n');
      cp.execSync(exec, { stdio: 'inherit' });
   }
}