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
  Checkbox,
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
  Text,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { BiNotepad } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import { BsShop } from "react-icons/bs";
import { TbDiscount } from "react-icons/tb";

import { axiosInstance, beautyScroll } from "../config/config";
import { IoIosArrowBack, IoIosCloseCircleOutline } from "react-icons/io";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FaUserCircle, FaShippingFast } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { BiTrash, BiEdit, BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { AiFillCamera } from "react-icons/ai";
import { userLogin } from "../redux/middleware/userauth";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function NewOrder(props) {
  const data = props.data;
  const dataaddress = props.dataaddress;
  console.log(data);

  const [cartTotal, setCartTotal] = useState(0);
  return (
    <>
      <Center flex={1} align={"center"} justifyContent={"center"}>
        <Flex
          spacing={4}
          maxW={"md"}
          bgColor="#DCD7C9"
          w="430px"
          h="1000px"
          color="white"
          flexDir="column"
          gap={1}
        >
          <Flex
            w="430px"
            h="100px"
            bgColor="#2C3639"
            flexDir={"column"}
            gap={2}
          >
            <Link to="/cart" as={ReachLink}>
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

            <Center flexDir={"column"} gap={3} overflow="auto">
              <Flex flexDir={"column"}>
                <FormControl id="productName">
                  <FormLabel>
                    <Center fontSize={"30px"}> CHECKOUT</Center>
                  </FormLabel>
                </FormControl>
              </Flex>
            </Center>
          </Flex>
          <Flex
            flexDir={"row"}
            flexWrap="wrap"
            h="800px"
            overflowX={"auto"}
            overflowY={"auto"}
            sx={beautyScroll}
          >
            <Flex
              flexDir={"column"}
              w="85%"
              h="140px"
              m="0 auto"
              align="left"
              color={"black"}
              fontSize={["xs", "sm"]}
              gap={3}
              py={3}
              justify="space-between"
            >
              <Flex
                fontSize={["xs", "sm"]}
                fontWeight="bold"
                gap={2}
                flexDir={"column"}
              >
                <Flex gap={2}>
                  <Icon as={TfiLocationPin} w="20px" h="20px"></Icon>
                  Address Shipping
                </Flex>
                <Flex>
                  {" "}
                  <Flex flexDir={"column"} w="260px" px={7}>
                    <Flex gap={2}>
                      <Flex fontSize="12px" color="#2C3639">
                        {dataaddress?.Ket} |
                      </Flex>
                      <Flex fontSize="12px" color="#2C3639">
                        {dataaddress?.isPrimary == 1 ? (
                          <Badge variant="solid" colorScheme="green">
                            Primary Address
                          </Badge>
                        ) : null}
                      </Flex>
                    </Flex>
                    <Flex fontSize="12px" color="#2C3639">
                      {dataaddress?.address}
                    </Flex>
                    <Flex fontSize="12px" color="#2C3639">
                      {dataaddress?.district}, {dataaddress?.city},{" "}
                      {dataaddress?.province}
                    </Flex>
                    <Flex fontSize="12px" color="#2C3639">
                      {dataaddress?.postalCode}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              <Flex
                justify="flex-end"
                w="100%"
                h={["5px", "10px", "15px"]}
                borderBottom="1px solid white"
                align="center"
              ></Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              w="85%"
              h="30px"
              m="0 auto"
              align="left"
              color={"black"}
              fontSize={["xs", "sm"]}
              gap={3}
              justify="space-between"
            >
              <Flex fontSize={["xs", "sm"]} fontWeight="bold" gap={2}>
                <Flex gap={2}>
                  <Icon as={BsShop} w="20px" h="20px"></Icon>
                  KOPIO CABANG PADANG
                </Flex>
              </Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              sx={beautyScroll}
              overflowX={"auto"}
              overflowY={"auto"}
              gap={3}
              py={3}
              h="250px"
            >
              {data.filterCart?.map((val) => {
                return (
                  <>
                    <Flex w="100%" align="left" px={8}>
                      <Flex
                        w={["65px", "70px", "75px"]}
                        h={["65px", "70px", "75px"]}
                        borderRadius={5}
                        overflow="hidden"
                      >
                        <Image
                          src={val.Product.imgProduct}
                          objectFit="cover"
                          w="100%"
                          h="auto"
                        />
                      </Flex>
                      <Flex
                        w={["65%", "70%", "75%", "80%"]}
                        h={["65px", "70px", "75px"]}
                        pl={3}
                        direction="column"
                        justify="space-between"
                      >
                        <Flex flexDir={"column"} textAlign={"left"} gap={2}>
                          <Text
                            color="#2C3639"
                            fontWeight="bold"
                            fontSize={["xs", "sm"]}
                            letterSpacing={2}
                          >
                            {val.Product.name}
                          </Text>
                          <Text
                            color="#2C3639"
                            fontWeight="bold"
                            fontSize={["xs", "sm"]}
                          >
                            Rp {val.Product.price.toLocaleString()} ✕ {val.qty}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex
                      justify="flex-end"
                      w="100%"
                      h={["5px", "10px", "15px"]}
                      borderBottom="1px solid white"
                      align="center"
                    ></Flex>
                  </>
                );
              })}
            </Flex>

            <Flex
              flexDir={"column"}
              w="85%"
              h="100px"
              m="0 auto"
              align="left"
              color={"black"}
              fontSize={["xs", "sm"]}
              justify="space-between"
              py={2}
            >
              <Flex
                fontSize={["xs", "sm"]}
                fontWeight="bold"
                flexDir={"column"}
                gap={3}
              >
                <Flex gap={2}>
                  <Icon as={FaShippingFast} w="20px" h="20px"></Icon>
                  Shipping Option
                </Flex>
                <Flex>
                  <Select bgColor={"white"}>
                    <option> JNE</option>
                    <option> TIKI</option>
                    <option> POS</option>
                  </Select>
                </Flex>
              </Flex>

              <Flex
                justify="flex-end"
                w="100%"
                h={["5px", "10px", "15px"]}
                borderBottom="1px solid white"
                align="center"
              ></Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              w="85%"
              h="100px"
              m="0 auto"
              align="left"
              color={"black"}
              fontSize={["xs", "sm"]}
              gap={3}
              py={3}
              justify="space-between"
            >
              <Flex
                fontSize={["xs", "sm"]}
                fontWeight="bold"
                flexDir={"column"}
                gap={3}
              >
                <Flex gap={2}>
                  <Icon as={RiMoneyDollarCircleLine} w="20px" h="20px"></Icon>
                  Payment Method
                </Flex>
                <Flex>
                  <Select bgColor={"white"}>
                    <option> Manual Transfer</option>
                  </Select>
                </Flex>
              </Flex>

              <Flex
                justify="flex-end"
                w="100%"
                h={["5px", "10px", "15px"]}
                borderBottom="1px solid white"
                align="center"
              ></Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              w="85%"
              h="50px"
              m="0 auto"
              align="left"
              color={"black"}
              fontSize={["xs", "sm"]}
              justify="space-between"
              py={2}
            >
              <Flex
                fontSize={["xs", "sm"]}
                fontWeight="bold"
                flexDir={"column"}
                gap={3}
              >
                <Button gap={2}>
                  <Icon as={TbDiscount} w="20px" h="20px"></Icon>
                  Use promo
                </Button>
              </Flex>
              <Flex
                justify="flex-end"
                w="100%"
                h={["5px", "10px", "15px"]}
                borderBottom="1px solid white"
                align="center"
              ></Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              w="85%"
              h="60px"
              m="0 auto"
              align="left"
              color={"black"}
              fontSize={["xs", "sm"]}
              gap={3}
              py={3}
              justify="space-between"
            >
              <Flex fontSize={["xs", "sm"]} fontWeight="bold" gap={2}>
                <Icon as={BiNotepad} w="20px" h="20px"></Icon>
                Payment Detail
              </Flex>
              <Flex>
                <Flex flexDir={"column"}>
                  <Flex fontSize={["xs", "sm"]}>Subtotal Products </Flex>
                  <Flex fontSize={["xs", "sm"]}>Shipping Fees </Flex>
                  <Flex fontSize={["xs", "sm"]}>Discount</Flex>
                  <Flex fontSize={["md", "lg", "xl"]}>Total </Flex>
                </Flex>
                <Flex flexDir={"column"} px={10} textAlign={"left"}>
                  <Text fontSize={["xs", "sm"]}>
                    : Rp {data?.totalPrice.toLocaleString()}
                  </Text>
                  <Text fontSize={["xs", "sm"]}> : Rp 0</Text>
                  <Text fontSize={["xs", "sm"]}> : Rp 0</Text>
                  <Text fontSize={["md", "lg", "xl"]}>
                    : Rp {data?.totalPrice.toLocaleString()}
                  </Text>
                </Flex>
              </Flex>
              <Flex
                justify="flex-end"
                w="100%"
                h={["5px", "10px", "15px"]}
                borderBottom="1px solid white"
                align="center"
              ></Flex>
            </Flex>
          </Flex>
          <Flex
            gap={5}
            w="430px"
            position={"fixed"}
            bottom={0}
            h="50px"
            bgColor="white"
            color={"black"}
            border="1px solid black"
          >
            <Flex
              fontSize={["xs", "sm"]}
              flexDir={"column"}
              w="70%"
              textAlign={"right"}
            >
              <Text>Total Payment</Text>
              <Text fontWeight="bold">
                Rp {data?.totalPrice.toLocaleString()}
              </Text>
            </Flex>

            <Center bgColor="#2C3639" color="white" w="50%" fontWeight="bold">
              <Link href="/upload-payment">Create Order</Link>
            </Center>
          </Flex>
        </Flex>
      </Center>
    </>
  );
}
