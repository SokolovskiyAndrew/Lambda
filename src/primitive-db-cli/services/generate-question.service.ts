import { Answers, QuestionCollection } from 'inquirer';
import { isNumber } from '../../shared';
import { userAgeValidation, userNameValidation } from './input.validation';

export const generateUserInfoQuestion = (): QuestionCollection => {
  return [
    {
      name: 'user.name',
      message: 'Please, provide your name. To cancel press Enter:',
      type: 'input',
      validate: userNameValidation
    },
    {
      name: 'user.gender',
      message: 'Choose your gender:',
      type: 'list',
      when: continueUserQuestionnaire,
      choices: ['Male', 'Female']
    },
    {
      name: 'user.age',
      message: 'Provide your age:',
      type: 'input',
      when: continueUserQuestionnaire,
      validate: userAgeValidation,
      filter(input: string): number | string {
        if (isNumber(input)) {
          return parseInt(input, 10);
        }
        return input;
      }
    },
    {
      name: 'db.search',
      message: 'Would you like to search for user?',
      type: 'confirm',
      choices: ['Yes', 'No'],
      when(answers) {
        return !answers.user.name;
      }
    },
    {
      name: 'db.provideName',
      message: 'Please, provide a name of a user you want to find:',
      type: 'input',
      when(answers): boolean {
        return !answers.user.name && answers.db.search;
      }
    }
  ];
};

const continueUserQuestionnaire = (inFirstAnswer: Answers): boolean => {
  const {
    user: { name }
  } = inFirstAnswer;
  return !!name;
};
