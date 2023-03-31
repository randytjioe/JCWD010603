import Sidebar from "../components/sidebar_admin";

import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import { Flex, Center, Spinner } from "@chakra-ui/react";
import Products from "../components/productuser";
import SidebarProduct from "../components/sidebar_product";
import Navbar from "../components/navbar";
export default function PageProducts() {
  const [data, setData] = useState();
  const [datacat, setDataCat] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState("ASC");
  const [sortby, setSortBy] = useState("name");
  const [categories1, setCategories1] = useState([]);
  const [page, setPage] = useState(0);

  async function fetchData() {
    await axiosInstance.get("/user/productall").then((res) => {
      setData(res.data.result);
    });
  }
  async function fetchDataCat() {
    await axiosInstance.get("/user/category").then((res) => {
      setDataCat(res.data.result);
    });
  }
  const fetchFinPro = async (search) => {
    let url = "";

    url += `name=${search}`;

    console.log(url);

    await axiosInstance.get("/user/find?" + url).then((res) => {
      setData(res.data.result);
    });
  };

  const fetchFilPro = async () => {
    let url = "";
    categories1.map((val, idx) => {
      idx ? (url += `&${val}=${val}`) : (url += `${val}=${val}`);
    });

    url += `&order=${sort}&orderby=${sortby}`;

    console.log(url);

    await axiosInstance.get("/filter?" + url).then((res) => {
      setData(res.data.result);
    });
  };
  useEffect(() => {
    // fetchPosts();
    fetchData();
    fetchDataCat();
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  useEffect(() => {
    console.log(categories1);
  }, [categories1]);
  return (
    <>
      {isLoading ? (
        <Center w={"100vw"} h="100vh" alignContent={"center"}>
          <Spinner size={"xl"} thickness="10px" color="blue.500" />
        </Center>
      ) : (
        <>
          <Navbar />

          <Center>
            <Products
              data={data}
              fin={fetchFinPro}
              cat={[...categories1]}
              datacat={datacat}
              setCat={setCategories1}
              sort={[...sort]}
              sortby={[...sortby]}
              setSort={setSort}
              setSortBy={setSortBy}
              filter={fetchFilPro}
            />
          </Center>
        </>
      )}
    </>
  );
}
