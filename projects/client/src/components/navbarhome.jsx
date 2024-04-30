import {
  Flex,
  Image,
  List,
  Link,
  Divider,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  ListItem,
  Center,
  useMediaQuery,
} from "@chakra-ui/react";

import { Link as ReachLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import LogoHD from "../asset/logo.png";
export default function NavbarHome(props) {
  const [isSmallerThan430] = useMediaQuery("(max-width: 430px)");
  return (
    <>
      {/* <Center flex={1} align={"center"} justifyContent={"center"}> */}
        <Flex
          zIndex={100}
          m='0 auto'
          h="70px"
          backgroundColor="#2C3639"
          w={isSmallerThan430 ? "100%" : "430px"}
          padding="20px"
          borderBottom={"2px solid #E2E8F0"}
          display={"flex"}
          pos="sticky"
        >
          <Flex w='100%' gap={5}>
            <Flex alignItems={"center"} justify='space-between' w='100%'>
              <Link to="/" as={ReachLink}>
                <Image
                  fontSize={"26px"}
                  color="#F68522"
                  justifyContent="center"
                  src={LogoHD}
                  w="100px"
                  h="24px"
                ></Image>
              </Link>
              {/* <Flex px={"70px"} alignItems="center"></Flex> */}

              <Flex w='85px' justify='space-between'>
                <Link to="/cart" as={ReachLink}>
                  <Icon
                    boxSize={"7"}
                    as={SlBasket}
                    color="white"
                    sx={{
                      _hover: {
                        cursor: "pointer",
                      },
                    }}
                  ></Icon>
                </Link>


                <Popover trigger={"hover"} placement={"bottom-end"} gap={10}>
                  <PopoverTrigger>
                    <Flex flexDir={"rows"} px={2} alignContent={"center"}>
                      <Icon
                        boxSize={"7"}
                        as={AiOutlineMenu}
                        color="white"
                        sx={{
                          _hover: {
                            cursor: "pointer",
                          },
                        }}
                      ></Icon>
                    </Flex>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow backgroundColor={"#A27B5C"} />

                    <PopoverHeader bgColor={"#A27B5C"} color="white" textAlign='center'>
                      {" "}
                      WELCOME !
                    </PopoverHeader>
                    <PopoverBody>
                      <List fontSize={"14px"} color="#7D7D7D" gap={5} textAlign='center'>
                        <ListItem>
                          <Link to="/register" as={ReachLink}>
                            REGISTER
                          </Link>
                        </ListItem>
                        <Divider orientation="horizontal" m={2} />
                        <ListItem>
                          <Link to="/login" as={ReachLink}>
                            SIGN IN
                          </Link>
                        </ListItem>

                        <Divider orientation="horizontal" m={2} />
                      </List>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      {/* </Center> */}
    </>
  );
}
