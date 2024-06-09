import dayjs from "dayjs";

export const isDateBeforeNow = (unixTime: number): boolean => {
  const now = dayjs(); // Get the current date and time
  const dateToCheck = dayjs(unixTime); // Convert the Unix timestamp to a Dayjs object

  return dateToCheck.isBefore(now); // Check if the date is before now
};

export const millisecondsUntilEndOfDay = (): number => {
  // Get the current time
  const now = dayjs();

  // Get the end of the day
  const endOfDay = now.endOf("day");

  // Calculate the difference between now and the end of the day
  const difference = endOfDay.diff(now, "millisecond");

  return difference;
};

export const getHourMinuteDifference = (unixTime: number): number => {
  // Get the current time
  const now = dayjs();

  // Convert the Unix timestamp to a Dayjs object
  const dateToCheck = dayjs(unixTime);

  // Extract hour and minute components from the Unix timestamp
  const hour = dateToCheck.hour();
  const minute = dateToCheck.minute();
  const second = dateToCheck.second();

  // Calculate the difference in hours and minutes
  const hourDifference = now.hour() - hour;
  const minuteDifference = now.minute() - minute;
  const secondDifference = now.second() - second;

  // Convert the differences to milliseconds
  const hourDifferenceMs = hourDifference * 60 * 60 * 1000;
  const minuteDifferenceMs = minuteDifference * 60 * 1000;
  const secondDifferenceMs = secondDifference * 1000;

  // Return the total difference in milliseconds
  return -(hourDifferenceMs + minuteDifferenceMs + secondDifferenceMs);
};

export const getHoursMinutesSeconds = (): number[] => {
  const now = new Date();

  // Extract hours, minutes, and seconds
  const hours = ((now.getHours() + now.getMinutes() / 60) / 12) * 360;
  const minutes = (now.getMinutes() / 60) * 360;
  const seconds = (now.getSeconds() / 60) * 360;

  return [hours, minutes, seconds];
};
