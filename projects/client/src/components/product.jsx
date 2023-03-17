import { useEffect, useState } from "react";

import axios from "axios";
import {
  Flex,
  Image,
  InputGroup,
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
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import React from "react";

export default function ProductPage(props) {
  const data = props.data;

  return (
    <>
      <Flex
        zIndex={40}
        w="1200px"
        gap={2}
        paddingTop="20px"
        paddingBottom={"20px"}
        justifyContent="start"
        paddingX={"20px"}
        fontFamily={"Tw Cen MT"}
        flexWrap="wrap"
        flexDir={"column"}
        overflowX={"auto"}
        overflowY={"auto"}
        fontSize="30px"
        h="full"
      >
        PRODUCT LIST
        <Flex w="350px" gap={5}>
          <Center fontSize={"18px"}>Category</Center>
          <Select variant="outline">
            <option value="Arabica" selected>
              Arabica
            </option>
            <option value="Robusta">Robusta</option>
          </Select>
        </Flex>
        <Flex flexDir={"rows"} py={10}>
          {data?.map((product) => {
            return (
              <>
                <Box minW="246px" h="366px">
                  <Flex justifyContent="left">
                    <Link to={`/`}>
                      <Image
                        w="194px"
                        h="280px"
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
                    <Box fontSize="12px" as="h4" lineHeight="tight">
                      {product?.name}
                    </Box>

                    <Box fontSize="14px" as="h4">
                      <Text>Rp. {product?.price.toLocaleString()}</Text>
                    </Box>
                  </Flex>
                </Box>
              </>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
}
