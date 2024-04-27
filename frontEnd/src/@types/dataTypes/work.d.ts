interface WorkTypes {
  employee_number: string;
  commuteTime: CommuteTimeDataTypes[];
  attitude: AttitudeDataTypes[];
}

interface ExceptAttitude {
  employee_number: string;
  commuteTime: CommuteTimeDataTypes[];
}

interface ExceptCommute {
  employee_number: string;
  attitude: AttitudeDataTypes[];
}

interface CommuteTimeDataTypes {
  date: string;
  working_time: string;
  working_division: string;
  quitting_time: string;
  quitting_division: string;
  total_time: number;
}

interface AttitudeDataTypes {
  month: string;
  working_count: number;
  annual_leave_count: number;
  truancy_count: number;
  overtime_count: number;
  night_work_count: number;
  holiday_work_count: number;
}
