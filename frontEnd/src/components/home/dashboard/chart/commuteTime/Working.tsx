import { memo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import commuteList from "@/assets/commuteList.json";
import { useTheme } from "@/components/mode/theme-provider";

ChartJS.register(ArcElement, Tooltip, Legend);
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const todayDate = `${year}${month}${day}`;

const Working = memo(({ commuteData }: { commuteData: ExceptAttitude[] }) => {
  const { theme } = useTheme();
  console.log(theme);
  const options = {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "출근 현황",
        color: theme === "light" ? "#181818" : "#FAFAFA",
      },
    },
  };

  const settingArray = commuteList.find(item => item.name === "working_time_setting")?.setting.map(item => item.value);

  const todayCommute = commuteData?.map(item => item.commuteTime.find(commute => commute.date === todayDate));

  const label = settingArray && [...settingArray, "미등록"];

  const counts: { [key: string]: number } = {};

  label?.forEach(item => {
    counts[item] = 0;
    counts["미등록"] = 0;
  });

  todayCommute.forEach(item => {
    if (item === undefined) {
      counts["미등록"]++;
    } else if (item && label?.includes(item.working_division)) {
      counts[item.working_division]++;
    }
  });

  const result = label?.map(item => counts[item]);

  const data = {
    labels: label,
    datasets: [
      {
        data: result,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie options={options} data={data} width={230} height={230} />;
});

export default Working;
