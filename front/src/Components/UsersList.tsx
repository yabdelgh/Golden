import {
  Box,
  Button,
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
  const {
    searchKey,
    setSearchKey,
    users,
    selectedRoom,
    usersList,
    setUsersList,
  } = ChatState();

  return (
    <>
      <Box display="flex" alignItems={"center"} justifyContent="space-between">
        <FormControl height="30px" width="80%" margin="20px">
          <InputGroup>
            <Input
              placeholder="Search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
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
        {selectedRoom
          ? users.filter((obj: any) => {
              return (
                obj.isOnline &&
                selectedRoom.RoomUsers.some((ele: any) => {
                  return ele.userId === obj.id;
                })
              );
            }).length
          : 0}
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
        {selectedRoom
          ? users.filter((obj: any) => {
              return (
                !obj.isOnline &&
                selectedRoom.RoomUsers.some((ele: any) => {
                  return ele.userId === obj.id;
                })
              );
            }).length
          : 0}
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
    </>
  );
};

export default UsersList;
