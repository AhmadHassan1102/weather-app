import moment from "moment";

export const timeConversion = (inputDateString) => {
  const date = moment(inputDateString);

  const formattedDate = date.format("YYYY-MM-DD hh:mm A");

  return formattedDate;
};
