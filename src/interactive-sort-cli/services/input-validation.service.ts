import readline from 'readline';
import { WRONG_INDEX } from '../constants';

export const inputOptionValidation = async (inInput: string, interaction: readline.Interface): Promise<string> => {
  const lOperationIndexRange = /\b[1-6]\b/;

  return new Promise((resolve) => {
    const operationRange = (inAnswer: string) => {
      if (!lOperationIndexRange.test(inAnswer)) {
        interaction.question(WRONG_INDEX, (answer) => {
          return operationRange(answer);
        });
      } else {
        return resolve(inAnswer);
      }
    };

    operationRange(inInput);
  });
};
