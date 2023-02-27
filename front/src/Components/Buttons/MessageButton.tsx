import {
  Box,
  Button,
  Input,
  InputGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { AiFillMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Room } from "../../../types";
import { AppState } from "../../Context/AppProvider";
import { FcIdea } from "react-icons/fc";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const MessageButton = ({ target, icon }: any) => {
  const { rooms, setSelectedRoom, socket } = AppState();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("hello");
  const navigate = useNavigate();
  const { user } = AppState();
  const message = () => {
    const room: Room = rooms.find((object: Room) => {
      return object.name === target.login && !object.isGroupChat;
    });
    if (room) {
      setSelectedRoom(room);
      navigate("/chat");
    }
  };
  const send = () => {
    setIsLoading(true);
    socket.emit("directMsg", { roomId: target.id, msg });
  };

  const button = icon ? (
    <Button
      variant="unstyled"
      display={user.id === target.id ? "none" : "flex"}
      flexDir="column"
      width="110px"
      height="70px"
      onClick={() => message()}
    >
      <AiFillMessage size="40px" />
      message
    </Button>
  ) : (
    <Button
      height="45px"
      mb="2px"
      width="100%"
      display="flex"
      borderRadius="3px"
      p="0px 30px"
      justifyContent={"space-between"}
      alignItems="center"
      variant="unstyled"
      bg="#36373D"
      rightIcon={<IoIosArrowForward />}
      color="gray.200"
      onClick={() => message()}
    >
      message
    </Button>
  );
  return (
    <Popover gutter={-92} isLazy>
      {({ onClose }) => (
        <>
          <PopoverTrigger>{button}</PopoverTrigger>
          <PopoverContent
            fontFamily="work sans"
            width="350px"
            border="2px solid #36373D"
            borderRadius="3px"
            height="186px"
            bg="#36373D"
          >
            <Box
              display="flex"
              alignItems={"center"}
              justifyContent="flex-start"
              pl="15px"
              pt="5px"
            >
              <FcIdea size="10px" />
              <Text fontSize="15px" ml="2px" color="#B8B9BF">
                Please be nice in the chat!
              </Text>
            </Box>
            <InputGroup
              height="70%"
              display="flex"
              alignItems="center"
              justifyContent={"space-around"}
            >
              <Input
                bg="#2C2D31"
                fontFamily={"Inter"}
                fontWeight="bold"
                placeholder="Type a message"
                p="15px"
                color="gray.200"
                fontSize="15px"
                borderColor="#2C2D31"
                focusBorderColor="#2C2D31"
                borderRadius="3px"
                height="45px"
                width="95%"
                onBlur={(e) => {
                  setMsg(e.target.value);
                }}
              />
              {/* <InputLeftElement height="100%" ml="7px">
                <IconButton
                  variant={"unstyled"}
                  aria-label="emoji"
                  icon={<TfiFaceSmile size="30px" color="gray" />}
                />
              </InputLeftElement>
              <InputRightElement height="100%">
                <IconButton
                  variant={"unstyled"}
                  aria-label="mic"
                  icon={<BsFillMicFill size="25px" color="gray" />}
                />
              </InputRightElement> */}
            </InputGroup>
            <Box height="60px" display="flex" justifyContent={"flex-end"}>
              <Button
                height="65%"
                display={isLoading ? "none" : "flex"}
                colorScheme="gray"
                bg="#B8B9BF"
                onClick={onClose}
                mr="15px"
                borderRadius="3px"
                fontSize="15px"
              >
                cancel
              </Button>
              <Button
                mr="10px"
                height="65%"
                isLoading={isLoading}
                borderRadius="3px"
                loadingText="send"
                spinnerPlacement="end"
                variant={"solid"}
                colorScheme="teal"
                onClick={send}
                fontSize="15px"
              >
                send
              </Button>
            </Box>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};
export default MessageButton;
