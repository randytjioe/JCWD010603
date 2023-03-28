import {
  Button,
  Icon,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Input,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";

import { useDispatch } from "react-redux";
import { axiosInstance } from "../config/config";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function UpdateAdress(props) {
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [addressList, setAddressList] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const data = props.data;
  const location = useLocation();

  const [isPrimary, setIsPrimary] = useState(0);
  const [id, setId] = useState(0);
  const [Ket, setKet] = useState("");
  const [idAddress, setidAddress] = useState(0);
  const [UserId, setUserId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [addressdetail, setAddressDetail] = useState([]);

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
        setIsPrimary(response.data.result[0].isPrimary);
        setKet(response.data.result[0].Ket);
        setUserId(response.data.result[0].UserId);
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  console.log(data?.isPrimary);
  const handleFile = (event) => {};

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
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/user/addresses")
      .then((response) => {
        setAddresses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handlePrimaryChange = (id, isPrimary) => {
    axiosInstance
      .patch(`/editaddress/${id}`, { isPrimary })
      .then((response) => {
        const updatedAddress = response.data;
        const updatedAddresses = addresses.map((address) => {
          if (data?.id === updatedAddress.id) {
            return updatedAddress;
          } else {
            // Hapus atribut "isPrimary" dari alamat lain jika isPrimary diubah ke "true"
            if (updatedAddress.isPrimary) {
              delete data?.isPrimary;
            }
            return data;
          }
        });
        setAddresses(updatedAddresses);
      })
      .catch((error) => {
        console.log(error);
      });
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
      isPrimary,
      Ket,
      UserId,
    };

    try {
      console.log(Data);
      await axiosInstance.patch("/user/editaddress?id=" + Data.id, Data);
      navigate("/list-address");
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
                  setProvince(e.target.value);
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
              <FormLabel>Ket</FormLabel>
              <Input
                type="text"
                value={Ket}
                onChange={(e) => {
                  setKet(e.target.value);
                }}
                bgColor="white"
              />
            </FormControl>
            <FormControl id="email">
              <Center gap={3}>
                <Checkbox
                  isChecked={isPrimary}
                  onChange={(e) => setIsPrimary(!isPrimary)}
                >
                  Primary Address
                </Checkbox>
              </Center>
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
