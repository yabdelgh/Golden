import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { ChatState } from "../Context/ChatProvider";
import User from "./User";
import { VscChromeClose } from "react-icons/vsc";

const UsersList = () => {
  const { users, selectedRoom, usersList, setUsersList } = ChatState();

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
      borderRadius="5px"
      flexDirection="column"
      fontFamily={"Inter"}
      fontWeight="bold"
      color="gray.500"
    >
      <Box display="flex" alignItems={"center"} justifyContent="space-between">
        <FormControl height="30px" width="60%" margin="20px">
          <InputGroup>
            <Input placeholder="Search" />
            <InputRightElement>
              <IconButton
                variant={"unstyled"}
                aria-label="Search database"
                icon={<BsSearch />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <IconButton
          mt="10px"
          mr="15px"
          aria-label="hello"
          variant="unstyled"
          icon={<VscChromeClose size="25px" />}
          onClick={() => setUsersList(!usersList)}
        />
      </Box>
      <Text m="10px" color="green.400">
        online __{" "}
        {selectedRoom ? 
          users.filter((obj: any) => {
            return (obj.isOnline && selectedRoom.RoomUsers.some((ele: any) => { 
              return ele.userId === obj.id
            }));
          }).length : 0
        }
      </Text>
      <Box display="flex" flexDir="column">
        {selectedRoom ? (
          selectedRoom.RoomUsers.map((roomUser: any) => (
            <User id={roomUser.userId} isOnline={true} key={roomUser.userId} />
          ))
        ) : (
          <></>
        )}
      </Box>
      <Text m="10px" color="gray.400">
        offline __{" "}
        {selectedRoom ? 
          users.filter((obj: any) => {
            return (!obj.isOnline && selectedRoom.RoomUsers.some((ele: any) => { 
              return ele.userId === obj.id
            }));
          }).length : 0
        }
      </Text>
      <Box display="flex" flexDir="column">
        {selectedRoom ? (
          selectedRoom.RoomUsers.map((roomUser: any) => (
            <User id={roomUser.userId} isOnline={false} key={roomUser.userId} />
          ))
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default UsersList;
