import Sidebar from "../components/sidebar_admin";

import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import { Flex, Center, Spinner } from "@chakra-ui/react";
import Products from "../components/product";
export default function PageProducts() {
  const [data, setData] = useState();
  const [datacat, setDataCat] = useState();
  const [datamen, setdatamen] = useState();
  const [datawomen, setdatawomen] = useState();
  const [dataall, setdataall] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("ASC");
  const [categories1, setCategories1] = useState([]);

  const [gender, setGender] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // fetchPosts();
    fetchData();

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  async function fetchData(limit) {
    if (limit < 0) {
      limit = 0;
    }

    await axiosInstance
      .get("/product-all", {
        params: {
          page: limit,
        },
      })
      .then((res) => {
        setData(res.data.result);
      });
  }

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
          </Flex>
          <Center marginLeft={"450px"}>
            <Products data={data} />
          </Center>
        </>
      )}
    </>
  );
}
