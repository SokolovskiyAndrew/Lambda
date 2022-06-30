import { authorizationServer } from './authorization/server';
import { isPasswordMatch, passwordCrypt } from './authorization/services';
import { runServer } from './correctarium/server';
import { ipLocationRequest } from './geoposition/main';
import { processGiveAwayResults } from './instagram-giveaway/main';
import { jsonDbServer } from './json-db/json-db';
import { jsonSort } from './json-sort/main';
import { inquirerStream } from './primitive-db-cli/primitive-db-cli';
import { createUserVacationFile } from './vacations-grouped/main';

// Task #1: Instagram Giveaway
// processGiveAwayResults();

// Task #2: Group Vacations By User
// createUserVacationFile();

// (async () => {
//   try {
//     await jsonSort();
//   } catch (e) {
//     console.log('MAIN!', e);
//   }
// })();

// ipLocationRequest();

// runServer();

(async () => {
  await inquirerStream();
})();
// runServer();

// authorizationServer();

jsonDbServer();
