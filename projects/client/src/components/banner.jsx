import {
  Flex, Heading, Button
} from "@chakra-ui/react";
import BannerImg from "../asset/bannerImage.jpg"

export default function Banner() {
  return (
    <Flex
      h="636px" w="430px" m='0 auto' p={6} direction='column'
      justify='space-between' alignItems="flex-end" 
      backgroundImage={BannerImg} backgroundPosition="center"
      backgroundRepeat="no-repeat" backgroundSize='cover'
    >
      <Heading color='white' textAlign='center' size="lg" >
        Freshly Roasted Coffee Beans Delivered to You
      </Heading>
      
      <Button w='30%' borderRadius='3xl' bg='#2C3639' color='white'>
        Shop now
      </Button>
    </Flex>
  );
}
