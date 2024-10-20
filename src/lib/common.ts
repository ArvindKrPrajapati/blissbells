import moment from "moment-timezone";

export const indianDate = (date?: any) => {
  return date ? moment(date) : moment();
};
