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
  IconButton,
  Slide,
  Text,
  Stack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import React from "react";
import Pagination from "./pagination";

export default function ProductPage(props) {
  const data = props.data;
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
        <Flex>
          <InputGroup>
            <Input
              onKeyDown={(e) =>
                e.key === "Enter" ? props?.filter(e.target.value) : null
              }
              backgroundColor={"white"}
              type="tel"
              placeholder="Search"
              w="470px"
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
              onClick={() => props?.filter(search)}
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
            console.log(product.imgProduct)
            return (
              <>
                <Box minW="246px" h="300px">
                  <Flex justifyContent="left">
                    <Link to={`/`}>
                      <Image
                        w="190px"
                        h="190px"
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
                    <Box fontSize="14px" as="h4">
                      <Text>Stock :</Text>
                    </Box>
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
                      <Button onClick={() => selectPageHandle(i + 1)}>
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
      </Flex>
    </>
  );
}
