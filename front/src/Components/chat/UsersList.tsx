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
  const { searchKey, setSearchKey, users, selectedRoom, rooms } = AppState();
  const [onlineCounter, setOnlineCounter] = useState(0);
  const [offlineCounter, setOfflineCounter] = useState(0);

  const getUsers = (status: boolean): User[] => {
    if (!selectedRoom || !selectedRoom.isGroupChat || !selectedRoom.RoomUsers) return [];
    return selectedRoom.RoomUsers.map((roomUser: RoomUser) => {
      if (roomUser.status === "Member")
        return users.find(
          (ele: any) => ele.id === roomUser.userId && ele.isOnline === status
        );
      return undefined;
    }).filter((user: User) => {
      return user && user.login.includes(searchKey);
    });
  };

  useEffect(() => {
    selectedRoom &&
      setOnlineCounter(() => {
        const ret = users.filter(
          (user: User) =>
            user.isOnline &&
            selectedRoom.RoomUsers.some(
              (ele: any) => ele.userId === user.id && ele.status !== "ExMember"
            )
        );
        return ret.length;
      });
    setOfflineCounter(() => {
      const ret = users.filter(
        (user: User) =>
          !user.isOnline &&
          selectedRoom.RoomUsers.some(
            (ele: any) => ele.userId === user.id && ele.status !== "ExMember"
          )
      );
      return ret.length;
    });
  }, [users, selectedRoom, rooms]);

  return (
    <Box minWidth="20rem" width="20rem">
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent="space-between"
        width={"100%"}
      >
      <FormControl height="50px" width="98%" m="1px 1% 10px 1%">
        <InputGroup borderColor="#2E3035" bg="#2E3035" height="50px" borderRadius="5px">
            <Input
              placeholder="Search"
              height="100%"
              color="gray.200"
              focusBorderColor="#2E3035"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant={"unstyled"}
                aria-label="Search User"
                color="gray.400"
                pt='10px'
                icon={<BsSearch/>}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Box>
      <Text m="10px" color="green.400">
        online __ {onlineCounter}
      </Text>
      <Box display="flex" flexDir="column">
        {getUsers(true).map((user) => (
          <UserButton user={user} key={user.id} />
        ))}
      </Box>
      <Text m="10px" color="gray.400">
        offline __ {offlineCounter}
      </Text>
      <Box display="flex" flexDir="column">
        {getUsers(false).map((user) => (
          <UserButton user={user} key={user.id} />
        ))}
      </Box>
    </Box>
  );
};

export default UsersList;
