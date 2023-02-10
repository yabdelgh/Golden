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
import { AppState } from "../../Context/AppProvider";
import { RoomUser, User } from "../../../types";
import { useEffect, useState } from "react";
import UserButton from "../Buttons/UserButton";
const UsersList = () => {
  const { searchKey, setSearchKey, users, selectedRoom } = AppState();
  const [onlineCounter, setOnlineCounter] = useState(0);
  const [offlineCounter, setOfflineCounter] = useState(0);

  const getUsers = (status: boolean): User[] => {
        if (!selectedRoom)
          return [];
        return selectedRoom.RoomUsers
          .map((roomUser: RoomUser) => users.find((ele: any) => ele.id === roomUser.userId && ele.isOnline === status ))
          .filter((user: User) => user && user.login.includes(searchKey))}


  useEffect(() => {
    selectedRoom &&
      setOnlineCounter(() => {
        const ret = users.filter(
          (user: User) =>
            user.isOnline &&
            selectedRoom.RoomUsers.some((ele: any) => ele.userId === user.id)
        );
        setOfflineCounter(selectedRoom.RoomUsers.length - ret.length - 1);
        return ret.length;
      });
  }, [users, selectedRoom]);

  return (
    < Box
    minWidth='20rem'
    width="20rem"
    >
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent="space-between"
        width={"100%"}
        
        
      >
        <FormControl height="30px" width="100%" margin="5px" mb="20px">
          <InputGroup>
            <Input
              placeholder="Search"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant={"unstyled"}
                aria-label="Search User"
                icon={<BsSearch />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <Text m="10px" color="green.400">
        online __ {onlineCounter}
      </Text>
      <Box display="flex" flexDir="column">
        {getUsers(true).map((user) => <UserButton user={user} key={user.id}/>)}
      </Box>
      <Text m="10px" color="gray.400">
        offline __ {offlineCounter}
      </Text>
      <Box display="flex" flexDir="column">
        {getUsers(false).map((user) => <UserButton user={user} key={user.id}/>)}
      </Box>
    </Box>
  );
};

export default UsersList;
