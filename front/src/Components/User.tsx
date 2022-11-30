import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";

const User = ({ id, isOnline }: any) => {
  const [user, setUser]: any[] = useState({ login: "not found" });
  const { users, searchKey, showUP, setShowUP } = ChatState();

  useEffect(() => {
    const tmp: any = users.find((ele: any) => {
      return ele.id === id && ele.isOnline === isOnline;
    });
    if (tmp && tmp.login.includes(searchKey)) setUser(tmp);
    else setUser(undefined);
  }, [users, searchKey, id, isOnline]);

  return user ? (
    <Button
      display="flex"
      alignItems='center'
      justifyContent='flex-start'
      pl='10px'
      onClick={() => {
        setShowUP(user);
      }}
      variant='unstyled'
      height='53px'
    >
      <Avatar
        color="white"
        bg="teal"
        border="3px solid white"
        borderRadius="10px"
        name={user ? user.login : ""}
      />
      <Text fontWeight={"bold"} ml="10px">
        {user.login}
      </Text>
    </Button>
  ) : (
    <></>
  );
};

export default User;
