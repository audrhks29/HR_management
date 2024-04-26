const calculateToday = (props: string) => {
  const today = new Date();
  const year = String(today?.getFullYear());
  const month = String(today?.getMonth() + 1).padStart(2, "0");
  const date = String(today?.getDate()).padStart(2, "0");
  const todayDate = `${year}${month}${date}`;

  switch (props) {
    case "year":
      return year;
    case "month":
      return month;
    case "date":
      return date;
    case "todayDate":
      return todayDate;
    default:
      throw new Error("Invalid prop value");
  }
};

export default calculateToday;
