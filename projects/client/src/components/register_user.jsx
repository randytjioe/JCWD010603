import {
    Button,
    Checkbox,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    Alert,
    AlertIcon,
    Grid,
    Textarea
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { userLogin } from "../redux/middleware/userauth";
  import user_types from "../redux/auth/types";
  import { useDispatch } from "react-redux";
  import { axiosInstance } from "../config/config";
  import { useNavigate } from "react-router-dom";
  
  import Logo from "../assets/logo.png";


  export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [user, setUser] = useState({
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      gender: "",
      birthdate: "",
      province:"",
      city:"",
      postalCode:"",
      address:"",
      phoneNumber:"",
      password: "",
      passwordConfirm:""
    });

    console.log(user);
  
    const [disabled, setDisabled] = useState(true);
  
   async function signUp() {
        const res =  await axiosInstance.post("/user/register", user)
        console.log(res);

        const userData = res.data;
        
        console.log(userData);
        if(userData) 
       { dispatch({
            type: user_types.USER_LOGIN,
            payload: userData
        })
        
        localStorage.setItem("user_data", JSON.stringify(userData))
       return navigate("/",{ state : { user :res.data[0] }, replace: true }) 
        
        }
      // return  setStatus(true)
        

    }
  
    function inputHandler(event) {
      const { name, value } = event.target;
  
      setUser({
        ...user,
        [name]: value,
      });
    }
    useEffect(()=>{
      if(user.firstName && user.lastName && user.gender && user.birthDate && user.phoneNumber && user.address && user.city && user.province && user.postalCode && user.email && user.password && user.username && user.passwordConfirm ) { 
          setDisabled(false)
      }
      else{
          setDisabled(true)
      }

  },[user])
  
    return (
      <>
        <Center flex={1} align={"center"} justifyContent={"center"}>
          <Center
            paddingY={"25px"}
            spacing={4}
            maxW={"md"}
            bgColor="#2C3639"
            w="430px"
            color="white"
            flexDir="column"
            gap={8}
          >
            <Flex fontSize={"2xl"} flexDir="column" color="#DCD7C9">
              Register User
            </Flex>
            <Image
              fontSize={"26px"}
              color="#F68522"
              justifyContent="center"
              src={Logo}
            ></Image>
  
            <Center w="282px" flexDir="column" gap={3} color="#DCD7C9">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="text" name="email" onChange={inputHandler} />
              </FormControl>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input type="text" name="username" onChange={inputHandler} />
              </FormControl>
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="firstName" onChange={inputHandler} />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="lastName" onChange={inputHandler} />
              </FormControl>
              <Grid w={'inherit'} templateColumns= 'repeat(2, 1fr)' gap = '3'>
              <FormControl id="gender" w={'100%'}>
                <FormLabel>Gender</FormLabel>
                <Input type="text" name="gender" onChange={inputHandler} />
              </FormControl>
              <FormControl id="birthd ate" w={"100%"}>
                <FormLabel>Birth Date</FormLabel>
                <Input type="date" name="birthdate" onChange={inputHandler} fontSize= '15px' />
              </FormControl>
              </Grid>
              <FormControl id="province">
                <FormLabel>Province</FormLabel>
                <Input type="text" name="province" onChange={inputHandler} />
              </FormControl>
              <Grid w={'inherit'} templateColumns= 'repeat(2, 1fr)' gap = '3'>
              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Input type="text" name="city" onChange={inputHandler} />
              </FormControl>
              <FormControl id="postalCode">
                <FormLabel>Postal Code</FormLabel>
                <Input type="text" name="postalCode" onChange={inputHandler} />
              </FormControl>
              </Grid>
              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <Textarea type="text" name="address" maxH={"150px"} onChange={inputHandler} />
              </FormControl>
              <FormControl id="phoneNumber">
                <FormLabel>Phone Number</FormLabel>
                <Input type="text" name="phoneNumber" onChange={inputHandler} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={inputHandler} />
              </FormControl>
              <FormControl id="passwordConfirm">
                <FormLabel>Password Confirmation</FormLabel>
                <Input type="password" name="passwordConfirm" onChange={inputHandler} />
              </FormControl>
  
              <Button
                // disabled = {disabled? "disabled" : null}
                marginTop={"25px"}
                colorScheme={"white"}
                variant={"solid"}
                onClick={signUp}
                color="#2C3639"
                w={"inherit"}
                borderRadius="3%"
                bgColor={"#DCD7C9"}
              >
                <Center >
                  Submit
                </Center>
              </Button>
              </Center>
          </Center>
        </Center>
      </>
    );
  }
  