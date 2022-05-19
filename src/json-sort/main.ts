import https from 'https';
import { Dictionary, objectKeyDeepSearch, PromiseFulfilledResult, PromiseSettledResult } from '../shared';
import { LAMBDA_PATHS } from './constants';

const JSON_BASE_URL = 'https://jsonbase.com';
const PATH_FIRST_PART = 'lambdajson_';

export const jsonSort = async (): Promise<void> => {
  try {
    const lIsDoneMap: PromiseSettledResult<Dictionary<string>>[] = await Promise.allSettled(
      getFullJsonUrls(LAMBDA_PATHS).map(async (inUrl) => {
        const lResponseBody = await getRequest<Record<string, unknown>>(inUrl);
        const lIsDoneValue = objectKeyDeepSearch<Record<string, unknown>>(lResponseBody, 'isDone');

        return {
          [inUrl]: `isDone - ${lIsDoneValue ? 'True' : 'False'}`
        };
      })
    );

    showFinalResult(lIsDoneMap);
  } catch (e) {
    console.log('Error:', e);
  }
};

const getRequest = <ResponseType>(inUrl: string): Promise<ResponseType> => {
  return new Promise((inResolve, inReject) => {
    const getRequestRetry = (inRetryCount = 3, inRetryAfterMs = 300) => {
      https
        .get(inUrl, (inResponse) => {
          let lResponseBody = '';
          inResponse.setEncoding('utf-8');

          inResponse.on('data', (inResponseChunk) => {
            lResponseBody += inResponseChunk;
          });

          inResponse.on('end', () => {
            if (inResponse?.statusCode === 200) {
              inResolve(JSON.parse(lResponseBody));
            } else {
              //TODO: improve on which http status codes retry should be called
              if (inRetryCount > 0) {
                setTimeout(() => {
                  getRequestRetry(inRetryCount - 1, inRetryAfterMs);
                }, inRetryAfterMs);
              } else {
                inReject(inResponse.statusMessage);
              }
            }
          });
        })
        .on('error', inReject);
    };
    getRequestRetry();
  });
};

const getFullJsonUrls = (inUrlPathMap: Map<string, number[]>): string[] => {
  const lJsonLambdaUrls: string[] = [];
  inUrlPathMap.forEach((inPathIds, inKey) => {
    inPathIds.forEach((inPathId) => {
      lJsonLambdaUrls.push(`${JSON_BASE_URL}/${PATH_FIRST_PART}${inKey}/${inPathId}`);
    });
  });
  return lJsonLambdaUrls;
};

const showFinalResult = (inAllResponseList: PromiseSettledResult<Dictionary<string>>[]): void => {
  const lTrueFalseCounter = inAllResponseList
    .filter((inPromiseRes) => {
      if (inPromiseRes.status === 'rejected') {
        console.error(inPromiseRes.reason);
      }
      return inPromiseRes.status === 'fulfilled';
    })
    .map((inPromiseRes) => {
      const lPromiseResValue = (inPromiseRes as PromiseFulfilledResult<Dictionary<string>>).value;
      const [key, value] = Object.entries(lPromiseResValue)[0];

      console.log(`${key}: ${value}`);
      return value;
    })
    .reduce(
      (inCounter: Dictionary<number>, inIsDone) => {
        inIsDone.includes('True') ? (inCounter['True'] += 1) : (inCounter['False'] += 1);
        return inCounter;
      },
      {
        True: 0,
        False: 0
      }
    );

  console.log(`Value True: ${lTrueFalseCounter['True']}, \nValue False: ${lTrueFalseCounter['False']}`);
};
