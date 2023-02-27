import { Button } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
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
        height="45px"
        mb="2px"
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
      onClick={() => profile()}
    >
      profile 
    </Button>
  );
  return button;
};

export default ProfileButton;
