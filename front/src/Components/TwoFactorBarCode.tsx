import { Box, Button, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";

const TwoFactorBarCode = ({ barCode, setVerify, setBarCode }: any) => {
  return (
    <Box
      ml="50px"
      p="30px"
      bg="white"
      width="650px"
      height="450px"
      borderRadius="lg"
      display={barCode ? "flex" : "none"}
      flexDir="column"
    >
      <Text fontWeight="bold">Set up authenticator app</Text>
      <UnorderedList m="10px">
        <ListItem>In the Google Authenticator app, tab the +</ListItem>
        <ListItem>Choose Scan a QR code</ListItem>
      </UnorderedList>
      <Box mt="20px" ml="50px">
        {barCode && <img src="/api/auth/2fa/generate" />}
      </Box>
      <Box display="flex" justifyContent="flex-end" mt="20px">
        <Button colorScheme="gray" m="5px" onClick={() => setBarCode(false)}>
          Cancel
        </Button>
        <Button colorScheme="teal" m="5px" onClick={() => ( setVerify(true), setBarCode(false) )}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TwoFactorBarCode;
