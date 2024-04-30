import {
  Flex, Link, Button, useMediaQuery
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import BannerImg from "../asset/bannerImage.png"

export default function Banner() {
  const [isSmallerThan430] = useMediaQuery("(max-width: 430px)");
  return (
    <Flex
      h="636px"
      w={isSmallerThan430 ? "100%" : "430px"}
      m="0 auto"
      p={6}
      direction="column"
      justify="flex-end"
      alignItems="flex-end"
      backgroundImage={BannerImg}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Button
        w="30%"
        borderRadius="3xl"
        bg="#2C3639"
        color="white"
        border="1px solid white"
        _hover={{
          bg: "#4A5568",
          color: "white",
          boxShadow: "xl",
        }}
      >
        <Link
          to="/product-list"
          as={ReachLink}
          _hover={{ textStyle: "none" }}
        >
          Shop now
        </Link>
      </Button>
    </Flex>
  );
}
