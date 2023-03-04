import {
  Input,
  VStack,
  Button,
  FormLabel,
  InputGroup,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const SignUp = () => {
  const navigate = useNavigate();
  const [pic, setPic] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const [confPassword, setConfPassword] = useState("");

  const handleClick = () => {
    setShow(!show);
  };

  const uploadImage = async (pic: any) => {
    setPicLoading(true);
    if (pic.type !== "image/jpeg" && pic.type !== "image/png") {
      setPicLoading(false);
      return;
    }
    const config = {
      headers: { "Content-type": "application/form-data" },
    };
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "bla-bla");
    data.append("cloud_name", "deh8jlnkz");
    const url = "https://api.cloudinary.com/v1_1/deh8jlnkz/image/upload";
    await axios
      .post(url, data, config)
      .then((data) => {
        setPic(data.data.secure_url);
        setPicLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setPicLoading(false);
      });
  };

  const signupReq = async () => {
    const url = "/api/auth/signup";
    const config = {
      headers: { "Content-type": "application/json" },
    };
    const data = { name, email, password, pic };
    await axios
      .post(url, data, config)
      .then((data) => {
        localStorage.setItem("userInfo", JSON.stringify(data));
        setPicLoading(false);
        navigate("api/chat");
      })
      .catch((error) => {
        console.log(`error: -->${error}<--`);
      });
  };

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confPassword || !pic) {
      setPicLoading(false);
      return;
    }
    if (password !== confPassword) {
      setPicLoading(false);
      return;
    }
    await signupReq();
    setPicLoading(false);
  };

  return (
    <VStack>
      <FormControl id="name">
        <Input
          onBlur={(e) => setName(e.target.value)}
          placeholder="First name"
          autoComplete="off"
        />
      </FormControl>

      <FormControl id="email-signup">
        <Input
          type="email"
          placeholder="Email address"
          autoComplete="off"
          onBlur={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="Password">
        <Input
          onBlur={(e) => setPassword(e.target.value)}
          type={show ? "text" : "password"}
          placeholder="Password"
        />
      </FormControl>

      <FormControl id="ConfirmPassword" isRequired>
        <InputGroup size="md">
          <Input
            onBlur={(e) => setConfPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Confirm password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" w="3.5rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <InputGroup size="md">
          <Input placeholder="Image Url" defaultValue="" />
          <InputRightElement width="4.5rem">
            <Button p="0 0 0 0" m="1.5" h="1.75rem" w="3.5rem" display="">
              <FormLabel
                p="9%"
                fontWeight="semibold"
                w="3.5rem"
                fontSize="sm"
                h="100%"
                htmlFor="upload1"
              >
                upload
              </FormLabel>
            </Button>
            <Input
              id="upload1"
              accept="image/*"
              display="none"
              type="file"
              onChange={(e: any) => uploadImage(e.target.files[0])}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        width="100%"
        rightIcon={<FiArrowRight />}
        colorScheme="green"
        variant="solid"
        onClick={submitHandler}
        isLoading={picLoading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
