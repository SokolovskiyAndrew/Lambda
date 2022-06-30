import readline from 'readline';
import { isNumber } from '../shared';
import { DATA_OPERATION, DATA_TO_WORK_WITH, EXIT_INTERACTION, OPERATIONS, SELECT_OPERATION_INDEX } from './constants';
import { ExitInteraction } from './enums';
import { inputOptionValidation } from './services/input-validation.service';

const interaction = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interaction.on('e', () => {
  console.log(EXIT_INTERACTION);
  process.exit(0);
});

export const interactiveSortCli = async (): Promise<void> => {
  try {
    const lStringToOperate = await askQuestion(DATA_TO_WORK_WITH);

    const lOperationIndex = await inputOptionValidation(await askQuestion(chooseOperationQuestion()), interaction);
    const lOperationKey = parseInt(lOperationIndex, 10);
    const lDataToOperate = getDataToOperateOn(lOperationKey, lStringToOperate);

    const lOperationResult = OPERATIONS.get(lOperationKey)!.operation(lDataToOperate);
    console.log('lOperationResult', lOperationResult);
    await interactiveSortCli();
  } catch (e) {
    interaction.emit('close');
  }
};

const askQuestion = async (inQuestion: string): Promise<string> => {
  return new Promise((inResolve, inReject) => {
    interaction.question(inQuestion, (answer) => {
      if (answer === ExitInteraction.Exit) {
        inReject();
      }

      inResolve(answer);
    });
  });
};

const getDigits = (inUserInput: string): string[] => {
  return inUserInput.split(' ').filter((inElement) => isNumber(inElement));
};

const getWords = (inUserInput: string): string[] => {
  return inUserInput.split(' ').filter((inElement) => !isNumber(inElement));
};

const chooseOperationQuestion = (): string => {
  const lOperationOptions = Array.from(OPERATIONS.keys()).reduce((inOperationList, inOperationKey) => {
    inOperationList += `${inOperationKey}. ${OPERATIONS.get(inOperationKey)!.operationName}.\n`;
    return inOperationList;
  }, '');

  return `${DATA_OPERATION} \n${lOperationOptions} \n${SELECT_OPERATION_INDEX}`;
};

const getDataToOperateOn = (inOperationKey: number, inInput: string): string[] => {
  const lDigitOperationIndexList = [2, 3];
  const lWholeInputIndex = 6;

  return inOperationKey === lWholeInputIndex
    ? inInput.split(' ')
    : lDigitOperationIndexList.includes(inOperationKey)
    ? getDigits(inInput)
    : getWords(inInput);
};
