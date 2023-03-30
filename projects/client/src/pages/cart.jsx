import {
    Flex, Box, IconButton, Image, Text, Heading, Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { axiosInstance } from "../config/config";
import { BiTrash, BiEdit, BiChevronRight, BiChevronLeft } from "react-icons/bi";

export default function Cart() {
    const [cartData, setCartData] = useState([]);
    const [pages, setPages] = useState(1);
    const [numOfPage, setNumOfPage] = useState(0);

    const deleteButtonStyle = {
        _hover: {
            bg: 'none',
            border: '2px solid #9e3939',
            color: '#9e3939',
            transform: 'scale(1.05)'
        },
        _active: {
            size: 'sm',
        }
    }
    const editButtonStyle = {
        _hover: {
            bg: 'none',
            border: '2px solid #496da3',
            color: '#496da3',
            transform: 'scale(1.05)'
        },
        _active: {
            border: '2px solid #293357',
            color: '#293357',
        }
    }
    const confirmButtonStyle = {
        _hover: {
            bg: '#3e4b4f',
        },
        _active: {
            bg: '#232b2e',
        }
    }
    const scrollStyle = {
        '::-webkit-scrollbar': {
            height: '0.2em',
            width: '0.2em',
            backgroundColor: 'none',
            borderRadius: '10px'
        },
        '::-webkit-scrollbar-thumb': {
            // backgroundColor: '#181D31',
            backgroundColor: 'gray.200',
            borderRadius: '10px'
        },
        '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555555',
            borderRadius: '10px'
        },
    }


    async function fetchCartData() {
        await axiosInstance.get(`/user/cart?page=${pages}`).then((res) => {
            setCartData(res.data.result)
            setNumOfPage(res.data.totalPages)
        })
    };

    useEffect(() => {
        fetchCartData()
    }, [pages]);

    return (
        <Flex direction='column'>
            <Navbar />

            <Flex w='430px' h='90vh' m='0 auto' direction='column' sx={scrollStyle}> {/* Cart Body */}
                <Heading textAlign='center' color='#2C3639' my={5}>
                    Cart
                </Heading>

                <Flex direction='column' w='85%' h='60%' m='0 auto' py={5}
                    borderBottom='4px solid #2C3639' borderTop='4px solid #2C3639'
                    overflow='auto' sx={scrollStyle} borderRadius={5}
                > {/* Cart Container  */}
                    {
                        cartData?.map((val) => {
                            return <>
                                <Flex w='100%' align='center' m='10px auto 0px'>
                                    <Flex w={['65px', '70px', '75px']} h={['65px', '70px', '75px']} borderRadius={5} overflow='hidden'>
                                        <Image src="https://images.unsplash.com/photo-1512372388054-a322888e67a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                                            objectFit='cover' w='100%' h='auto'
                                        />
                                    </Flex>
                                    <Flex w={['55%', '60%', '65%', '70%']} h={['65px', '70px', '75px']} pl={3} direction='column' justify='space-between'>
                                        <Box>
                                            <Text color='#2C3639' fontWeight='bold' fontSize={['sm', 'md']} letterSpacing={2}>
                                                {val.Product.name}
                                            </Text>
                                            <Text color='#2C3639' fontWeight='bold' fontSize={['xs', 'sm']}>
                                                Rp {val.Product.price.toLocaleString()}
                                            </Text>
                                        </Box>
                                        <Text color='#2C3639' fontSize='2xs' fontWeight='bold'>
                                            ✕ 1
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justify='flex-end' w='100%' h={['30px', '35px', '40px']} m='0px auto 10px' borderBottom="1px solid #2C3639" align='center'>
                                    <Flex mr={4} py={2}>
                                        <IconButton size='xs' as={BiTrash} color='gray.400' bg='none' cursor='pointer' mr={3} sx={deleteButtonStyle} />
                                        <IconButton size='xs' as={BiEdit} color='gray.400' bg='none' cursor='pointer' sx={editButtonStyle} />
                                    </Flex>
                                </Flex>
                            </>
                        })
                    }

                </Flex>
                <Flex w='85%' h='50px' m='0 auto' justify='space-between' align='center'>
                    <IconButton size='sm' as={BiChevronLeft} bg='none' cursor='pointer' />

                    <IconButton size='sm' as={BiChevronRight} bg='none' cursor='pointer' />
                </Flex>
                <Button w='85%' m='10px auto 0px' bg='#2C3639' color='white' sx={confirmButtonStyle}>
                    Confirm & Buy
                </Button>

            </Flex>

        </Flex>
    )
}