import SidebarAdmin from "../components/sidebar_admin";
import { Flex, Center, Spinner, Box, Select, option } from "@chakra-ui/react";
import Chart from "../components/chart";
export default function Dashboard() {
  return (
    <>
      <Flex>
        <SidebarAdmin />
        <Flex>
          <Center flexDir="column" py={10} marginLeft={"80px"}>
            <Flex fontSize={"30px"} fontWeight="bold">
              Dashboard
            </Flex>
            <Flex w="400px" py={3}>
              <Select placeholder="All Location">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Flex>
            <Flex
              w="1200px"
              gap={5}
              paddingTop="20px"
              paddingBottom={"20px"}
              justifyContent="start"
              flexDir={"row"}
              flexWrap="wrap"
              overflowX={"auto"}
              overflowY={"auto"}
              h="full"
              py={10}
              flexWrap="wrap"
            >
              <Center
                w="349px"
                h="125px"
                borderRadius={"10"}
                borderBottom="10px solid #2C3639"
                bgColor={"#DCD7C9"}
                justifyContent="center"
                fontWeight="bold"
                py={3}
                flexDir="column"
              >
                {" "}
                <Flex fontSize={"20px"}>Total Produk </Flex>
                <Flex fontSize={"40px"}>1000</Flex>
              </Center>
              <Center
                w="349px"
                h="125px"
                borderRadius={"10"}
                borderBottom="10px solid #2C3639"
                bgColor={"#DCD7C9"}
                justifyContent="center"
                fontWeight="bold"
                py={3}
                flexDir="column"
              >
                {" "}
                <Flex fontSize={"20px"}>Total Admin </Flex>
                <Flex fontSize={"40px"}>5</Flex>
              </Center>
              <Center
                w="349px"
                h="125px"
                borderRadius={"10"}
                borderBottom="10px solid #2C3639"
                bgColor={"#DCD7C9"}
                justifyContent="center"
                fontWeight="bold"
                py={3}
                flexDir="column"
              >
                {" "}
                <Flex fontSize={"20px"}>Total User </Flex>
                <Flex fontSize={"40px"}>45800</Flex>
              </Center>
              <Center
                w="349px"
                h="125px"
                borderRadius={"10"}
                borderBottom="10px solid #2C3639"
                bgColor={"#DCD7C9"}
                justifyContent="center"
                fontWeight="bold"
                py={3}
                flexDir="column"
              >
                {" "}
                <Flex fontSize={"20px"}>Total Income </Flex>
                <Flex fontSize={"40px"}>1000000</Flex>
              </Center>
            </Flex>
            <Chart />
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
