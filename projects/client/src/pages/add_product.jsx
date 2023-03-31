import Sidebar from "../components/sidebar_admin";

import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import { Flex, Center, Spinner } from "@chakra-ui/react";
import AddProducts from "../components/add_product";
export default function PageProducts() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  
//   async function fetchData() {
//     await axiosInstance.get("/productall").then((res) => {
//       setData(res.data.result);
//     });
//   }
//   async function fetchDataCat() {
//     await axiosInstance.get("/category").then((res) => {
//       setDataCat(res.data.result);
//     });
//   }


  useEffect(() => {
    // fetchPosts();
    // fetchData();
    // fetchDataCat();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  return (
    <>
      {isLoading ? (
        <Center w={"100vw"} h="100vh" alignContent={"center"}>
          <Spinner size={"xl"} thickness="10px" color="blue.500" />
        </Center>
      ) : (
        <>
        <Flex flexDir={"row"} pos="fixed" left={"0"}>
          <Sidebar />
          <Center marginLeft={"450px"}>
          <AddProducts/>
          </Center>
        </Flex>
        </>
      )}
    </>
  );
}
