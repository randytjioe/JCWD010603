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
import validator from "validator";
import Logo from "../assets/logo.png";
export default function LoginUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState(false);

  async function login() {
    const isAuth = await dispatch(userLogin({ email, password }));
    console.log(isAuth);
    if (isAuth.status) {
      if (isAuth.data.isVerify) {
        return navigate("/userpage", {
          state: { admin: isAuth.data },
          replace: true,
        });
      }
      return navigate("/userlogin", {
        state: { admin: isAuth.data },
        replace: true,
      });
    }
    return setStatus(true);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const validateEmail = (event) => {
    let email = event.target.value;
    if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
      setEmail(event.target.value);
    }
  };

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
          gap={8}
        >
          <Flex fontSize={"2xl"} flexDir="column" color="#DCD7C9">
            SELAMAT DATANG DI AKUN
          </Flex>
          <Image
            fontSize={"26px"}
            color="#F68522"
            justifyContent="center"
            src={Logo}
          ></Image>

          <Center w="282px" flexDir="column" gap={5} color="#DCD7C9">
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="username"
                onChange={(e) => validateEmail(e)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Flex spacing={6}>
              <Flex
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
                gap={5}
              >
                <Checkbox>Remember Me</Checkbox>
                <Link color={"blue.500"}>Forgot Password?</Link>
              </Flex>
            </Flex>

            <Button
              colorScheme={"black"}
              variant={"solid"}
              onClick={login}
              w="282px"
              color="#DCD7C9"
              _hover={{
                bg: "white",
                color: "#2C3639",
                border: "2px solid white",
              }}
            >
              Sign in
            </Button>

            {status ? (
              <Alert
                status="error"
                zIndex={2}
                variant="top-accent"
                color="black"
              >
                <AlertIcon />
                Username/ Password Salah
              </Alert>
            ) : null}
          </Center>
        </Center>
      </Center>
    </>
  );
}
