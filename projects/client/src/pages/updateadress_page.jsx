import Adress from "../components/address_update";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";
import { useSelector } from "react-redux";

export default function UpdateAdressPage() {
  const [isLoading, setIsLoading] = useState(true);
  const userSelector = useSelector((state) => state.auth);
  const [utama, setUtama] = useState([]);
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Adress user={userSelector} utama={[...utama]} setUtama={setUtama} />
    </Stack>
  );
}
