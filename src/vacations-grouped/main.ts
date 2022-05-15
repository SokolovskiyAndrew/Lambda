import { readFile, writeFile } from 'fs';
import { UserVacation, Vacation } from './interfaces';

const FILE_PATH_READ = './assets/vacation-list.json';
const FILE_PATH_WRITE = './assets/user-vacation-list.json';

export const createUserVacationFile = (): void => {
  readFile(`${__dirname}/${FILE_PATH_READ}`, { encoding: 'utf-8' }, (inErr, inVacationList) => {
    if (inErr) {
      console.log('There is a problem with file access:', inErr);
    }

    const lUserVacation: Map<string, UserVacation> = JSON.parse(inVacationList).reduce(
      mapVacationToUserVacation,
      new Map<string, UserVacation>()
    );
    const lContentToSave = JSON.stringify(Array.from(lUserVacation.values()), null, 2);

    writeFile(`${__dirname}/${FILE_PATH_WRITE}`, lContentToSave, (err) => {
      if (err) {
        console.log('The error occurred while creating a new file', err);
        return;
      }
      console.log(`File has been created successfully with ${lUserVacation.size} users`);
    });
  });
};

const mapVacationToUserVacation = (
  inUsers: Map<string, UserVacation>,
  { startDate, endDate, user }: Vacation
): Map<string, UserVacation> => {
  if (inUsers.has(user._id)) {
    inUsers.get(user._id)!.weekendDates.push({ startDate, endDate });

    return inUsers;
  }

  return inUsers.set(user._id, {
    userId: user._id,
    userName: user.name,
    weekendDates: [{ startDate, endDate }]
  });
};
