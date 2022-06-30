import inquirer from 'inquirer';
import { addToDb, generateUserInfoQuestion, getItemFromDb } from './services';

export const inquirerStream = async (): Promise<void> => {
  try {
    await questionLoop();
  } catch (error: any) {
    if (error.isTtyError) {
      console.log('Your console environment is not supported!');
    } else {
      console.log(error);
    }
  }
};

const questionLoop = async (): Promise<void> => {
  const lStreamAnswers = await inquirer.prompt(generateUserInfoQuestion());
  const { user, db } = lStreamAnswers;

  if (!!db && 'provideName' in db) {
    await getUser(db.provideName);
  }

  if ('age' in user) {
    await addToDb(user);
    return await questionLoop();
  }
};

const getUser = async (inUserName: string): Promise<void> => {
  const lFoundUser = await getItemFromDb(inUserName);

  if (lFoundUser) {
    console.log(lFoundUser);
  } else {
    console.log(`User with provided name ${inUserName} does not exist`);
  }
};
