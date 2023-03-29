import { useEffect, useState } from "react";

import axios from "axios";
import {
  Flex,
  Image,
  InputGroup,
  Divider,
  InputRightElement,
  Input,
  InputRightAddon,
  List,
  ListItem,
  Button,
  Select,
  Grid,
  GridItem,
  Box,
  Icon,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  ButtonGroup,
  PopoverFooter,
  IconButton,
  Slide,
  Text,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
} from "@chakra-ui/react";
import { TbFilter } from "react-icons/tb";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { GrSort, GrFilter } from "react-icons/gr";
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
import { Link } from "react-router-dom";
import React from "react";
import Pagination from "./pagination";

export default function ProductUserPage(props) {
  const data = props.data;
  const datacat = props.datacat;
  console.log(data);
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

  function inputHandler(event) {
    const { value, name } = event.target;

    name === "search"
      ? setSearch(value)
      : setProduct({
          ...product,
          [name]: value,
        });
  }
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
  return (
    <>
      <Center
        w="430px"
        zIndex={20}
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
        <Flex>
          <InputGroup gap={3}>
            <Input
              onKeyDown={(e) =>
                e.key === "Enter" ? props?.fin(e.target.value) : null
              }
              backgroundColor={"white"}
              type="tel"
              placeholder="Search"
              w="200px"
              h="35px"
              borderRadius={"none"}
              onChange={inputHandler}
              name="search"
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
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <Flex
                  justifyContent="center"
                  textAlign="center"
                  h="35px"
                  w="35px"
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
                    <Icon as={TbFilter} justifyContent="center"></Icon>
                  </Center>{" "}
                </Flex>
              </PopoverTrigger>
              <PopoverContent color="white" bg="#DCD7C9">
                <PopoverHeader pt={4} fontWeight="bold" border="0">
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
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton
                  color={"white"}
                  bgColor={"red"}
                  borderRadius="100%"
                />
                <PopoverBody>
                  <Accordion defaultIndex={[0]} allowMultiple color={"black"}>
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
                          color={"black"}
                        >
                          {datacat?.map((product) => {
                            return (
                              <>
                                <Checkbox
                                  colorScheme="cyan"
                                  borderColor={"black"}
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

                  <Accordion defaultIndex={[0]} allowToggle color={"black"}>
                    <AccordionItem>
                      <h2>
                        <AccordionButton color={"black"}>
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
                        <Flex flexDir={"column"} alignItems={"center"} gap={2}>
                          <Select
                            variant="outline"
                            bgColor={"white"}
                            color="black"
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
                            bgColor={"white"}
                            color="black"
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
                </PopoverBody>
                <PopoverFooter
                  border="0"
                  display="flex"
                  alignItems="center"
                  justifyContent="right"
                  pb={4}
                >
                  <ButtonGroup size="sm">
                    <Flex
                      borderRadius={"2%"}
                      onClick={props?.filter}
                      _hover={{
                        bg: "#DCD7C9",
                        color: "white",
                        cursor: "pointer",
                      }}
                      py={2}
                    >
                      <Button colorScheme="green" fontSize={"18px"}>
                        Filter
                      </Button>
                    </Flex>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </InputGroup>
        </Flex>
        <Flex
          w="350px"
          gap={5}
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
            return (
              <>
                <Box minW="150px" h="300px">
                  <Flex justifyContent="left">
                    <Link to={`/`}>
                      <Image
                        w="165px"
                        h="165px"
                        src={product?.imgProduct}
                        alt={`Picture of ${product?.name}`}
                        roundedTop="lg"
                      />
                    </Link>
                  </Flex>
                  <Flex
                    mt="1"
                    justifyContent="space-between"
                    alignContent="center"
                    flexDir={"column"}
                    w="150px"
                  >
                    <Box
                      fontSize="12px"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                    >
                      {product?.category}
                    </Box>
                    <Box fontSize="12px" as="h4" lineHeight="tight">
                      {product?.name}
                    </Box>

                    <Box fontSize="12px" as="h4">
                      <Text>
                        {" "}
                        Harga : Rp. {product?.price.toLocaleString()}
                      </Text>
                    </Box>
                    <Box fontSize="12px" as="h4">
                      <Text>Stock :</Text>
                    </Box>
                  </Flex>
                </Box>
              </>
            );
          })}
        </Flex>
        <Center gap={10} w="350px">
          {data.length > 0 && (
            <Flex gap={5}>
              <Button onClick={() => selectPageHandle(page - 1)}>
                <BiLeftArrowAlt />
              </Button>
              <Flex gap={5}>
                {[...Array(Math.ceil(data.length / 6))].map((n, i) => {
                  return (
                    <>
                      <Button
                        onClick={() => selectPageHandle(i + 1)}
                        bgColor="#DCD7C9"
                      >
                        {i + 1}
                      </Button>
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
      </Center>
    </>
  );
}
