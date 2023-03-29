import { Box } from "@chakra-ui/react";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import {
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Input,
  InputRightAddon,
  List,
  ListItem,
  Divider,
  Button,
  Grid,
  GridItem,
  Icon,
  Center,
  IconButton,
  Slide,
  Text,
  Stack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ChartComponent(props) {
  const data = props.data;
  // const databar = props.dataBar;

  //   const x = data?.map((product) => product?.tgl);
  //   const y = data?.map((product) => product?.total);
  const x = [
    "01/03/2023",
    "02/03/2023",
    "03/03/2023",
    "04/03/2023",
    "05/03/2023",
    "06/03/2023",
    "07/03/2023",
    "08/03/2023",
    "09/03/2023",
    "10/03/2023",
  ];
  const y = [1000, 2000, 3000, 4000, 5000, 1000, 2000, 3000, 4000, 5000];
  const [option, setOption] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    // console.log(databar);
    // setOption([...props.dataBar?.map((product) => product?.name)]);
    // setBarData([...props.dataBar?.map((product) => parseInt(product?.jumlah))]);
    setOption(["Arabika", "Robusta"]);
    setBarData([10, 15]);
  }, []);

  const [barChartDataConsumption, setBarChartDataConsumption] = useState([
    {
      name: "PRODUCT A",
      data: [],
    },
  ]);

  const [barChartOptionsConsumption, setBarChartOptionsConsumption] = useState({
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: [],
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: false,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },

    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: false,
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    },
    legend: {
      show: false,
    },
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "20px",
      },
    },
  });

  useEffect(() => {
    setBarChartOptionsConsumption({
      chart: {
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          style: {
            fontSize: "12px",
            fontFamily: undefined,
          },
        },
        theme: "dark",
      },
      xaxis: {
        categories: option,
        show: false,
        labels: {
          show: true,
          style: {
            colors: "#A3AED0",
            fontSize: "14px",
            fontWeight: "500",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        color: "black",
        labels: {
          show: false,
          style: {
            colors: "#A3AED0",
            fontSize: "14px",
            fontWeight: "500",
          },
        },
      },

      grid: {
        borderColor: "rgba(163, 174, 208, 0.3)",
        show: true,
        yaxis: {
          lines: {
            show: false,
            opacity: 0.5,
          },
        },
        row: {
          opacity: 0.5,
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      fill: {
        type: "solid",
        colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
      },
      legend: {
        show: false,
      },
      colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "20px",
        },
      },
    });
    console.log(option);
  }, [option]);
  useEffect(() => {
    setBarChartDataConsumption([
      {
        name: "Total",
        data: barData,
      },
    ]);
    console.log(barData);
  }, [barData]);

  const chartData = [
    {
      name: "Total",
      data: y,
    },
    // {
    //   name: "Profit",
    //   data: [30, 40, 24, 46, 20, 46],
    // },
  ];

  const lineChartOptionsTotalSpent = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 13,
        left: 0,
        blur: 10,
        opacity: 0.1,
        color: "#4318FF",
      },
    },
    colors: ["#4318FF", "#39B8FF"],
    markers: {
      size: 0,
      colors: "white",
      strokeColors: "#7551FF",
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      showNullDataPoints: true,
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      type: "line",
    },
    xaxis: {
      type: "numeric",
      categories: x,
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
      column: {
        color: ["#7551FF", "#39B8FF"],
        opacity: 0.5,
      },
    },
    color: ["#7551FF", "#39B8FF"],
  };

  return (
    <>
      <Flex gap={5}>
        <Flex
          w="full"
          maxH="700px"
          maxW="1500px"
          mt="auto"
          flexDir={"column"}
          gap={3}
        >
          <Center fontWeight="bold" fontSize="15px">
            REPORT TRANSACTION DAY BY DAY
          </Center>
          <LineChart
            chartData={chartData}
            chartOptions={lineChartOptionsTotalSpent}
          />
        </Flex>
        <Flex
          w="full"
          maxH="500px"
          maxW="1000px"
          mt="auto"
          flexDir={"column"}
          gap={3}
          px={15}
        >
          <Center fontWeight="bold" fontSize="15px">
            {" "}
            REPORT TRANSACTION CATEGORY{" "}
          </Center>
          <BarChart
            chartData={barChartDataConsumption}
            chartOptions={barChartOptionsConsumption}
          />
        </Flex>
      </Flex>
    </>
  );
}
