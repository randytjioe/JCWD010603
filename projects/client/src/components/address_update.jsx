import {
  Button,
  Icon,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Switch,
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
  Spacer,
  Link,
  Stack,
  InputGroup,
  Image,
  Alert,
  AlertIcon,
  Badge,
  useToast,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { IoIosArrowBack, IoIosCloseCircleOutline } from "react-icons/io";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

import { AiFillCamera } from "react-icons/ai";
import { userLogin } from "../redux/middleware/userauth";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../config/config";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";

export default function UpdateAdress(props) {
  const [imgUser, setImgUser] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [district, setDistrict] = useState("");
  const [addressList, setAddressList] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const data = props.data;
  const location = useLocation();
  const toast = useToast();
  const [User_id, setUser_id] = useState(0);
  const [isUtama, setIsUtama] = useState();
  const [id, setId] = useState(0);
  const [idAddress, setidAddress] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSelector = useSelector((state) => state.auth);
  const [saveImage, setSaveImage] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [addressdetail, setAddressDetail] = useState([]);
  const [enable, setEnable] = useState(false);
  useEffect(() => {
    setidAddress(location.pathname?.split("/")[2]);
    fetchaddressdetail(location.pathname?.split("/")[2]);
  }, []);

  const fetchaddressdetail = async (idAddress) => {
    await axiosInstance
      .get("/update-address/" + idAddress)
      .then((response) => {
        setAddressDetail(response.data.result[0]);
        console.log(response.data.result[0]);
        setId(response.data.result[0].id);
        setDistrict(response.data.result[0].district);
        setProvince(response.data.result[0].province);
        setAddress(response.data.result[0].address);
        setPostalCode(response.data.result[0].postalCode);
        setCity(response.data.result[0].city);
        setIsUtama(response.data.result[0].isUtama);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleFile = (event) => {
    const uploaded = event.target.files[0];
    console.log(uploaded);
    setImgUser(URL.createObjectURL(uploaded));
  };

  const handleEditToAddress = (address) => {
    setAddressList([...addressList, address]);
  };

  function inputHandler(event) {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  const CheckUtama = (e, param) => {
    let newUtama;
    if (e.target.checked) {
      props.setUtama([...props.utama, param]);
    } else {
      newUtama = props.utama.filter((val) => {
        return val !== param;
      });
      props.setUtama([...newUtama]);
    }
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    const Data = {
      id,
      district,
      province,
      postalCode,
      address,
      city,
      isUtama,
    };

    try {
      console.log(Data);
      await axiosInstance.patch("/editaddress?id=" + id, Data);
      navigate("/userpage");
      console.log("user edited");
    } catch (error) {
      console.error(error);
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
            h="140px"
            bgColor="#2C3639"
            flexDir={"column"}
            gap={5}
          >
            <Link to="/list-address" as={ReachLink}>
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

            <Center flexDir={"column"} gap={5} overflow="auto">
              <Flex flexDir={"column"}>
                <FormControl id="productName">
                  <FormLabel>
                    <Center fontSize={"30px"}> EDIT ADDRESS</Center>
                  </FormLabel>
                </FormControl>
              </Flex>
            </Center>
          </Flex>

          <Flex w="430px" flexDir="column" gap={5} color="#2C3639" px="40px">
            <FormControl id="firstname">
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                bgColor="white"
              />
            </FormControl>
            <FormControl id="lastname">
              <FormLabel>District</FormLabel>
              <Input
                type="text"
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
                bgColor="white"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                bgColor="white"
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Province</FormLabel>
              <Input
                type="text"
                value={province}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                bgColor="white"
              />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Postal Code</FormLabel>
              <Input
                type="text"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
                bgColor="white"
              />
            </FormControl>
            <FormControl id="email">
              {isUtama === 0 ? (
                <Center gap={3}>
                  <Flex justifyContent={"center"}>Jadikan Alamat Utama</Flex>
                  <Switch
                    onChange={(e) => {
                      CheckUtama(e, "1");
                    }}
                    colorScheme="teal"
                  />
                </Center>
              ) : null}
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
              onClick={(e) => saveAddress(e)}
            >
              UPDATE
            </Button>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
