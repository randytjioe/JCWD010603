import {
  Button,
  Icon,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Accordion,
  FormHelperText,
  Avatar,
  AvatarBadge,
  IconButton,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  Select,
  Input,
  Link,
  Stack,
  InputGroup,
  FormErrorMessage,
  Image,
  Alert,
  Text,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCamera } from "react-icons/ai";
import { userLogin } from "../redux/middleware/userauth";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../config/config";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
// import { useDropzone } from "react-dropzone";
import jimp from "jimp";
import { useRef } from "react";
import user_types from "../redux/auth/types";
export default function UpdateProfile(props) {
  const [imgUser, setImgUser] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGQ1xn3jeQG9KYz1e3z3JvW1ReMb76qrdGb5e7sJft5yLrh-TpByxo1u41GDl--anOzLI&usqp=CAU"
  );
  const data = props.data;
  const [firstName, setFirstName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setbirthDate] = useState(new Date());
  const [gender, setGender] = useState(0);
  const location = useLocation();
  const toast = useToast();
  const [User_id, setUser_id] = useState(0);
  const userSelector = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    setUser_id(userSelector?.id);
    fetchuserdetail(userSelector?.id);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [saveImage, setSaveImage] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [userdetail, setUserDetail] = useState([]);

  useEffect(() => {
    fetchuserdetail(User_id);
  }, []);
  const fetchuserdetail = async (User_id) => {
    await axiosInstance
      .get("/user/" + User_id)
      .then((response) => {
        setUserDetail(response.data.result);
        console.log(response.data.result);
        setFirstName(response.data.result.User_detail.firstname);
        setLastName(response.data.result.User_detail.lastname);
        setEmail(response.data.result.email);
        setbirthDate(response.data.result.User_detail.birthDate);
        setImgUser(response.data.result.User_detail.imgUser);
        setGender(response.data.result.User_detail.gender);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    formik.setFieldValue("avatar_url", url);
  };

  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/png",
    "image/jpeg",
    "image/gif",
  ];
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      avatar: selectedFile,
      avatar_url: data?.imgUser || imgUser,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Mohon isi email @"),
      firstName: Yup.string().min(3, "min 3 huruf"),
      avatar: Yup.mixed()
        .nullable()
        .required("Required Field")
        .test(
          "size",
          "File size is too big",
          (value) => value && value.size <= 1000 * 1000 // 1MB
        )
        .test(
          "type",
          "Invalid file format selection",
          (value) =>
            // console.log(value);
            !value || (value && SUPPORTED_FORMATS.includes(value?.type))
        ),
    }),
    onSubmit: async (value) => {
      const { avatar } = value;
      const formData = new FormData();
      formData.append("image", avatar);
      await axiosInstance
        .patch(`user/updatefoto/${props?.user.id}`, formData)
        .then(async (res) => {
          console.log(res.data.result);
          // await dispatch({
          //   type: user_types.USER_LOGIN,
          //   payload: res.data.result,
          // });
          toast({
            title: "Account created",
            description: " Your Profile has been Updated",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    },
  });
  useEffect(() => {
    let { avatar } = formik.values;
    if (!avatar) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [formik.values]);

  function inputHandler(event) {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  const saveUser = async (e) => {
    e.preventDefault();
    const Data = {
      User_id,
      firstName,
      lastName,
      birthDate,
      email,
      gender,
    };

    try {
      await axiosInstance.patch("/user/editprofile/" + User_id, Data);
      navigate("/userpage");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Center flex={1} align={"center"} justifyContent={"center"}>
        <Flex
          spacing={4}
          maxW={"md"}
          bgColor="#DCD7C9"
          w="430px"
          h="932px"
          color="white"
          flexDir="column"
          gap={8}
        >
          <Flex
            w="430px"
            h="120px"
            bgColor="#2C3639"
            flexDir={"column"}
            gap={5}
          >
            <Link to="/userpage" as={ReachLink}>
              <Flex textAlign={"left"} color="white">
                <Icon
                  boxSize={"7"}
                  as={IoIosArrowBack}
                  color="white"
                  sx={{
                    _hover: {
                      cursor: "pointer",
                    },
                  }}
                ></Icon>
                Back
              </Flex>
            </Link>

            <Center flexDir={"column"} gap={3}>
              <Flex flexDir={"column"}>
                <Center fontSize={"30px"}> Upload Payment</Center>
              </Flex>
            </Center>
          </Flex>
          <FormControl id="productName">
            <FormLabel> </FormLabel>

            <Stack
              direction={["column"]}
              spacing={6}
              py={3}
              gap={3}
              justifyContent={"center"}
            >
              <Flex flexDir={"column"}>
                <Flex flexDir={"column"}>
                  <Image
                    src={formik.values.avatar_url || imgUser}
                    id="avatar"
                  ></Image>
                  <FormHelperText color={"white"}>
                    {formik.errors.avatar}
                  </FormHelperText>
                </Flex>
                <Center
                  w="full"
                  justifyContent={"center"}
                  flexDir="column"
                  gap={3}
                >
                  <Flex flexDir={"column"}>
                    <Text
                      color="#0095F6"
                      fontWeight="bold"
                      cursor={"pointer"}
                      onClick={() => inputFileRef.current.click()}
                    >
                      Upload Payment
                    </Text>

                    <Input
                      id=""
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleFile(e);
                        formik.setFieldValue("avatar", e.target.files[0]);
                      }}
                      w="full"
                      placeholder="Image URL"
                      display="none"
                      ref={inputFileRef}
                      name={imgUser}
                    ></Input>
                  </Flex>
                </Center>
              </Flex>

              <Button
                colorScheme={"black"}
                variant={"solid"}
                w="350px"
                color="white"
                _hover={{
                  bg: "white",
                  color: "#2C3639",
                }}
                type="submit"
                onClick={formik.handleSubmit}
                isDisabled={enable ? true : null}
              >
                Send
              </Button>
            </Stack>
          </FormControl>
        </Flex>
      </Center>
    </>
  );
}
