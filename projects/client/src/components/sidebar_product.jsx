import {
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  Box,
  List,
  Input,
  Menu,
  Link,
  Button,
  Divider,
  Icon,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  ListItem,
  Tooltip,
  Center,
  Stack,
  Checkbox,
  Select,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link as ReachLink } from "react-router-dom";
import { useRef } from "react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiBox,
  FiWatch,
} from "react-icons/fi";
import { FaPowerOff } from "react-icons/fa";

export default function Sidebar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = props.data;
  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
      <Flex
        zIndex={90}
        px={2}
        w={"245px"}
        backgroundColor="white"
        justifyContent="center"
        minH={"100vh"}
        left="209"
        padding="5px"
        display={"flex"}
        borderRight={"2px solid #E2E8F0"}
        overflow="hidden"
      >
        <Flex
          flexDir={"column"}
          paddingBottom={"5px"}
          maxH={"685px"}
          overflowY="auto"
          overflowX={"hidden"}
          py="165px"
        >
          <Flex fontSize="20px" fontWeight="bold" px={5} color="#2C3639">
            CATEGORY
          </Flex>

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
                      JENIS KOPI
                    </Flex>
                  </Box>

                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex px={5} spacing={2} direction="column" fontSize="10px">
                  {data?.map((product) => {
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
                <Flex flexDir={"column"} alignItems={"center"} gap={2}>
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

          <Flex
            w="200px"
            h="56px"
            alignItems={"center"}
            borderRadius={"2%"}
            onClick={props?.filter}
            _hover={{
              bg: "#DCD7C9",
              color: "white",
              cursor: "pointer",
            }}
            py={2}
          >
            <Icon as={AiOutlineSearch} color="black" mx={2} />
            <Box as="b" mx={3} fontSize={18} color="black" textAlign={"center"}>
              {" "}
              FILTER
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
