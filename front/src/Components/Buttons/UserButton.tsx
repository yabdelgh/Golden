import { Avatar, Button, Text } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";

const UserButton = ({ user }: any) => {
  const { setShowUP } = AppState();

  return (
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
        borderRadius="lg"
        border="5px solid white"
        size="md"
        name={user ? user.login : ""}
      />
      <Text fontWeight={"bold"} ml="5px" color="gray.500">
        {user.login}
      </Text>
    </Button>
  );
};

export default UserButton;
