import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";
import ChatConfigModal from "./ChatConfigModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getUserByName } from "../../Utils/rooms";
import { ImUsers, ImUser } from "react-icons/im";
import { useEffect } from "react";
import { RoomUser } from "../../../types";
import { AiOutlineClose } from "react-icons/ai";

const ChatSettings = () => {
  const {
    socket,
    users,
    selectedRoom,
    setSelectedRoom,
    usersList,
    setUsersList,
    setShowUP,
    user,
  } = AppState();

  const leaveRoom = () => {
    socket.emit("leaveRoom", { roomId: selectedRoom.id });
  };

  const closeList = () => {
    setUsersList(!usersList);
    setShowUP(undefined);
  };

  const isOwner = (): boolean => {
    return selectedRoom?.RoomUsers?.some(
      (roomUser: RoomUser) =>
        roomUser.role === "Owner" && roomUser.userId === user.id
    );
  };

  useEffect(() => {
    console.log("selectedRoom", selectedRoom);
  }, [selectedRoom]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="90px"
      mr="15px"
      p="5px"
    >
      {selectedRoom.isGroupChat ? (
        <Popover placement="left-start">
          <PopoverTrigger>
            <Button variant={"unstyled"}>
              <BsThreeDotsVertical size="25px" />
            </Button>
          </PopoverTrigger>
          <PopoverContent width="160px">
            <PopoverArrow />
            <PopoverBody>
              <ChatConfigModal>
                {isOwner() && (
                  <Button variant="unstyled" width="100%">
                    settings
                  </Button>
                )}
              </ChatConfigModal>
              <Button
                onClick={() => {
                  setShowUP(undefined);
                  setSelectedRoom(undefined);
                }}
                variant={"unstyled"}
                width="100%"
              >
                close chat
              </Button>
              <Button
                onClick={() => {
                  setShowUP(undefined);
                  setSelectedRoom(undefined);
                  leaveRoom();
                }}
                variant={"unstyled"}
                width="100%"
              >
                leave group
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <IconButton
          variant={"ghost"}
          aria-label="Member List"
          className="md-disabled"
          ml="auto"
          onClick={() => {
            setShowUP(undefined);
            setSelectedRoom(undefined);
          }}
          icon={<AiOutlineClose size="22px" />}
        />
      )}
      <IconButton
        variant={"ghost"}
        aria-label="Member List"
        className="md-disabled"
        ml="auto"
        onClick={() => {
          selectedRoom.isGroupChat
            ? closeList()
            : setShowUP((value: any) => {
                if (value) return undefined;
                else return getUserByName(users, selectedRoom.name);
              });
        }}
        icon={
          selectedRoom.isGroupChat ? (
            <ImUsers size="22px" />
          ) : (
            <ImUser size="22px" />
          )
        }
      />
    </Box>
  );
};

export default ChatSettings;
