import Adress from "../components/address_update";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import { useSelector } from "react-redux";

export default function UpdateAdressPage() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const userSelector = useSelector((state) => state.auth);
  const [utama, setUtama] = useState([]);
  async function fetchData() {
    await axiosInstance.get("/listaddress/" + userSelector?.id).then((res) => {
      setData(res.data.result);
      console.log(userSelector?.id);
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
      <Adress
        user={userSelector}
        utama={[...utama]}
        setUtama={setUtama}
        data={data}
      />
    </Stack>
  );
}
