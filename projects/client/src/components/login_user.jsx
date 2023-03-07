import {
  Button,
  Checkbox,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { userLogin } from "../redux/middleware/userauth";
import { useDispatch } from "react-redux";
// import { AxiosInstance } from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [enable, setEnable] = useState(false);

  useEffect(() => {
    setEnable(false);
    console.log(user);
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);

  async function login() {
    const isAuth = await dispatch(userLogin(user));
    console.log(isAuth);
    if (isAuth.status && isAuth.data.isadmin) {
      return navigate("/adminpage");
    } else if (isAuth.status && !isAuth.data.isadmin) {
      return navigate("/cashierpage");
    }

    return setEnable(true);
  }

  function inputHandler(event) {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
    <>
      <Center p={8} flex={1} align={"center"} justifyContent={"center"}>
        <Center
          spacing={4}
          maxW={"md"}
          bgColor="#2C3639"
          w="430px"
          h="932px"
          color="white"
          flexDir="column"
        >
          <Flex fontSize={"2xl"} flexDir="column">
            Sign in
          </Flex>
          <Center w="282px" flexDir="column" gap={5}>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input type="text" name="username" onChange={inputHandler} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" onChange={inputHandler} />
            </FormControl>
            <Flex spacing={6}>
              <Flex
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
                gap={5}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.500"}>Forgot password?</Link>
              </Flex>
            </Flex>
            <Button colorScheme={"blue"} variant={"solid"} onClick={login}>
              Sign in
            </Button>
            {enable ? (
              <Alert status="error" zIndex={2} variant="top-accent">
                <AlertIcon />
                wrong username/password
              </Alert>
            ) : null}
          </Center>
        </Center>
      </Center>
    </>
  );
}
