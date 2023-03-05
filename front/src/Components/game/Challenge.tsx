import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { User } from "../../../types";
import { AppState } from "../../Context/AppProvider";

const Challenge = ({ challenge, onClose }: any) => {
  const { user, users, socket } = AppState();
  if (!user || users.length === 0) return <></>;
  if (challenge.challengedId === user.id) {
    const opponent = users.find(
      (ele: User) => ele.id === challenge.challengerId
    );
    return (
      <Box
        height="130px"
        width="100%"
          bg="#2E3035"
        borderRadius={"3px"}
        pt="2px"
        mt="10px"
      >
        <Box display="flex" alignItems="center" m="15px">
          <Avatar
            bg="teal"
            borderRadius="full"
            size="md"
            name={opponent ? opponent.login : ""}
            src={opponent.imageUrl}
          />
          <Text ml="10px">{opponent.login}</Text>
        </Box>
        <Box display="flex" justifyContent="flex-end" m="10px">
          <Button
            variant={"ghost"}
            colorScheme="red"
            onClick={() =>
              socket.emit("declineChallenge", challenge.challengerId)
            }
          >
            decline
          </Button>
          <Button
            variant={"ghost"}
            colorScheme="teal"
            disabled={!opponent.isOnline}
            onClick={() => {
              socket.emit("acceptChallenge", challenge.challengerId);
              onClose();
            }}
          >
            accept
          </Button>
        </Box>
      </Box>
    );
  } else {
    const opponent = users.find(
      (ele: User) => ele.id === challenge.challengedId
    );
    return (
      <Box
        height="130px"
        width="100%"
          bg="#2E3035"
        borderRadius={"3px"}
        pt="2px"
        mt="10px"
      >
        <Box display="flex" alignItems="center" mt="15px" ml="20px">
          <Avatar
            color="white"
            bg="teal"
            borderRadius="full"
            size="md"
            name={opponent ? opponent.login : ""}
            src={opponent?.imageUrl || "/defaultProfilePic.png"}
          />
          <Text ml="10px">{opponent.login}</Text>
        </Box>
        <Box display="flex" justifyContent="flex-end" m="10px">
          <Button
            variant={"ghost"}
            colorScheme="red"
            onClick={() =>
              socket.emit("cancelChallenge", challenge.challengedId)
            }
          >
            cancel
          </Button>
        </Box>
      </Box>
    );
  }
};

export default Challenge;
