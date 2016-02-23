/**
 * Performs a basic test setting `process.env.NPM_IN_PUBLISH_TEST` to true so that the prepublish script will execute
 * the scripts in `./npm-pre-publish.json` which writes a file to `./test/fixture`. If that file exists the test
 * succeeds.
 */

var fs = require('fs-extra');

// Set variable that allows prepublish.js to execute fully in testing mode.
process.env.NPM_IN_PUBLISH_TEST = true;

fs.emptyDirSync('./test/fixture');

// Run prepublish script in test mode.
require('../../scripts/prepublish');

try
{
   // Verify that `./test/fixture/test.json` exists.
   if (!fs.statSync('./test/fixture/test.json').isFile())
   {
      throw new Error("could not open './test/fixture/test2.json'.");
   }
}
catch (err)
{
   throw new Error('Prepublish Test failed: ' + err);
}

fs.emptyDirSync('./test/fixture');