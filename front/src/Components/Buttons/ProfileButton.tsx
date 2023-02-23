import { Button } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Context/AppProvider";

const ProfileButton = ({ target, icon }: any) => {
  const { setUserProfile } = AppState();
  const navigate = useNavigate();

  const profile = () => {
    setUserProfile(target);
    navigate('/profile');
  };

  const button = icon ? (
    <Button
      color="teal"
      variant="unstyled"
      display="flex"
      flexDir="column"
      width="110px"
      height="70px"
      justifyContent="space-around"
      onClick={() => profile()}
    >
      <FaUser size="34px" />
      profile
    </Button>
  ) : (
    <Button
      bg="gray.100"
      height="40px"
      onClick={() => profile()}
    >
      profile 
    </Button>
  );
  return button;
};

export default ProfileButton;
