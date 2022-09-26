import pluralize from "./pluralize";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const diff = new Date() - date;

  if (diff < MINUTE) {
    return "just now";
  }

  if (diff < HOUR) {
    return `${pluralize(Math.round(diff / MINUTE), "minute")} ago`;
  }

  if (diff < DAY) {
    return `${pluralize(Math.round(diff / HOUR), "hour")} ago`;
  }

  return date.toLocaleDateString("en-US");

  // return new Intl.DateTimeFormat("en-US", {
  //   month: "short",
  //   year: "2-digit",
  // }).format(new Date(date));
};

export default formatDate;
