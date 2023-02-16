import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";
import { TbTrendingUp } from "react-icons/tb";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function ProfileGraph({ wins, games }: any) {
  const loses = games - wins;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
          size: 15,
        },
      },
    },
    onHover: function (e: any) {
      e.native.target.style.cursor = "pointer";
    },
    onClick: function (event: any, element: any) {
    },
  };

  const data: any = {
    labels: ["Loses", "Wins"],
    datasets: [
      {
        data: wins < 1 ? [loses] : loses < 1 ? [wins] : [wins, loses],
        backgroundColor: wins < 1 ? ["#ff5252"] : ["#00ad8e", "#ff5252"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent={"center"}
      bg="white"
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
      {games !== undefined && games !== 0 ? (
        <Box width="100%" height="90%" display="flex" justifyContent="flex-end">
          <Box
            ml="30px"
            width="40%"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              fontFamily="Inter"
              fontSize="50px"
              fontWeight="bold"
              display="flex"
              alignItems={"flex-end"}
              color="gray.700"
            >
              {games}
              <Text fontSize="25px" fontWeight="normal" m="10px">
                Games
              </Text>
            </Box>
            <Box display="flex" fontSize="18px">
              <Text m="5px" color="#00ad8e">
                {wins} Wins,
              </Text>
              <Text m="5px" color="#ff5252">
                {games - wins} Loses
              </Text>
            </Box>
          </Box>
          <Box width="60%" height="70%" mb="15%">
            <Pie options={options} data={data} />
          </Box>
        </Box>
      ) : (
        <Box
          height="90%"
          color="gray.400"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          fontSize={"50px"}
        >
          <TbTrendingUp size="100px" />
          <Text fontSize="25px" mt="50px">
            You have no Games for now.
          </Text>
        </Box>
      )}
    </Box>
  );
}
