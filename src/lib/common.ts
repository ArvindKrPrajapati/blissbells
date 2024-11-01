import moment from "moment-timezone";

export const indianDate = (date?: any) => {
  return date ? moment(date) : moment();
};

export const indianNumberFormat = (number: number): string => {
  return number.toLocaleString("en-IN");
};
