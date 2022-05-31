import { runServer } from './correctarium/server';
import { ipLocationRequest } from './geoposition/main';
import { processGiveAwayResults } from './instagram-giveaway/main';
import { jsonSort } from './json-sort/main';
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

runServer();
