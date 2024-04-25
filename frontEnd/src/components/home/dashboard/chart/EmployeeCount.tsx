import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import { memo, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeCount = memo(
  ({ settingData, memberData }: { settingData: SettingTypes; memberData: MemberDataTypes[] }) => {
    const today = new Date();
    const year = Number(today.getFullYear());
    const [selectedYear, setSelectedYear] = useState(year);

    const labels = Array.from({ length: 12 }, (_, v) => v + 1);

    const matchJoinYear = memberData
      .map(member => member.date_of_joining)
      .filter(e => e.substring(0, 5) === selectedYear + "년");

    const monthCount = Array(12).fill(0);

    matchJoinYear.forEach(date => {
      const month = parseInt(date.split(" ")[1].slice(0, -1)) - 1;
      monthCount[month]++;
    });

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: selectedYear + "년 월별 입사자 수",
        },
      },
    };

    const data = {
      labels,
      datasets: [
        {
          label: "입사자 수",
          data: monthCount.map(month => month),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
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
      if (year <= selectedYear) {
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
              <User className="mr-3" />
              <span>월별 입사자 수</span>
            </div>
            <div className="flex items-center text-[16px]">
              <ChevronLeft className="mr-3 cursor-pointer" onClick={handleClickPrevYear} />{" "}
              <span>{selectedYear}년</span>
              <ChevronRight className="ml-3 cursor-pointer" onClick={handleClickNextYear} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Bar options={options} data={data} />
        </CardContent>
      </Card>
    );
  },
);

export default EmployeeCount;
