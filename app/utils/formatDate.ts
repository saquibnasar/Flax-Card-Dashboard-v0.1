export const formatDate = (date?: string) => {
  if (!date) {
    return "";
  }

  const originalDate = new Date(date);

  if (isNaN(originalDate.getTime())) {
    return "";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    originalDate
  );

  return formattedDate;
};
