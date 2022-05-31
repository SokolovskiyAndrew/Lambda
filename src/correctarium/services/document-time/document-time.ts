import { getPercentage } from '../../../shared';
import { DOCUMENT_PRICE_LANGUAGE } from '../../config';
import { DocumentLanguage } from '../../types';
import { ExecutionTimeFormat } from '../../interfaces';
import { getTimeStringFormatSlash } from '../../utils';

export const getDocumentExecutionTime = (
  inCharsCount: number,
  inLang: DocumentLanguage,
  isSupportedExt: boolean,
  inCurrentTime: number
): ExecutionTimeFormat => {
  const lStartDate = getStartTime(inCurrentTime);
  const lExecutionTime = getExecutionTime(inCharsCount, inLang, isSupportedExt);
  const lHours = lExecutionTime / (3600 * 1000);
  const lExecutionDate = calculateDeadLine(lStartDate.getTime(), lExecutionTime);

  return {
    time: parseInt(lHours.toString(), 10),
    deadline: lExecutionDate.getTime() - lStartDate.getTime(),
    deadline_date: getTimeStringFormatSlash(lExecutionDate)
  };
};

const decimalToTimeMs = (inDecimal: number): number => {
  const lMinutesInHour = 60;
  let lDecimalTime = inDecimal * Math.pow(lMinutesInHour, 2);
  const lHours = Math.floor(inDecimal);
  lDecimalTime = lDecimalTime - lHours * Math.pow(lMinutesInHour, 2);
  const lMinutes = Math.floor(lDecimalTime / lMinutesInHour);
  lDecimalTime = lDecimalTime - lMinutes * lMinutesInHour;
  const lSeconds = Math.round(lDecimalTime);

  return timeToMillisecondsFormat(lHours, lMinutes, lSeconds);
};

const getExecutionTime = (inCharsCount: number, inLang: DocumentLanguage, isSupportedExt: boolean): number => {
  const { charPerHour } = DOCUMENT_PRICE_LANGUAGE[inLang];
  const lOneHourMs = 3600 * 1000;
  const lHalfHourMs = lOneHourMs / 2;
  const lHoursDigit = Number((inCharsCount / charPerHour).toFixed(4));
  const lTimePercent = getPercentage(20, lHoursDigit);
  const lFinalHoursDigit = lHoursDigit + (isSupportedExt ? 0 : lTimePercent);
  const lOverallExecutionTimeMs = decimalToTimeMs(lFinalHoursDigit) + lHalfHourMs;

  return lOverallExecutionTimeMs > lOneHourMs ? lOverallExecutionTimeMs : lOneHourMs;
};

const getStartTime = (inTodayTimeStamp: number): Date => {
  const lNextDate = new Date(inTodayTimeStamp);

  if (isWeekends(inTodayTimeStamp)) {
    return getNextWorkingMonday(inTodayTimeStamp);
  }

  if (isAfterHours(inTodayTimeStamp)) {
    return getNextWorkDay(inTodayTimeStamp);
  }

  if (isBeforeHours(inTodayTimeStamp)) {
    lNextDate.setHours(10, 0, 0);
    return lNextDate;
  }

  return lNextDate;
};

const calculateDeadLine = (inStartDateTimeStamp: number, inOverallTime: number): Date => {
  const lStartDate = new Date(inStartDateTimeStamp);

  if (leftDayCapacity(inStartDateTimeStamp) >= inOverallTime) {
    lStartDate.setTime(lStartDate.getTime() + inOverallTime);
    return lStartDate;
  }
  const lTimeLeft = inOverallTime - leftDayCapacity(inStartDateTimeStamp);
  const lNextDay = getNextWorkDay(inStartDateTimeStamp);

  return calculateDeadLine(getStartTime(lNextDay.getTime()).getTime(), lTimeLeft);
};

const leftDayCapacity = (inStartDateTimeStamp: number): number => {
  const lStartDate = new Date(inStartDateTimeStamp);
  const lEndDay = new Date(inStartDateTimeStamp);
  lEndDay.setHours(19, 0, 0);

  return lEndDay.getTime() - lStartDate.getTime();
};

const isWeekends = (inTimeStamp: number): boolean => {
  const lDate = new Date(inTimeStamp);
  const lCurrentDayIndex = lDate.getDay();
  const lCurrentHour = lDate.getHours();
  const lWeekendIndexes = [0, 6];
  const lCloseHour = 19;
  const lIsFriday = lCurrentDayIndex === 5;

  return lWeekendIndexes.includes(lCurrentDayIndex) || (lIsFriday && lCurrentHour >= lCloseHour);
};

const isAfterHours = (inTimeStamp: number): boolean => {
  const lDate = new Date(inTimeStamp);
  const lCurrentHour = lDate.getHours();
  const lCloseHour = 19;

  return lCurrentHour >= lCloseHour;
};

const isBeforeHours = (inTimeStamp: number): boolean => {
  const lDate = new Date(inTimeStamp);
  const lCurrentHour = lDate.getHours();
  const lOpenHour = 10;

  return lCurrentHour < lOpenHour;
};

const getNextWorkDay = (inCurrentDateTimeStamp: number): Date => {
  const lCurrentDate = new Date(inCurrentDateTimeStamp);
  const lNextDay = new Date(lCurrentDate.setDate(lCurrentDate.getDate() + 1));
  lNextDay.setHours(10, 0, 0);
  return lNextDay;
};

const getNextWorkingMonday = (inCurrentDateTimeStamp: number): Date => {
  const lCurrentDate = new Date(inCurrentDateTimeStamp);
  const lCurrentDay = lCurrentDate.getDay();
  const lNextDay = new Date(lCurrentDate.setDate(lCurrentDate.getDate() + ((7 - lCurrentDay + 1) % 7 || 7)));
  lNextDay.setHours(10, 0, 0);
  return lNextDay;
};

const timeToMillisecondsFormat = (inHr: number, inMin: number, inSeconds: number): number => {
  const lHoursMs = inHr * 3600 * 1000;
  const lMinutesMs = inMin * 60 * 1000;
  const lSecondsMs = inSeconds * 1000;

  return lHoursMs + lMinutesMs + lSecondsMs;
};
