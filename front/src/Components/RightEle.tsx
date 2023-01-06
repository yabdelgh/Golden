import {Box, Show} from "@chakra-ui/react";
import { useEffect } from "react";
import { AppState } from "../Context/AppProvider";

const RightEle = ({ children }: any) => {
  const { selectedRoom, usersList , showUP} = AppState();
  
  return (
    <Box
      display={{
        base: (selectedRoom && (usersList || showUP)) ? "flex" : "none",
        md: (selectedRoom && (usersList || showUP)) ? "flex" : "none",
        xl: (selectedRoom && (usersList || showUP)) ? "flex" : "none",
      }}
      ml="5px"
      bg="white"
      minWidth="400px"
      width={{ base: "100%", xl: "30%" }}
      flexDirection="column"
      fontFamily={"Inter"}
      fontWeight="bold"
      color="gray.500"
      transition="ease-in"
      borderRadius="lg"
    >
      {children}
    </Box>
  );
};

export default RightEle;
