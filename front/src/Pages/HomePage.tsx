import React from "react";
import { Box, Button, Container, Text, Link } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

const HomePage = () => {
  const submitHandler = () => {
    fetch("http://localhost:3333/api/auth/login");
  };
  return (
    <Container maxW="xl">
      <Box
        m="50% 10% 0% 10%"
        bg="white"
        border="3px solid white"
        borderRadius="md"
      >
        <Text textAlign="center" fontSize="4xl" fontFamily="work sans">
          Ping-pong
        </Text>
      </Box>
      <Box
        m="3% 10% 0% 10%"
        bg="white"
        border="3px solid white"
        borderRadius="md"
        color="green"
      >
        <Text textAlign="center" fontSize="4xl" fontFamily="work sans">
          free, fun and Ready to play!
        </Text>
      </Box>
      <Box m="3% 10% 10% 10%" bg="white" borderRadius="md">
        <a href="http://localhost:3333/api/auth/login">
          <Button
            width="100%"
            rightIcon={<FiArrowRight />}
            colorScheme="green"
            border="3px solid green"
            variant="solid"
            size="lg"
          >
            sign in with 42 accout
          </Button>
        </a>
      </Box>
    </Container>
  );
};

export default HomePage;
