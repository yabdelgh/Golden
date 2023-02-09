import {
  Box,
  FormControl,
  Text,
  HStack,
  PinInput,
  PinInputField,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FcIdea } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const TwoFAPage = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const authenticate = () => {
    axios
      .post("/api/auth/2fa/authenticate", { code })
      .then((res) => {
        navigate("/profile");
      })
  };

  return (
    <Box
      height="600px"
      width="600px"
      borderRadius="lg"
      bg="white"
      mt="10%"
    display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Text
        m="20px"
        color="teal"
        fontSize="50px"
        fontFamily="Work sans"
        fontWeight="bold"
      >
        Golden
      </Text>
      <Text fontSize="40px">Two-factor authentication</Text>
      <FormControl
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        flexDir="column"
        m="20px"
        height="200px"
      >
        <HStack>
          <PinInput
            size="lg"
            type="alphanumeric"
            focusBorderColor="teal"
            onChange={(e) => setCode(e)}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button
          size="lg"
          width="400px"
          colorScheme="teal"
          onClick={() => authenticate()}
        >
          Verify
        </Button>
      </FormControl>
      <Box p="80px" pt="10px" display="flex">
        <Box>
          <FcIdea size="30px" />
        </Box>
        <Text fontSize="22px" fontWeight="bold" color="gray">
          Open the two-cactor authentication app on your device to view your
          authentication code and verify your identity.
        </Text>
      </Box>
    </Box>
  );
};

export default TwoFAPage;
