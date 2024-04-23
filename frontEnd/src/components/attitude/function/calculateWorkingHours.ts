export const calculateWorkingHours = (startTime: string, endTime: string): number => {
  const [startHour, startMinute] = startTime ? startTime.split(":").map(Number) : "";
  const [endHour, endMinute] = endTime ? endTime.split(":").map(Number) : "";

  let hoursDiff = 0;

  if (startTime && endTime) {
    const startDate = new Date();
    startDate.setHours(Number(startHour), Number(startMinute), 0, 0);

    const endDate = new Date();
    endDate.setHours(Number(endHour), Number(endMinute), 0, 0);

    const lunchStart = new Date(startDate);
    lunchStart.setHours(12, 0, 0, 0);
    const lunchEnd = new Date(startDate);
    lunchEnd.setHours(13, 0, 0, 0);

    if (startDate < lunchStart && endDate > lunchEnd) {
      const timeDiffBeforeLunch = lunchStart.getTime() - startDate.getTime();
      const timeDiffAfterLunch = endDate.getTime() - lunchEnd.getTime();
      hoursDiff = Number(((timeDiffBeforeLunch + timeDiffAfterLunch) / (1000 * 60 * 60)).toFixed(1));
    } else {
      const timeDiff = endDate.getTime() - startDate.getTime();
      hoursDiff = Number((timeDiff / (1000 * 60 * 60)).toFixed(1));
    }
  }
  const hour = hoursDiff >= 9 ? hoursDiff - 1 : hoursDiff;
  return hour;
};
