import dayjs from 'dayjs';

export const convertTimestamp = (date) => {
  if (!date) {
    return undefined;
  }
  return dayjs(date).valueOf();
};

export const checkValue = (date) => {
  return Number.isInteger(date) && date.toString().length === 13;
};
