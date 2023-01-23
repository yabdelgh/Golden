import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function ProfileGraph() {
  const data = {
    labels: ["Wins", "Loses"],
    datasets: [
      {
        data: [20, 90],
        backgroundColor: ["	#ff5252", "#00ad8e"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      // tooltip: false,
      datalabels: {
        formatter: (value: any, ctx: any) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data: any) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
        font: {
          size: 20,
        },
      },
    },
    onHover: function (e: any) {
      e.native.target.style.cursor = "pointer";
    },
    // rotation: 270,
    // events: ["click"],
    onClick: function (event: any, element: any) {
      console.log(element[0].index);
    },
  };
  return (
    <Box
      width="100%"
      height="600px"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        m="10px"
        ml="50px"
        fontSize="25px"
        fontWeight="bold"
        color="gray.500"
        width="100%"
      >
        Performance Overview
      </Text>
      <Box
        width="100%"
        height="90%"
        display="flex"
        justifyContent='flex-end'
      >
        <Text>you played 123 games in this year </Text>
        <Box width="70%" height="70%" mb="15%">
          <Pie options={options} data={data} />
        </Box>
      </Box>
    </Box>
  );
}
