import { Avatar, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";

const User = ({ id, isOnline }: any) => {
  const [user, setUser] = useState({ login: "notFound" });
  const { users } = ChatState();

  useEffect(() => {
    const tmp: any = users.find((ele: any) => {
      return (ele.id === id && ele.isOnline === isOnline)
    });
    setUser(tmp);
  }, [users]);

  return user ? (
    <Box display="flex" alignItems="center">
      <Avatar
        color="white"
        bg="#4267B2"
        border="3px solid white"
        ml="10px"
        borderRadius="10px"
        name={user ? user.login : ""}
      />
      <Text fontWeight={"bold"} ml="10px">
        {user.login}
      </Text>
    </Box>
  ) : (
    <></>
  );
};

export default User;
