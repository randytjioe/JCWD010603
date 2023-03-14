import {
  Button,
  Icon,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Accordion,
  Avatar,
  AvatarBadge,
  IconButton,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  Select,
  Input,
  Link,
  Stack,
  InputGroup,
  Image,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import { userLogin } from "../redux/middleware/userauth";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../config/config";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";

export default function UpdateProfile() {
  const [imgUser, setImgUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setbirthDate] = useState(new Date());
  const [gender, setGender] = useState(0);
  const location = useLocation();
  const toast = useToast();
  const [User_id, setUser_id] = useState(0);
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector);
  useEffect(() => {
    setUser_id(userSelector?.id);
    fetchuserdetail(userSelector?.id);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saveImage, setSaveImage] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [userdetail, setUserDetail] = useState([]);
  const [enable, setEnable] = useState(false);

  const handleFile = (event) => {
    const uploaded = event.target.files[0];
    console.log(uploaded);
    setImgUser(URL.createObjectURL(uploaded));
  };

  useEffect(() => {
    fetchuserdetail(User_id);
  }, []);
  const fetchuserdetail = async (User_id) => {
    await axiosInstance
      .get("/users/" + User_id)
      .then((response) => {
        setUserDetail(response.data.result);
        console.log(response.data.result);
        setFirstName(response.data.result.firstName);
        setLastName(response.data.result.lastName);
        setEmail(response.data.result.email);
        setbirthDate(response.data.result.birthDate);
        setImgUser(response.data.result.imgUser);
        setGender(response.data.result.gender);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  function inputHandler(event) {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  const saveUser = async (e) => {
    e.preventDefault();
    const Data = {
      User_id,
      firstName,
      lastName,
      birthDate,
      email,
      gender,
    };

    try {
      console.log(Data);
      await axiosInstance.patch("/editprofile?id=" + User_id, Data);
      navigate("/userpage");
      console.log("user edited");
    } catch (error) {
      console.error(error);
    }
  };

  const saveFoto = async (e) => {
    e.preventDefault();
    const Data1 = {
      User_id,
      imgUser,
    };

    try {
      await axiosInstance.patch("/updatefoto", Data1);
      navigate("/update-profile");
      setErrorMessage("Sukses");
    } catch (error) {
      setErrorMessage("Gagal");
    }
  };
  return (
    <>
      <Center flex={1} align={"center"} justifyContent={"center"}>
        <Flex
          spacing={4}
          maxW={"md"}
          bgColor="#DCD7C9"
          w="430px"
          h="932px"
          color="white"
          flexDir="column"
          gap={8}
        >
          <Flex
            w="430px"
            h="358px"
            bgColor="#2C3639"
            flexDir={"column"}
            gap={5}
          >
            <Link to="/userpage" as={ReachLink}>
              <Flex textAlign={"left"} color="white">
                <Icon
                  boxSize={"7"}
                  as={IoIosArrowBack}
                  color="white"
                  sx={{
                    _hover: {
                      cursor: "pointer",
                    },
                  }}
                ></Icon>
                Back
              </Flex>
            </Link>

            <Center flexDir={"column"} gap={5}>
              <Flex flexDir={"column"}>
                <FormControl id="productName">
                  <FormLabel>
                    {" "}
                    <Center fontSize={"30px"}> EDIT PROFILE</Center>
                  </FormLabel>
                  <form onSubmit={(e) => saveFoto(e)}>
                    <Stack direction={["column"]} spacing={6}>
                      <Center>
                        <Avatar size="2xl" src={imgUser}></Avatar>
                      </Center>

                      <Center
                        w="full"
                        justifyContent={"center"}
                        flexDir="column"
                        gap={3}
                      >
                        <Input
                          id=""
                          type="file"
                          accept="image/*"
                          onChange={handleFile}
                          w="full"
                          placeholder="Image URL"
                          name={imgUser}
                        ></Input>

                        <Button
                          colorScheme={"black"}
                          variant={"solid"}
                          w="350px"
                          color="white"
                          _hover={{
                            bg: "white",
                            color: "#2C3639",
                          }}
                          type="submit"
                          onClick={(errorMessage) => {
                            if ((errorMessage = "Sukses")) {
                              toast({
                                title: "Update Foto Sukses",
                                description: "Foto Berhasil di Update",
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                              });
                            } else {
                              toast({
                                title: "Update Foto Gagal",
                                description: "Foto Tidak Berhasil di Update",
                                status: "error",
                                duration: 9000,
                                isClosable: true,
                              });
                            }
                          }}
                          // onClick={(e) => saveUser(e)}
                        >
                          Change Profile Picture
                        </Button>
                      </Center>
                    </Stack>
                  </form>
                </FormControl>
                <Flex justifyContent={"bottom"}></Flex>
              </Flex>
            </Center>
          </Flex>

          <Flex w="430px" flexDir="column" gap={5} color="#2C3639" px="40px">
            <FormControl id="firstname">
              <FormLabel>Firstname</FormLabel>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                bgColor="white"
              />
            </FormControl>
            <FormControl id="lastname">
              <FormLabel>Lastname</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                bgColor="white"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                bgColor="white"
              />
            </FormControl>

            <FormControl id="gender">
              <FormLabel>Gender</FormLabel>
              <Select
                variant="outline"
                bgColor="white"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="1" selected>
                  PRIA
                </option>
                <option value="0">PEREMPUAN</option>
              </Select>
            </FormControl>
            <FormControl id="birthday">
              <FormLabel>Birthday</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                bgColor="white"
                value={birthDate}
                onChange={(e) => {
                  setbirthDate(e.target.value);
                }}
              />
            </FormControl>

            <Button
              colorScheme={"black"}
              variant={"solid"}
              w="350px"
              color="#2C3639"
              _hover={{
                bg: "white",
                color: "#2C3639",
              }}
              type="submit"
              onClick={(e) => saveUser(e)}
            >
              UPDATE
            </Button>
            {enable ? (
              <Alert status="error" zIndex={2} variant="top-accent">
                <AlertIcon />
                wrong username/password
              </Alert>
            ) : null}
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
