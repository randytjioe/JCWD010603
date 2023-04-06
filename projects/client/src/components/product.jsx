import { useEffect, useState } from "react";

import axios from "axios";
import {
  Flex,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  useDisclosure,
  Textarea,
  InputGroup,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Divider,
  InputRightElement,
  Input,
  InputRightAddon,
  InputLeftAddon,
  List,
  Checkbox,
  ListItem,
  Button,
  Select,
  Grid,
  GridItem,
  Box,
  Icon,
  Center,
  IconButton,
  Slide,
  Text,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import {
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaBoxes,
  FaRegCreditCard,
  FaChartLine,
  FaCashRegister,
  FaCog,
  FaFolder,
} from "react-icons/fa";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { TbFilter } from "react-icons/tb";
import { BsPlusCircleFill } from "react-icons/bs";
import React from "react";

export default function ProductPage(props) {
  const data = props.data;
  const datacat = props.datacat;
  console.log(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const secondField = React.useRef();
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const selectPageHandle = (selectPage) => {
    if (
      selectPage >= 1 &&
      selectPage <= Math.ceil(data.length / 6) &&
      selectPage !== page
    ) {
      setPage(selectPage);
    }
  };
  const CheckCategories = (e, param) => {
    let newCat;
    if (e.target.checked) {
      props.setCat([...props.cat, param]);
    } else {
      newCat = props.cat.filter((val) => {
        return val !== param;
      });
      props.setCat([...newCat]);
    }
  };
  function inputHandler(event) {
    const { value, name } = event.target;

    name === "search"
      ? setSearch(value)
      : setProduct({
          ...product,
          [name]: value,
        });
  }
  return (
    <>
      <Flex
        zIndex={40}
        w="800px"
        gap={2}
        paddingTop="20px"
        paddingBottom={"20px"}
        justifyContent="start"
        fontFamily={"Tw Cen MT"}
        flexWrap="wrap"
        flexDir={"column"}
        overflowX={"auto"}
        overflowY={"auto"}
        fontSize="30px"
        h="full"
      >
        PRODUCT LIST
        <Divider orientation="horizontal" m={2} />
        <Flex gap={3}>
          <InputGroup gap={3}>
            <Input
              onKeyDown={(e) =>
                e.key === "Enter" ? props?.fin(e.target.value) : null
              }
              backgroundColor={"white"}
              type="tel"
              placeholder="Search"
              w="400px"
              h="35px"
              borderRadius={"none"}
              onChange={inputHandler}
              name="search"
              gap={3}
            ></Input>
            <Flex
              justifyContent="center"
              textAlign="center"
              h="35px"
              w="35px"
              onClick={() => props?.fin(search)}
              _hover={{
                bg: "grey",
                color: "black",
                cursor: "pointer",
              }}
              borderRadius="100%"
              bgColor={"#DCD7C9"}
            >
              {" "}
              <Center>
                <Icon as={AiOutlineSearch} justifyContent="center"></Icon>
              </Center>{" "}
            </Flex>
            <Button leftIcon={<TbFilter />} colorScheme="teal" onClick={onOpen}>
              Filter
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              initialFocusRef={firstField}
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  <Flex
                    w="200px"
                    h="56px"
                    alignItems={"center"}
                    borderRadius={"2%"}
                    _hover={{
                      bg: "#DCD7C9",
                      color: "white",
                      cursor: "pointer",
                    }}
                    py={2}
                  >
                    <Icon as={FaFolder} color="black" mx={2} />
                    <Box
                      as="b"
                      mx={3}
                      fontSize={18}
                      color="black"
                      textAlign={"center"}
                    >
                      {" "}
                      CATEGORIES
                    </Box>
                  </Flex>
                </DrawerHeader>

                <DrawerBody>
                  <Stack spacing="24px">
                    <Accordion defaultIndex={[0]} allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <Flex
                                px={2}
                                fontSize="18px"
                                color={"#2C3639"}
                                fontWeight="bold"
                                maxH={"500px"}
                              >
                                TYPES OF COFFEE
                              </Flex>
                            </Box>

                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Flex
                            px={5}
                            spacing={2}
                            direction="column"
                            fontSize="10px"
                          >
                            {datacat?.map((product) => {
                              return (
                                <>
                                  <Checkbox
                                    colorScheme="cyan"
                                    onChange={(e) => {
                                      CheckCategories(e, `${product?.name}`);
                                    }}
                                  >
                                    {product?.name}
                                  </Checkbox>
                                </>
                              );
                            })}
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>

                    <Accordion defaultIndex={[0]} allowToggle>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              <Flex
                                px={2}
                                fontSize="18px"
                                color={"#2C3639"}
                                fontWeight="bold"
                              >
                                SORT
                              </Flex>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Flex
                            flexDir={"column"}
                            alignItems={"center"}
                            gap={2}
                          >
                            <Select
                              variant="outline"
                              onChange={(e) => {
                                props.setSortBy(e.target.value);
                              }}
                            >
                              <option value="name" selected>
                                NAME
                              </option>
                              <option value="price">PRICE</option>
                            </Select>

                            <Select
                              variant="outline"
                              onChange={(e) => {
                                props.setSort(e.target.value);
                              }}
                            >
                              <option value="ASC" selected>
                                A - Z / MIN - MAX
                              </option>
                              <option value="DESC">Z - A / MAX KE MIN</option>
                            </Select>
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>

                  <Button colorScheme="blue" onClick={props?.filter}>
                    Filter
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Button leftIcon={<BsPlusCircleFill />} colorScheme="red">
              Add Product
            </Button>
          </InputGroup>
          {/* <Select variant="outline">
            <option value="Arabica" selected>
              Arabica
            </option>
            <option value="Robusta">Robusta</option>
          </Select> */}
        </Flex>
        <Flex
          zIndex={40}
          w="800px"
          gap={2}
          paddingTop="20px"
          paddingBottom={"20px"}
          justifyContent="start"
          flexDir={"row"}
          flexWrap="wrap"
          overflowX={"auto"}
          overflowY={"auto"}
          h="full"
        >
          {data.slice(page * 6 - 6, page * 6)?.map((product, index) => {
            console.log(product.imgProduct);
            return (
              <>
                <Box minW="246px" h="300px">
                  <Flex justifyContent="left">
                    <Image
                      w="190px"
                      h="190px"
                      src={product?.imgProduct}
                      alt={`Picture of ${product?.name}`}
                      roundedTop="lg"
                    />
                  </Flex>
                  <Flex
                    mt="1"
                    justifyContent="space-between"
                    alignContent="center"
                    flexDir={"column"}
                    w="194px"
                  >
                    <Box
                      fontSize="14px"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                    >
                      {product?.category}
                    </Box>
                    <Box fontSize="14px" as="h4" lineHeight="tight">
                      {product?.name}
                    </Box>

                    <Box fontSize="14px" as="h4">
                      <Text>
                        {" "}
                        Harga : Rp. {product?.price.toLocaleString()}
                      </Text>
                    </Box>
                    <Box fontSize="14px" as="h4"></Box>
                  </Flex>
                </Box>
              </>
            );
          })}
        </Flex>
        <Center gap={10}>
          {/* <Center minW="60px" h={"60px"}>
            <IconButton
              aria-label="right-arrow"
              colorScheme="grey"
              borderRadius="full"
              borderStyle={"none"}
              variant="outline"
              zIndex={2}
              onClick={() => {
                if (props.page - 6 < 0) {
                  props.setPage(0);
                } else {
                  props.setPage(props.page - 6);
                }

                props.fetchData(props.page - 6);
              }}
            >
              <BiLeftArrowAlt />
            </IconButton>
          </Center>
         
          <Center minW="60px" h={"60px"}>
            <IconButton
              aria-label="right-arrow"
              colorScheme="gray"
              borderRadius="full"
              borderStyle={"none"}
              variant="outline"
              zIndex={2}
              onClick={() => {
                props.setPage(props.page + 6);
                props.fetchData(props.page + 6);
              }}
            >
              <BiRightArrowAlt />
            </IconButton>
          </Center> */}
          {data.length > 0 && (
            <Flex gap={5}>
              <Button onClick={() => selectPageHandle(page - 1)}>
                <BiLeftArrowAlt />
              </Button>
              <Flex gap={5}>
                {[...Array(Math.ceil(data.length / 6))].map((n, i) => {
                  return (
                    <>
                      <Box
                        className={`num ${page === i + 1 ? `numActive` : ""}`}
                        onClick={() => selectPageHandle(i + 1)}
                        // bgColor="#2C3639"
                      >
                        {i + 1}
                      </Box>
                    </>
                  );
                })}
              </Flex>
              <Button onClick={() => selectPageHandle(page + 1)}>
                {" "}
                <BiRightArrowAlt />
              </Button>
            </Flex>
          )}
        </Center>
      </Flex>
    </>
  );
}
