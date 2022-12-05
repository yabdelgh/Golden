import { Avatar, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AppState } from "../Context/AppProvider";

const User = ({ id, isOnline }: any) => {
  const [user, setUser]: any[] = useState({ login: "not found" });
  const { users, searchKey, setShowUP } = AppState();

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
      alignItems="center"
      justifyContent="flex-start"
      pl="10px"
      onClick={() => {
        setShowUP(user);
      }}
      variant="unstyled"
      height="53px"
    >
      <Avatar
        color="white"
        bg="teal"
        borderRadius='lg'
        border='2px solid white'
        size='md'
        name={user ? user.login : ""}
       // src={ user.imageUrl}
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
