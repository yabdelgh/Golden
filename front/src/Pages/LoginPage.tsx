import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { AppState } from "../Context/AppProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { user } = AppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.login) {
      navigate("/profile");
    }
  });


  return (
    <Box
      width="100%"
      height='100%'
      bg="teal"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      position='fixed'
    >
      <Box
        width="50%"
        height="400px"
        minWidth="800px"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Text
          fontWeight="bold"
          width="100%"
          height="40%"
          textAlign="center"
          fontSize="100"
          color="whiteAlpha.800"
        >
          Golden
        </Text>
        <Text
          width="100%"
          height="30%"
          textAlign="center"
          fontSize="50px"
          color="whiteAlpha.500"
        >
          FREE, FAN AND READY TO PLAY!
        </Text>
        <Box width='100%' display='flex' justifyContent='center'>
          <a href="http://10.12.13.4:3333/api/auth/login">
            <Button
              bg="#FF5323"
              width="310px"
              height="50px"
              variant="unstyled"
              size="lg"
              borderRadius="lg"
              color="white"
              fontWeight="bold"
              fontSize="20px"
              _hover={{ bg: "orange.600" }}
            >
              sign in with 42 account
            </Button>
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;