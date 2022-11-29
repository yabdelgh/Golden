import {Box} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const RightEle = ({ children }: any) => {
  const { selectedRoom, usersList } = ChatState();
  
  return (
    <Box
      display={{
        base: selectedRoom && usersList ? "flex" : "none",
        md: usersList ? "flex" : "none",
        xl: usersList ? "flex" : "none",
      }}
      ml="5px"
      bg="white"
      minWidth="400px"
      width={{ base: "100%", xl: "30%" }}
      flexDirection="column"
      fontFamily={"Inter"}
      fontWeight="bold"
      color="gray.500"
      transition='ease-in'
      borderRadius='lg'
    >
      { children }
    </Box>
  );
};

export default RightEle;
