import {
    Flex, Image, Icon, Link, Center
} from "@chakra-ui/react";
import "./user_navbar.css"
import Logo from "../../asset/logo.png";
import LogoSM from "../../asset/coffee.png";
import { BiBell, BiCartAlt, BiMenu } from "react-icons/bi";

export default function UserNavbar() {
    const navbarStyles =
    {
        width: "100%",
        backgroundColor: "#2C3639",
    };
    return (
        <Flex sx={navbarStyles} align='center' justify='space-between' className="navbar_container">
            <Image src={Logo} className='logo_lg' />
            <Image src={LogoSM} className='logo_sm' />
            <Flex w={['100px', '150px']} align='center' justify='space-between'>
                <Link>
                    <Center>
                        <Icon w={['25px', '30px', '33px']} h='auto' as={BiBell} color='white' />
                    </Center>
                </Link>
                <Link>
                    <Center>
                        <Icon w={['25px', '30px', '33px']} h='auto' as={BiCartAlt} color='white' />
                    </Center>
                </Link>
                <Link>
                    <Center>
                        <Icon w={['25px', '30px', '33px']} h='auto' as={BiMenu} color='white' />
                    </Center>
                </Link>
            </Flex>
        </Flex>
    )
}