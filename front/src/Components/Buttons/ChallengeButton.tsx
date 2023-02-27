import { Button } from "@chakra-ui/react";
import { GiPingPongBat } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { AppState } from "../../Context/AppProvider";

const ChallengeButton = ({ target, icon }: any) => {
  const { user, socket } = AppState();

  const challenge = () => {
    socket.emit("challenge", {
      challengedId: target.id,
      map: 'default',
    });
  };

  const button = icon ? (
    <Button
      color="teal"
      variant="unstyled"
      display={user.id === target.id ? "none" : "flex"}
      flexDir="column"
      width="110px"
      height="70px"
      justifyContent="space-around"
      onClick={() => challenge()}
    >
      <GiPingPongBat size="40px" />
      challenge
    </Button>
  ) : (
    <Button
        mb="2px"
                height="45px"
                width="100%"
                display="flex"
                p="0px 30px"
                borderRadius="3px"
                justifyContent={"space-between"}
                alignItems="center"
                variant="unstyled"
                bg="#36373D"
                rightIcon={<IoIosArrowForward/>}
                color="gray.200"
      onClick={() => challenge()}
    >
      challenge
    </Button>
  );
  return button;
};

export default ChallengeButton;
