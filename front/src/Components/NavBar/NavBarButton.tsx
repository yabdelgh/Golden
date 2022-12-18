
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Context/AppProvider";

const NavBarButton = ({ children , pageName}: any) => {
  const navigate = useNavigate();
  const { setUserProfile , user} = AppState();

  return (
    <Button
      variant="unstyled"
      height="100px"
      display="flex"
      color="gray"
      _hover={{ color: "white" }}
      onClick={() => ( setUserProfile(user), navigate(pageName) )}
    >
      {children}
    </Button>
  );
};

export default NavBarButton;