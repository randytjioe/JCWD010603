import {
  Button,
  Icon,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Image,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { IoIosArrowBack } from "react-icons/io";

import { useDispatch } from "react-redux";
import { axiosInstance } from "../config/config";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function DetailProduct(props) {
  const [imgProduct, setImgProduct] = useState("");
  const [name, setName] = useState("");
  const [addressList, setAddressList] = useState("");
  const [idProv, setIdProv] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const data = props.data;
  const location = useLocation();
  const [isPrimary, setIsPrimary] = useState(0);
  const [id, setId] = useState(0);
  const [description, setDescription] = useState("");
  const [idProduct, setidProduct] = useState(0);
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleId = (e) => {
    setIdProv(e);
  };
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [productdetail, setProductDetail] = useState([]);
  const [provinceAPI, setProvinceAPI] = useState([
    {
      province_id: 0,
      province: "",
    },
  ]);
  const [province, setProvince] = useState("");
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
      const response = await axiosInstance.get(
        "http://localhost:8000/api_rajaongkir/province"
      );
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
      console.log(idProv);
      const response = await axiosInstance.get(
        `http://localhost:8000/api_rajaongkir/city/${idProv}`
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
  useEffect(() => {
    setidProduct(location.pathname?.split("/")[2]);
    fetchproductdetail(location.pathname?.split("/")[2]);
  }, []);

  const fetchproductdetail = async (idProduct) => {
    await axiosInstance
      .get("/user/detail-product/" + idProduct)
      .then((response) => {
        setProductDetail(response.data.result);
        console.log(response.data.result);
        setId(response.data.result.id);
        setName(response.data.result.name);
        setPrice(response.data.result.price);
        setImgProduct(response.data.result.imgProduct);
        setCategory(response.data.result.Category.name);
        setDescription(response.data.result.description);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <>
      <Flex flex={1} align={"center"} justifyContent={"center"}>
        <Flex
          spacing={4}
          maxW={"md"}
          bgColor="#DCD7C9"
          w="430px"
          h="100vh"
          flexDir="column"
          gap={8}
        >
          <Link to="/list-product" as={ReachLink}>
            <Flex textAlign={"left"}>
              <Icon
                boxSize={"7"}
                as={IoIosArrowBack}
                sx={{
                  _hover: {
                    cursor: "pointer",
                  },
                }}
              ></Icon>
              Back
            </Flex>
          </Link>

          <Flex flexDir={"column"} gap={5} overflow="auto">
            <Flex px={30} flexDir={"column"}>
              <FormControl id="productName">
                <FormLabel>
                  <Center fontSize={"30px"}> DETAIL PRODUCT</Center>
                </FormLabel>
              </FormControl>
              <Flex py={10}>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="#">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>{category}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Flex>
            </Flex>
            <Flex>
              <Flex px={4} flexDir="column" w="200px" h="400px" gap={3}>
                <Flex h="250px" flexDir="column">
                  <Image
                    w={["50px", "100px", "185px"]}
                    h={["50px", "100px", "185px"]}
                    src={imgProduct}
                    alt={`Picture of ${name}`}
                    roundedTop="lg"
                  />
                </Flex>
                <Center flexDir={"column"}>
                  Quantity
                  <NumberInput
                    maxW={"100px"}
                    onChange={(valueString) => {
                      if (valueString > props.product?.stock) {
                        // alert("melebihi stock");

                        setQty(props.product?.stock);
                      } else {
                        setQty(valueString);
                      }
                    }}
                    value={qty}
                    min={1}
                    bgColor="white"
                    borderRadius={10}
                    max={props.product?.stock}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Center>
              </Flex>
              <Flex w="200px" h="400px" gap={3} flexDir="column">
                <Flex h="250px" flexDir="column">
                  <Flex fontWeight={"bold"} fontSize="18px">
                    {name}
                  </Flex>
                  <Flex>Price : Rp. {price.toLocaleString()}</Flex>
                  <Flex>Stock : </Flex>
                  <Flex fontWeight={"bold"}>Description</Flex>
                  <Flex fontSize={"12px"}>{description}</Flex>
                </Flex>
                <Flex>
                  <Button
                    onClick={() => props.handleAddToCart(props.product, qty)}
                    colorScheme="green"
                    w={"full"}
                  >
                    Add to Cart
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
