import {
    Flex, Heading, Button, Text, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, FormControl,
    Input, AlertDialogFooter, useDisclosure, Tooltip, IconButton

} from '@chakra-ui/react';
import SidebarAdmin from '../components/sidebar_admin';
import "../style/adminVoucher.css";
import { axiosInstance } from '../config/config';
import { useEffect, useState } from 'react';
import React from "react";
import { FiX } from "react-icons/fi";

export default function Discount() {
    const [voucherType, setVoucherType] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [typeInput, setTypeInput] = useState('');
    const [deleteTypeId, setDeleteTypeId] = useState(null);
    const [typeAlert, setTypeAlert] = useState(false);
    const cancelRef = React.useRef()

    const webkit = {
        '::-webkit-scrollbar': {
            height: '0.3em',
            width: '0.3em',
            backgroundColor: 'none',
            borderRadius: '10px'
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray.200',
            borderRadius: '10px'
        },
        '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555555',
            borderRadius: '10px'
        },
    };
    const confirmButtonStyle = {
        _hover: {
            bg: '#3e4b4f',
        },
        _active: {
            bg: '#232b2e',
        }
    };
    function handleTypeInput(e) {
        setTypeInput(e.target.value);
    };
    async function createType() {
        const data = {
            name: typeInput,
        }
        await axiosInstance.post("/admin/addvouchertype", data).then(() => {
            fetchVoucherType();
        }).finally(() => {
            onClose()
        })
    };
    function onEnterCreateType(e) {
        if (e.key === 'Enter') {
            createType();
        }
    }

    async function fetchVoucherType() {
        await axiosInstance.get("/admin/voucherType").then((res) => {
            setVoucherType([...res.data.result])
        })
    };

    useEffect(() => {
        fetchVoucherType()
    }, [])

    function deleteTypeAlert(id) {
        setDeleteTypeId(id);
        setTypeAlert(true)
    }
    function handleTypeCancelDelete() {
        setTypeAlert(false)
    }

    async function deleteType() {
        try {
            await axiosInstance.delete(`/admin/deletevouchertype/${deleteTypeId}`);
            fetchVoucherType();
            setTypeAlert(false)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(`Voucher type with ID ${deleteType} not found.`);
            } else {
                console.log(`Error deleting voucher type: ${error.message}`);
            }
        }
    }
    console.log(voucherType);


    return (
        <Flex w='100%' bg='gray.100' sx={webkit} overflow='auto'>
            <SidebarAdmin />
            <Flex h='100vh' w='80%' m='0 auto' direction='column' justify='space-around'
                sx={webkit} overflow='auto'
            >

                <Flex w='100%' minH='150px' h='30%' direction='column' px={5} py={2}>
                    <Flex mb={5} align='center'>
                        <Button size={['xs', 'sm']} bg='#2C3639' color='white' sx={confirmButtonStyle} onClick={onOpen}>
                            Create new
                        </Button>
                        <Heading ml={5} size={['sm', 'md']}>Voucher type</Heading>
                    </Flex>
                    <Flex w={['100%', '100%', '70%', '40%']} h='90%' overflow='auto' sx={webkit} direction='column' bg='white' borderRadius={10} py={2}>
                        {
                            voucherType?.map((val, idx) => {
                                return <>
                                    <Flex key={idx} borderBottom='1px solid #2c3639' w='90%' m='5px auto' justify='space-between' align='center'>
                                        <Text fontWeight='bold'>
                                            {idx + 1}.
                                        </Text>
                                        <Flex w={['100%', '100%', '70%', '40%']} align='center' justify='space-between'>
                                            <Text fontWeight='bold'>
                                                {val.name}
                                            </Text>

                                            <Tooltip label='Delete' placement='top-start'>
                                                <IconButton //delete button
                                                    icon={<FiX />}
                                                    borderRadius='full'
                                                    bg='none' onClick={() => deleteTypeAlert(val.id)}
                                                    _hover={{
                                                        color: 'maroon',
                                                        backgroundColor: 'none'
                                                    }}
                                                />
                                            </Tooltip>
                                        </Flex>
                                    </Flex>
                                </>
                            })
                        }
                        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold' textAlign='center'>
                                        Add new type
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        <FormControl id="vouchertype" >
                                            <Input name="vouchertype" type="text" placeholder={'Create a new type'} onChange={handleTypeInput} onKeyDown={onEnterCreateType} />
                                        </FormControl>
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button bg='#2C3639' color='white' onClick={createType} ml={3} sx={confirmButtonStyle}>
                                            Create
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>

                        <AlertDialog
                            motionPreset='slideInBottom'
                            isOpen={typeAlert}
                            leastDestructiveRef={cancelRef}
                            onClose={handleTypeCancelDelete}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign='center'>
                                        Delete type
                                    </AlertDialogHeader>

                                    <AlertDialogBody textAlign='center'>
                                        Are you sure you want to delete this type?
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={handleTypeCancelDelete}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme="red" onClick={deleteType} ml={3}>
                                            Delete
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </Flex>
                </Flex>

                <Flex w='100%' minH='400px' h='60%' direction='column' px={5}>
                    <Flex mb={5}>
                        <Button size={['xs', 'sm']} bg='#2C3639' color='white' sx={confirmButtonStyle}>
                            Create Voucher
                        </Button>
                        <Heading ml={5} size={['sm', 'md']}>Voucher List</Heading>
                    </Flex>
                    <Flex w='100%' h='90%' sx={webkit} bg='white' borderRadius={10}>

                    </Flex>
                </Flex>

            </Flex>
        </Flex>
    )
}