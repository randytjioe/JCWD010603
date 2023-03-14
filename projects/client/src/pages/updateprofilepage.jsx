import Update from "../components/profile_update";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../config/config";

export default function UpdateProfilePage() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Update />
    </Stack>
  );
}
