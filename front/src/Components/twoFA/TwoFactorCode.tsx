import {
  Box,
  Button,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { AppState } from "../../Context/AppProvider";

const TwoFactorCode = ({ verify, setVerify }: any) => {
  const { user, setUser } = AppState();
  const [token, setToken] = useState('')
  const setTwoFactorAuthentication = () => {
    axios
      .post("/api/auth/2fa/update", {
        token,
        value: !user.isTwoFactorAuthenticationEnabled,
      })
      .then(() => {
        setUser((data: any) => {
          data.isTwoFactorAuthenticationEnabled =
            !data.isTwoFactorAuthenticationEnabled;
          return data;
        });
        setVerify(false)
      }
      )
  };
  return (
    <Box
      ml="50px"
      p="30px"
      bg="white"
      width="650px"
      height="450px"
      borderRadius="lg"
      display={verify ? "flex" : "none"}
      flexDir="column"
    >
      <Text fontWeight="bold" fontSize="20px">
        Set up authenticator app
      </Text>
      <Text fontSize="15px" m="10px">
        Enter the six digit that you see in the app
      </Text>
      <HStack m="110px">
        <PinInput size="lg"
            onChange={(e) => setToken(e)}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Box display="flex" justifyContent="flex-end" mt="20px">
        <Button colorScheme="gray" m="5px" onClick={() => setVerify(false)}>
          Cancel
        </Button>
        <Button
          colorScheme="teal"
          m="5px"
          onClick={() => setTwoFactorAuthentication()}
        >
          verify
        </Button>
      </Box>
    </Box>
  );
};

export default TwoFactorCode;
