import {
    Flex, Heading, Button, Text, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, FormControl,
    Input, AlertDialogFooter, useDisclosure, Tooltip, IconButton, Center, FormLabel, Select, Alert, AlertIcon,

} from '@chakra-ui/react';
import SidebarAdmin from '../components/sidebar_admin';
import "../style/adminVoucher.css";
import { axiosInstance } from '../config/config';
import { useEffect, useState } from 'react';
import React from "react";
import { FiX } from "react-icons/fi";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';

export default function Discount() {
    YupPassword(Yup);
    const [voucherType, setVoucherType] = useState([]); //voucher_type
    const { isOpen: isOpenVoucher, onOpen: onOpenVoucher, onClose: onCloseVoucher } = useDisclosure();
    const { isOpen: isOpenType, onOpen: onOpenType, onClose: onCloseType } = useDisclosure();
    const [typeInput, setTypeInput] = useState('');
    const [deleteTypeId, setDeleteTypeId] = useState(null);
    const [typeAlert, setTypeAlert] = useState(false);
    const [page, setPage] = useState(1); //voucher pagination
    const [voucherData, setVoucherData] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [productData, setProductData] = useState([]); //get product
    // form create voucher
    const [status, setStatus] = useState('');
    const [msg, setMsg] = useState('');
    const [enable, setEnable] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [voucherAlert, setVoucherAlert] = useState(false);
    if (status === 'success') {
        setTimeout(() => {
            setStatus(null);
            setMsg('');
        }, 2000);
    }
    // form create voucher
    const cancelRef = React.useRef();

    //input handler create voucher
    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            nominal: 0,
            presentase: 0,
            expiredDate: "",
            ProductId: 0,
            VoucherTypeId: 0
        },
        validate: (values) => {
            const errors = {};
            if (!values.presentase && !values.nominal) {
                errors.presentase = "Either nominal or presentase must be filled";
                errors.nominal = "Either nominal or presentase must be filled";
            }
            if (values.nominal < 0) {
                errors.nominal = "Nominal cannot be negative";
            }
            if (values.presentase < 0 || values.presentase > 100) {
                errors.presentase = "Presentase must be between 0 and 100";
            }
            return errors;
        },
        onSubmit: async () => {
            const res = await axiosInstance
                .post("/voucher_discount/addvoucher", formik.values)
                .then((res) => {
                    setStatus("success");
                    setMsg("New Voucher Created");
                    setEnable(false);
                })
                .catch((error) => {
                    console.log("error nya adalah = " + error.response.data);
                    setStatus("error");
                    setMsg(error.response.data);
                })
                .finally(() => {
                    fetchVoucher();
                    formik.resetForm();
                });
        }
    });
    useEffect(() => {
        let { name, code, expiredDate, VoucherTypeId } = formik.values;
        if (name && code && expiredDate && VoucherTypeId) {
            setEnable(true);
        } else {
            setEnable(false);
        }
    }, [formik.values]);
    //input handler create voucher

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
        const inputValue = typeInput.trim();
        if (inputValue === '') {
            alert('The type name cannot be empty!');
            return;
        }
        const data = {
            name: inputValue,
        }
        await axiosInstance.post("/voucher_discount/addvouchertype", data).then(() => {
            fetchVoucherType();
            setTypeInput('')
        }).finally(() => {
            onCloseType()
        })
    };
    function onEnterCreateType(e) {
        if (e.key === 'Enter') {
            createType();
        }
    }
    // PAGINATION - START -
    const nextPage = () => {
        if (page !== pageNum) {
            setPage(page + 1);
        }
    }
    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }
    const handlePageClick = (pageNum) => {
        setPage(pageNum);
    }
    // PAGINATION - END -
    // FETCH VOUCHER TYPE - START -
    async function fetchVoucherType() {
        await axiosInstance.get("/voucher_discount/voucherType").then((res) => {
            setVoucherType([...res.data.result])
        })
    };
    useEffect(() => {
        fetchVoucherType()
    }, [])
    // FETCH VOUCHER TYPE - END -
    // FETCH VOUCHER ALL - START -
    async function fetchVoucher() {
        await axiosInstance.get(`/voucher_discount/getvoucher?page=${page}`).then((res) => {
            setVoucherData(res.data.result)
            setPageNum(res.data.totalPages)
        })
    };
    useEffect(() => {
        fetchVoucher()
    }, [page])
    // FETCH VOUCHER - END -

    function deleteTypeAlert(id) {
        setDeleteTypeId(id);
        setTypeAlert(true)
    }
    function handleTypeCancelDelete() {
        setTypeAlert(false)
    }
    async function deleteType() {
        try {
            await axiosInstance.delete(`/voucher_discount/deletevouchertype/${deleteTypeId}`);
            fetchVoucherType();
            setTypeAlert(false)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(`Voucher type with ID ${deleteTypeId} not found.`);
            } else {
                console.log(`Error deleting voucher type: ${error.message}`);
            }
        }
    }

    function deleteAlert(id) {
        setDeleteId(id);
        setVoucherAlert(true)
    }
    function handleCancelDelete() {
        setVoucherAlert(false)
    }
    async function deleteVoucher() {
        try {
            await axiosInstance.delete(`/voucher_discount/deletevoucher/${deleteId}`);
            fetchVoucher();
            setVoucherAlert(false)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(`Voucher type with ID ${deleteId} not found.`);
            } else {
                console.log(`Error deleting voucher type: ${error.message}`);
            }
        }
    }

    async function fetchProduct() {
        await axiosInstance.get("/user/productall").then((res) => {
            setProductData([...res.data.result])
        })
    }
    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <Flex w='100%' bg='gray.100' sx={webkit} overflow='auto'>
            <SidebarAdmin />
            <Flex h='100vh' w='80%' m='0 auto' direction='column' justify='space-around'
                sx={webkit} overflow='auto'
            >

                <Flex w='100%' minH='150px' h='30%' direction='column' px={5} py={2}>
                    <Flex mb={5} align='center'>
                        <Button size={['xs', 'sm']} bg='#2C3639' color='white' sx={confirmButtonStyle} onClick={onOpenType}>
                            Create new
                        </Button>
                        <Heading ml={5} size={['sm', 'md']}>Voucher type</Heading>
                    </Flex>
                    <Flex w={['100%', '100%', '70%', '40%']} h='90%' overflow='auto' sx={webkit} direction='column' bg='white' borderRadius={10} py={2}>
                        {
                            voucherType?.map((val, idx) => {
                                return <>
                                    <Flex key={idx} borderBottom='1px solid #2c3639' w='90%' m='5px auto' justify='space-between' align='center'>
                                        <Flex w={['100%', '100%', '70%', '40%']} align='center'>
                                            <Text fontWeight='bold'>
                                                {idx + 1}.
                                            </Text>
                                            <Text ml={2} fontWeight='bold' fontSize={['sm', 'md', 'lg']}>
                                                {val.name}
                                            </Text>
                                        </Flex>
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
                                </>
                            })
                        }
                        <AlertDialog isOpen={isOpenType} leastDestructiveRef={cancelRef} onClose={onCloseType} >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold' textAlign='center'>
                                        Add new type
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        <FormControl id="vouchertype" >
                                            <Input name="vouchertype" type="text" placeholder={'Create a new type'} onChange={handleTypeInput} onKeyDown={onEnterCreateType} required />
                                        </FormControl>
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onCloseType}>
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

                <Flex w='100%' h='60%' direction='column' px={5}>
                    <Flex mb={5}>
                        <Button size={['xs', 'sm']} bg='#2C3639' color='white' sx={confirmButtonStyle} onClick={onOpenVoucher}>
                            Create Voucher
                        </Button>
                        <Heading ml={5} size={['sm', 'md']}>Voucher List</Heading>
                    </Flex>

                    <Flex w='100%' h='90%' sx={webkit} overflow='auto' borderRadius={10} direction='column' justify='space-between'>
                        <Flex w='100%' h='90%' sx={webkit} overflow='auto' direction='column' >
                            {
                                voucherData.length === 0 ? (
                                    <Center w='100%' h='100%'>
                                        <Text textAlign='center' fontSize={['md', 'lg']} fontWeight='bold'>
                                            Your cart is empty
                                        </Text>
                                    </Center>
                                ) : (
                                    <>
                                        {
                                            voucherData?.map((val, idx) => {
                                                const currentDate = new Date();
                                                const valDate = new Date(val.expiredDate);
                                                const date = new Date(val.expiredDate).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
                                                const bg = valDate < currentDate ? 'red.100' : 'white';
                                                const color = valDate < currentDate ? 'red.500' : 'green.500';

                                                return <>
                                                    <Flex
                                                        key={idx} w='100%' bg={bg} borderRadius={5} color='#2C3639'
                                                        m='3px auto' justify='space-between' align='center' p={3}
                                                    >
                                                        <Flex w='20%' direction='column'>
                                                            <Text fontWeight='bold' fontSize={['sm', 'md', 'lg']}>{val.name}</Text>
                                                            <Text fontWeight='bold' fontSize={['sm', 'md', 'lg']}>Code : {val.code}</Text>
                                                        </Flex>
                                                        <Flex w='30%' direction='column'>
                                                            <Text fontWeight='bold' color={color} fontSize={['sm', 'md', 'lg']}>- {val.nominal ? ("Rp " + val.nominal.toLocaleString()) : (val.presentase + " %")}</Text>
                                                            <Text fontSize={['sm', 'md', 'lg']}>Exp : {date}</Text>
                                                        </Flex>
                                                        <Flex w='20%' direction='column'>
                                                            <Text textAlign='right' fontSize={['sm', 'md', 'lg']}>{val.Product ? "Purchase of : " + val.Product.name : null}</Text>
                                                            <Text textAlign='right' fontSize={['sm', 'md', 'lg']}>{val.Voucher_type.name}</Text>
                                                        </Flex>
                                                        <Tooltip label='Delete' placement='top-start'>
                                                            <IconButton //delete button
                                                                icon={<FiX />}
                                                                borderRadius='full'
                                                                bg='none' onClick={() => deleteAlert(val.id)}
                                                                _hover={{
                                                                    color: 'maroon',
                                                                    backgroundColor: 'none'
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </Flex>
                                                </>
                                            })
                                        }
                                    </>
                                )
                            }

                            <AlertDialog isOpen={isOpenVoucher} leastDestructiveRef={cancelRef} onClose={onCloseVoucher}>
                                <AlertDialogOverlay>
                                    <AlertDialogContent w='100%'>
                                        <AlertDialogHeader fontSize='lg' fontWeight='bold' textAlign='center'>
                                            Add new voucher
                                        </AlertDialogHeader>

                                        <AlertDialogBody>
                                            <FormControl id="name" mb={2}>
                                                {status === 'success' ? (
                                                    <Alert status="success" zIndex={2} variant="top-accent" onClose={() => {
                                                        setStatus(null);
                                                        setMsg('');
                                                    }}>
                                                        <AlertIcon />
                                                        {msg}
                                                    </Alert>
                                                ) : status === 'error' ? (
                                                    <Alert status="error" zIndex={2} variant="top-accent" onClose={() => {
                                                        setStatus(null);
                                                        setMsg('');
                                                    }}>
                                                        <AlertIcon />
                                                        {msg}
                                                    </Alert>
                                                ) : null}
                                                <FormLabel>Voucher name</FormLabel>
                                                <Input name="name" type="text" placeholder='Create a new voucher' onChange={(e) => formik.setFieldValue('name', e.target.value)} />
                                            </FormControl>
                                            <FormControl id="code" mb={2}>
                                                <FormLabel>CODE</FormLabel>
                                                <Input name="code" type="text" placeholder='Create a new voucher' onChange={(e) => formik.setFieldValue('code', e.target.value)} />
                                            </FormControl>
                                            <FormControl id="nominal" mb={2}>
                                                <FormLabel>Nominal</FormLabel>
                                                <Input name="nominal" type="text" placeholder='Create a new voucher' onChange={(e) => formik.setFieldValue('nominal', e.target.value)} />
                                            </FormControl>
                                            <FormControl id="percent" mb={2}>
                                                <FormLabel>Percentage</FormLabel>
                                                <Input name="percent" type="text" placeholder='Create a new voucher' onChange={(e) => formik.setFieldValue('presentase', e.target.value)} />
                                            </FormControl>
                                            <FormControl id="expDate" mb={2}>
                                                <FormLabel>Set Expiry</FormLabel>
                                                <Input name="expDate" type="date" placeholder='Create a new voucher' onChange={(e) => formik.setFieldValue('expiredDate', e.target.value)} />
                                            </FormControl>
                                            <FormControl id="productId" mb={2}>
                                                <FormLabel>Exclusive Product -Optional</FormLabel>
                                                <Select placeholder="All Product" name="productId" onChange={(e) => formik.setFieldValue('ProductId', e.target.value)}>
                                                    {
                                                        productData?.map((val) => {
                                                            return <option key={val.id} name={val.name} id={val.id} value={val.id}>{val.name}</option>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                            <FormControl id="TypeId" mb={2}>
                                                <FormLabel>Voucher Type</FormLabel>
                                                <Select placeholder="Select voucher type" name="voucherType" onChange={(e) => formik.setFieldValue('VoucherTypeId', e.target.value)}>
                                                    {
                                                        voucherType?.map((val) => {
                                                            return <option key={val.id} value={val.id} id={val.id}>{val.name}</option>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button ref={cancelRef} onClick={onCloseVoucher}>
                                                Cancel
                                            </Button>
                                            <Button bg={enable ? '#2C3639' : 'gray.100'} color='white' ml={3} sx={confirmButtonStyle} disabled={enable ? null : 'disabled'} onClick={formik.handleSubmit}>
                                                Create
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>

                            <AlertDialog
                                motionPreset='slideInBottom'
                                isOpen={voucherAlert}
                                leastDestructiveRef={cancelRef}
                                onClose={handleCancelDelete}
                            >
                                <AlertDialogOverlay>
                                    <AlertDialogContent>
                                        <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign='center'>
                                            Delete voucher
                                        </AlertDialogHeader>

                                        <AlertDialogBody textAlign='center'>
                                            Are you sure you want to delete this voucher?
                                        </AlertDialogBody>

                                        <AlertDialogFooter>
                                            <Button ref={cancelRef} onClick={handleCancelDelete}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme="red" onClick={deleteVoucher} ml={3}>
                                                Delete
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>


                        </Flex>

                        <Flex w='100%' h='10%' >
                            <Flex w='100%' h='100%' m='0 auto' justify='space-between' align='center'>
                                <IconButton
                                    size='sm' as={BiChevronLeft} bg='none' cursor={page > 1 ? 'pointer' : 'default'}
                                    onClick={prevPage} color={page > 1 ? '#2C3639' : 'gray.200'}
                                    sx={{
                                        _hover: {
                                            bg: 'none'
                                        }
                                    }}
                                />

                                {pageNum > 1 && (
                                    <Flex align='center'>
                                        {Array.from(Array(pageNum).keys()).map((_, index) => (
                                            <Button
                                                borderRadius={50}
                                                color={page === index + 1 ? 'white' : '#2C3639'}
                                                key={index}
                                                size='xs'
                                                bg={page === index + 1 ? '#2C3639' : 'none'}
                                                cursor='pointer'
                                                onClick={() => handlePageClick(index + 1)}
                                                _hover={{
                                                    border: "1px solid #2C3639"
                                                }}
                                            >
                                                {index + 1}
                                            </Button>
                                        ))}
                                    </Flex>
                                )}

                                <IconButton size='sm' as={BiChevronRight} bg='none' cursor={page < pageNum ? 'pointer' : 'default'}
                                    onClick={nextPage} color={page < pageNum ? '#2C3639' : 'gray.200'}
                                    sx={{
                                        _hover: {
                                            bg: 'none'
                                        }
                                    }}
                                />
                            </Flex>

                        </Flex>
                    </Flex>
                </Flex>

            </Flex>
        </Flex>
    )
}