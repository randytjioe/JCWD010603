import Change from "../components/change_pasword";
import { Stack } from "@chakra-ui/react";

export default function ChangePasswordPage() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Change />
    </Stack>
  );
}
