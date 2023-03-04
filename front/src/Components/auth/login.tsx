import {
  VStack,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
  Box,
  Heading,
  FormLabel,
  FormHelperText,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";

const Login = () => {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <Box
      width="450px"
      height="fit-content"
      p="25px"
      bg="#2B2D31"
      borderRadius="lg"
    >
      <FormControl id="email">
        <Input
          type="email"
          value={input}
          placeholder="Login"
          focusBorderColor="#2B2D30"
          borderRadius="lg"
          borderColor="#2E3035"
          bg="#2E3035"
          fontSize="20px"
          color="gray.200"
          mb="10px"
          height="60px"
          onChange={(e) => setInput(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            fontSize="20px"
            height="60px"
            focusBorderColor="#2B2D30"
            borderColor="#2E3035"
            color="gray.200"
            bg="#2E3035"
            borderRadius="lg"
            placeholder="Password"
            autoComplete="none"
            mb="15px"
          />

          <InputRightElement width="4.5rem">
            <Button
              mt="20px"
              mr="20px"
              h="1.8rem"
              size="sm"
              onClick={handleClick}
              borderRadius="3px"
              bg="gray"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        height="50px"
        fontSize="20px"
        width="100%"
        colorScheme="teal"
        variant="outline"
        mb="30px"
      >
        log in
      </Button>
      <FormControl
        as="fieldset"
        borderTop="1px solid gray"
        color="gray"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FormLabel whiteSpace="pre" as="legend" m="auto">
          {"  "}Or login with{"  "}
        </FormLabel>
        <Box width="fit-content" m="10px" mt="20px">
          <a href={`${process.env.REACT_APP_BACK_HOST}/api/auth/login`}>
            <Image src="/log.png" alt="42" boxSize="38px" borderRadius="3px" />
          </a>
        </Box>
        <IconButton
          borderRadius="3px"
          width="40px"
          height="40px"
          colorScheme="facebook"
          aria-label="facebook"
          icon={<FaFacebook />}
          m="10px"
          mt="20px"
        />
        <IconButton
          width="40px"
          height="40px"
          borderRadius="3px"
          colorScheme="twitter"
          aria-label="google"
          icon={<FaTwitter />}
          m="10px"
          mt="20px"
        />
      </FormControl>
    </Box>
  );
};

export default Login;
