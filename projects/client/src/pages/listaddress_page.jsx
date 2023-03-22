import ListAdress from "../components/list_address";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import { useSelector } from "react-redux";

export default function ListAddressPage() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const userSelector = useSelector((state) => state.auth);
  async function fetchData() {
    await axiosInstance.get("/listaddress/" + userSelector?.id).then((res) => {
      setData(res.data.result);
      console.log(userSelector?.id);
    });
  }
  async function DeleteAddress(id) {
    await axiosInstance
      .delete("/delete-address?id=" + id)
      .then(() => {
        alert("Alamat berhasil dihapus");
        fetchData();
      })
      .catch((err) => {
        alert("Alamat tidak bisa dihapus");
        console.log(err.message);
      });
  }

  useEffect(() => {
    fetchData();

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <ListAdress user={userSelector} data={data} delete={DeleteAddress} />
    </Stack>
  );
}
