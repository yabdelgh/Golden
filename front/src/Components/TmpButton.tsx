import { Avatar, Button, Text,} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppState } from "../Context/AppProvider";
const TmpButton = ({ele, onClose}: any) => {
  const { setUserProfile } = AppState();
  const navigate = useNavigate();

    return (
      <Button
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        onClick={() => {
          setUserProfile(ele);
          navigate("/profile");
          onClose();
        }}
        variant="unstyled"
        height="53px"
        m="3px"
      >
        <Avatar
          color="white"
          bg="teal"
          borderRadius="100%"
          border="2px solid white"
          size="md"
          name={ele.login}
          src={ele.imageUrl}
        />
            <Text fontWeight={"bold"} ml="10px">
                {ele.login}
        </Text>
      </Button>
    );
};

export default TmpButton;
