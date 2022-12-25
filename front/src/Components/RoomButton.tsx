import { Avatar, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AppState } from "../Context/AppProvider";

const RoomButton = ({ ele, onClose }: any) => {

  const { setRoomProfile } = AppState();
  const navigate = useNavigate();

  return (
    <Button
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      onClick={() => {
        setRoomProfile(ele);
        onClose();
        navigate('/world');
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
        name={ele.name}
        // src={ele.imageUrl}
      />
      <Text fontWeight={"bold"} ml="10px">
        {ele.name}
      </Text>
    </Button>
  );
};

export default RoomButton;
