import {
    Button,
    Checkbox,
    Center,
    Flex,
    FormControl,
    FormLabel,
    FormHelperText,
    Heading,
    Input,
    Select,
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
  import * as Yup from "yup";
  import YupPassword from 'yup-password';
  import { useFormik } from "formik";
  import axios from "axios"
  
  import Logo from "../assets/logo.png";


  export default function Register() {  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [province, setProvince] = useState([])
    const [provinces, setProvinces] = useState({
      province_id : 0,
      province : ""
    })


    const fetchProvince = async () => {
      await axios.get("http://localhost:8000/api_rajaongkir/province").then((res)=>{
        setProvince([...province, res.data])
      }).catch((err) => {console.log(err)})
    }

    console.log(province)

    const formik = useFormik({
      initialValues : {   
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      province:"",
      city:"",
      postalCode:"",
      address:"",
      phoneNumber:"",
      password: "",
      passwordConfirm:""
      } ,
      validationSchema : Yup.object().shape({
          email: Yup.string().required("Email must be filled").email("This is not email"),
          username: Yup.string().required("Username must be filled").min(8, "Username should have min 8 characters"),
          phoneNumber: Yup.string(),
          city: Yup.string().required("City must be filled"),
          province: Yup.string().required("Province must be filled"),
          district: Yup.string().required("District must be filled"),
          address: Yup.string().required("Address must be filled"),
          gender: Yup.string().required("Gender must be filled"),
          birthDate: Yup.string().required("Birth Date must be filled"),
          firstName: Yup.string().required("First Name must be filled").min(3, "First Name should have min 8 characters"), 
          password : Yup.string().required("Password must be filled").min(8, "Password length should have min 8 characters").max(16, "Password length should have max 16 characters").matches(/^[ A-Za-z0-9_@-]*$/, `only "_", "@","-" characters are allowed`),
          passwordConfirm : Yup.string().required("Password confirm must be filled").oneOf([Yup.ref('password'), null], 'Passwords must match')
      }),
      onSubmit:  async ()=> {
          // alert("test")
          const res =  await axiosInstance.post("/user/register", formik.values)

          console.log(res.data);
          const [name, value] = res.data

          // cond
          if(res.status=== 201)
          navigate("/login",{ replace: true })
          
      }
  })

  
    const [enable, setEnable] = useState(false); 

    
    useEffect(()=>{
      let { email,password,username, address, city, province, district, postalCode, birthDate, firstName, passwordConfirm } = formik.values 
      if(email && password && username && address && city && province && district && postalCode && birthDate && firstName && passwordConfirm) { 
        setEnable(true)
      }
      else{
        setEnable(false)
      }
      
    },[formik.values])
    
    useEffect(() => {
      fetchProvince();

  },[])
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
                <Input type="text" name="email" onChange={(e)=> formik.setFieldValue("email", e.target.value )} />
                 <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.email}
            </FormHelperText>
              </FormControl>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input type="text" name="username" onChange={(e)=> formik.setFieldValue("username", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.username}
            </FormHelperText>
              </FormControl>
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="firstName" onChange={(e)=> formik.setFieldValue("firstName", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.firstName}
            </FormHelperText>
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="lastName" onChange={(e)=> formik.setFieldValue("lastName", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.lastName}
            </FormHelperText>
              </FormControl>
              <Grid w={'inherit'} templateColumns= 'repeat(2, 1fr)' gap = '3'>
              <FormControl id="gender" w={'100%'}>
                <FormLabel>Gender</FormLabel>
                <Select name="gender" placeholder="--- ---" onChange={(e)=> formik.setFieldValue("gender", e.target.value )}>
                <option value="0">Woman</option>
                <option value="1">Man</option>
                </Select>
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.gender}
            </FormHelperText>
              </FormControl>
              <FormControl id="birthDate" w={"100%"}>
                <FormLabel>Birth Date</FormLabel>
                <Input type="date" name="birthDate" onChange={(e)=> formik.setFieldValue("birthDate", e.target.value )} fontSize= '15px'/>
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.birthDate}
            </FormHelperText>
              </FormControl>
              </Grid>
              
              <FormControl id="province">
                <FormLabel>Province</FormLabel>
                <Select name="province" placeholder="--- ---" onChange={(e)=> formik.setFieldValue("province", e.target.value )}>
              {
                province?.map((val,idx) => {
                    return (
                      <>
                <option key={idx}>{val}</option>
                </>
                    )
                })
              }
                  </Select>  
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.province}
            </FormHelperText>
              </FormControl>


              <Grid w={'inherit'} templateColumns= 'repeat(2, 1fr)' gap = '3'>
              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Input type="text" name="city" onChange={(e)=> formik.setFieldValue("city", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.city}
            </FormHelperText>
              </FormControl>
              <FormControl id="postalCode">
                <FormLabel>Postal Code</FormLabel>
                <Input type="text" name="postalCode" onChange={(e)=> formik.setFieldValue("postalCode", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.postalCode}
            </FormHelperText>
              </FormControl>
              </Grid>
              <FormControl id="district">
                <FormLabel>District</FormLabel>
                <Input type="text" name="district" onChange={(e)=> formik.setFieldValue("district", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.district}
            </FormHelperText>
            </FormControl>
              <FormControl id="address">
                <FormLabel>Address</FormLabel>
                <Textarea type="text" name="address" maxH={"150px"} onChange={(e)=> formik.setFieldValue("address", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.address}
            </FormHelperText>
              </FormControl>
              <FormControl id="phoneNumber">
                <FormLabel>Phone Number</FormLabel>
                <Input type="text" name="phoneNumber" onChange={(e)=> formik.setFieldValue("phoneNumber", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.phoneNumber}
            </FormHelperText>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={(e)=> formik.setFieldValue("password", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.password}
            </FormHelperText>
              </FormControl>
              <FormControl id="passwordConfirm">
                <FormLabel>Password Confirmation</FormLabel>
                <Input type="password" name="passwordConfirm" onChange={(e)=> formik.setFieldValue("passwordConfirm", e.target.value )} />
                <FormHelperText  w={"inherit"} marginTop={"5px"} color={"red.500"} fontSize={"9px"} >
            {formik.errors.passwordConfirm}
            </FormHelperText>
              </FormControl>
  
              <Button
                onClick={formik.handleSubmit}
                disabled={enable? null : "disabled"}
                marginTop={"25px"}
                colorScheme={"white"}
                variant={"solid"}
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
  