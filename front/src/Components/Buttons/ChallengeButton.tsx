import { Button } from "@chakra-ui/react";
import { GiPingPongBat } from "react-icons/gi";
import { AppState } from "../../Context/AppProvider";

const ChallengeButton = ({ target, icon }: any) => {
  const { user } = AppState();

  const challenge = () => {};

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
      bg="teal"
      height="35px"
      display={user.id === target.id ? "none" : "flex"}
      onClick={() => challenge()}
    >
      challenge
    </Button>
  );
  return button;
};

export default ChallengeButton;
