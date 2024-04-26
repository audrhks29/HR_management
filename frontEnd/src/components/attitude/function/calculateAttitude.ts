import { calculateWorkingHours } from "./calculateWorkingHours";

export const calculateAttitude = (commuteData: ExceptAttitude[] | undefined, id: string) => {
  if (commuteData) {
    const today = new Date();
    const year = String(today.getFullYear());
    const month = String(today.getMonth() + 1).padStart(2, "0");

    const index = commuteData.findIndex(item => item.employee_number === id);

    // 구성원 월별 Commute
    const thisMonthAttitude = commuteData[index]?.commuteTime.filter(item => item.date.includes(year + month));

    // 이번 달 근무 일
    const working_count = thisMonthAttitude?.filter(
      item => item?.working_time.includes(":") && item?.quitting_time.includes(":"),
    ).length;

    // // 이번 달 연차 사용 일
    const annual_leave_count = thisMonthAttitude?.reduce((acc, cur) => {
      let extraHours = 0;
      if (cur?.working_time === "연차") {
        extraHours = 1;
      } else if (cur?.working_division === "오전반차" || cur?.quitting_division === "오후반차") {
        extraHours = 0.5;
      }
      return acc + extraHours;
    }, 0);

    // 결근, 병가 일수
    const truancy_count = thisMonthAttitude?.filter(
      item => item?.working_time === "결근" || item?.working_time === "병가",
    ).length;

    // 연장근로 시간
    const overtime_count = thisMonthAttitude?.reduce((acc, cur) => {
      let hours = 0;
      if (cur?.total_time > 8) {
        hours = cur?.total_time - 8;
      } else {
        hours = 0;
      }
      return acc + hours;
    }, 0);

    // 야간근무 시간
    const night_work_count = thisMonthAttitude?.reduce((acc, cur) => {
      const [endHour, endMinute] = cur ? cur.quitting_time.split(":").map(Number) : "";
      let endTime = new Date();
      endTime.setHours(Number(endHour), Number(endMinute), 0, 0);

      let standard_overtime = new Date();
      standard_overtime.setHours(22, 0, 0, 0);

      const endTimeInMilliseconds = endTime.getTime();
      const standardOvertimeInMilliseconds = standard_overtime.getTime();
      const timeDifferenceInMilliseconds = endTimeInMilliseconds - standardOvertimeInMilliseconds;

      // 시간 단위로 변환
      const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

      let hours = 0;
      if (timeDifferenceInHours > 0) {
        hours = timeDifferenceInHours;
      } else {
        hours = 0;
      }
      return acc + hours;
    }, 0);

    const holiday_work_count = thisMonthAttitude?.reduce((acc, cur) => {
      let hours = 0;

      const thisYear = Number(cur.date.substring(0, 4));
      const thisMonth = Number(cur.date.substring(4, 6)) - 1;
      const thisDate = Number(cur.date.substring(6, 8));
      const date = new Date(thisYear, thisMonth, thisDate);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // 근무시간
        const work_hour = calculateWorkingHours(cur.working_time, cur.quitting_time);
        hours = work_hour;
      } else {
        hours = 0;
      }

      return acc + hours;
    }, 0);

    const attitude = {
      month: year + month,
      working_count,
      annual_leave_count,
      truancy_count,
      overtime_count,
      night_work_count,
      holiday_work_count,
    };

    return attitude;
  }
};
