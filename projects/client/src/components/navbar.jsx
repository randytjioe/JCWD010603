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
import { useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { useDispatch } from "react-redux";
import user_types from "../redux/auth/types";
import LogoHD from "../asset/logo.png";

export default function Navbar(props) {
  const userSelector = useSelector((state) => state.auth);

  let dispatch = useDispatch();
  function logOut() {
    dispatch({
      type: user_types.USER_LOGOUT,
    });
    localStorage.clear();
    window.location.reload(true);
  }
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
            <Flex w='100%' alignItems={"center"} justify='space-between'>
              <Link to="/" as={ReachLink}>
                <Image
                  fontSize={"26px"}
                  color="#F68522"
                  justifyContent="center"
                  src={LogoHD}
                  w="100px"
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


                <Popover trigger={"hover"} placement="bottom-end" gap={10}>
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
                  <PopoverContent minW={{ base: "100%", lg: "max-content" }}>
                    <PopoverArrow backgroundColor={"#A27B5C"} />

                    <PopoverHeader bgColor={"#A27B5C"} color="white" textAlign='center'>
                      {" "}
                      WELCOME {userSelector?.username}!
                    </PopoverHeader>
                    <PopoverBody>
                      <List fontSize={"14px"} color="#7D7D7D" gap={5} textAlign='center'>
                        <Divider orientation="horizontal" m={2} />
                        <ListItem>
                          <Link to="/user-transactions" as={ReachLink}>
                            TRANSACTION LIST
                          </Link>
                        </ListItem>
                        <Divider orientation="horizontal" m={2} />
                        <ListItem>
                          <Link to="/profile" as={ReachLink}>
                            PROFILE
                          </Link>
                        </ListItem>
                        <Divider orientation="horizontal" m={2} />
                        <ListItem>
                          <Link to="/address" as={ReachLink}>
                            ADDRESS
                          </Link>
                        </ListItem>
                        <Divider orientation="horizontal" m={2} />
                        <ListItem>
                          <Link to="/password-change" as={ReachLink}>
                            CHANGE PASSWORD
                          </Link>
                        </ListItem>
                        <Divider orientation="horizontal" m={2} />
                        <ListItem>
                          <Link to="/login" as={ReachLink} onClick={logOut}>
                            LOGOUT{" "}
                          </Link>{" "}
                        </ListItem>
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
