import {
  Button,
  Icon,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Input,
  Select,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { axiosInstance } from "../config/config";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function UpdateAdress(props) {
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");

  const [idProv, setIdProv] = useState(0);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const location = useLocation();
  const [idCity, setIdCity] = useState(0);
  const [isPrimary, setIsPrimary] = useState(0);
  const [id, setId] = useState(0);
  const [Ket, setKet] = useState("");

  const [UserId, setUserId] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    fetchaddressdetail(location.pathname?.split("/")[2]);
  }, []);

  const handleId = (e) => {
    setIdProv(e);
  };

  const [provinceAPI, setProvinceAPI] = useState([
    {
      province_id: 0,
      province: "",
    },
  ]);
  const [provinces, setProvinces] = useState("");
  const [cityAPI, setCityAPI] = useState([
    {
      city_id: 0,
      city_name: "",
      type: "",
      postal_code: "",
      province_id: 0,
      province: "",
    },
  ]);

  const fetchProvince = async () => {
    try {
      const response = await axiosInstance.get("/api/api_rajaongkir/province");
      const result = response.data;

      setProvinceAPI(result);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchProvince();
  }, []);

  const fetchCity = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/api_rajaongkir/city/${idProv}`
      );
      const result = response.data;
      setCityAPI(result);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchCity();
  }, [idProv]);

  const fetchaddressdetail = async (idAddress) => {
    await axiosInstance
      .get("/api/address/update-address/" + idAddress)
      .then((response) => {
        setId(response.data.result.id);
        setDistrict(response.data.result.district);
        setProvinces(response.data.result.province);
        setAddress(response.data.result.address);
        setPostalCode(response.data.result.postalCode);
        setCity(response.data.result.city);
        setIsPrimary(response.data.result.isPrimary);
        setKet(response.data.result.Ket);
        setUserId(response.data.result.UserId);
        setIdCity(response.data.result.idCity);
        setIdProv(response.data.result.idProv);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    const Data = {
      id,
      district,
      provinces,
      postalCode,
      address,
      city,
      isPrimary,
      Ket,
      UserId,
      idCity,
      idProv,
    };

    try {
      await axiosInstance.patch("/api/address/editaddress?id=" + Data.id, Data);
      navigate("/address");
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
            <Link to="/address" as={ReachLink}>
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

            <FormControl id="email">
              <FormLabel>Province</FormLabel>

              <Select
                name="province"
                bgColor="white"
                onChange={(e) => {
                  const selectedProvince = provinceAPI.find(
                    (val) => val.province === e.target.value
                  );
                  setProvinces(e.target.value);
                  handleId(selectedProvince.province_id);
                }}
              >
                <option>{provinces}</option>
                {provinceAPI.map((p) => {
                  return (
                    <option key={p.province_id} value={p.province}>
                      {p.province}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl id="email">
              <FormLabel>City</FormLabel>

              <Select
                name="city"
                bgColor="white"
                onChange={(e) => {
                  const selectedCity = cityAPI.find(
                    (val) => val.city_name === e.target.value
                  );
                  setCity(e.target.value);
                  setIdCity(selectedCity.city_id);
                }}
              >
                <option>{city}</option>
                {cityAPI.map((c) => {
                  return (
                    <option key={c.city_id} value={c.city_name}>
                      {c.city_name}
                    </option>
                  );
                })}
              </Select>
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
