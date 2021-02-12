export const FormatDate = (date) => {
  let unformatedDate;

  let monthName = [];
  monthName[0] = "Jan";
  monthName[1] = "Feb";
  monthName[2] = "Mar";
  monthName[3] = "Apr";
  monthName[4] = "May";
  monthName[5] = "Jun";
  monthName[6] = "Jul";
  monthName[7] = "Aug";
  monthName[8] = "Sept";
  monthName[9] = "Oct";
  monthName[10] = "Nov";
  monthName[11] = "Dec";

  unformatedDate = date.split("T")[0];
  const [year, month, day] = unformatedDate.split("-");

  return monthName[parseInt(month - 1)] + " " + year;
};
