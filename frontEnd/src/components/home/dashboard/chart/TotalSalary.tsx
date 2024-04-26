import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, DollarSignIcon } from "lucide-react";
import { memo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import useDateStore from "@/store/date-store";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const TotalSalary = memo(
  ({ settingData, salaryData }: { settingData: SettingTypes; salaryData: SalaryDataTypes[] }) => {
    const { year } = useDateStore();

    const [selectedYear, setSelectedYear] = useState(Number(year));

    const selectedYearTotalSalary = salaryData?.map(data => data.data.find(item => item.year === String(selectedYear)));

    const result = Array(12).fill(0);

    selectedYearTotalSalary.forEach(item => {
      item?.salary.forEach(salaryItem => {
        const month = parseInt(salaryItem.month);
        result[month - 1] += salaryItem.total_salary;
      });
    });

    // result값이 모두 0
    const isResult = result.every(num => num === 0);

    const labels = Array.from({ length: 12 }, (_, v) => v + 1 + "월");

    const options = {
      responsive: false,
      scales: {
        y: {
          title: {
            display: true,
            text: "단위: 천만원",
          },
          ticks: {
            stepSize: 10000000,
            callback: function (value: any) {
              return value / 10000000;
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: selectedYear + "년 월별 직원 급여",
        },
      },
    };

    const data = {
      labels,
      datasets: [
        {
          label: "원",
          data: result.map(month => month),
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 1)",
        },
      ],
    };

    const handleClickPrevYear = () => {
      const startBusinessDate = Number(settingData.business_setting.date_of_business_commencement.substring(0, 4));
      if (startBusinessDate >= selectedYear) {
        return;
      } else {
        setSelectedYear(selectedYear - 1);
      }
    };

    const handleClickNextYear = () => {
      if (Number(year) <= selectedYear) {
        return;
      } else {
        setSelectedYear(selectedYear + 1);
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[20px] flex items-center justify-between">
            <div className="flex items-center">
              <DollarSignIcon className="mr-3" />
              <span>월별 직원 급여</span>
            </div>
            <div className="flex items-center text-[16px]">
              <ChevronLeft className="mr-3 cursor-pointer" onClick={handleClickPrevYear} />{" "}
              <span>{selectedYear}년</span>
              <ChevronRight className="ml-3 cursor-pointer" onClick={handleClickNextYear} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          {!isResult ? (
            <Line options={options} data={data} width={420} height={200} />
          ) : (
            <div className="flex items-center justify-center">등록된 데이터가 없습니다.</div>
          )}
        </CardContent>
      </Card>
    );
  },
);

export default TotalSalary;
