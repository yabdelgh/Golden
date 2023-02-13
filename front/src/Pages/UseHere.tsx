import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UseHere = () => {
  const navigate = useNavigate();
  return (
    <Box
      width="100%"
     // border={"3px solid red"}
      display="flex"
      flexDir="column"
      alignItems={"center"}
      justifyContent="center"
    >
      <Text fontSize={"40px"} width="630px">
        Pong is open in an other window.
      </Text>
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"flex-end"}
        m='10px'
        width="600px"
        height={"100px"}
      >
        <Button variant='solid' colorScheme='gray' width={"130px"}
        onClick={() => navigate('/')}
        >CLOSE</Button>
        <a href="http://localhost:3000/">
          <Button variant="solid" colorScheme="teal" width={"130px"} m='10px'
          >
            USE HERE
          </Button>
        </a>
      </Box>
    </Box>
  );
};

export default UseHere;
