import { AppState } from "../../Context/AppProvider";
import { RoomUser, User } from "../../../types";
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const MoreButton = ({ target }: any) => {
  const { selectedRoom, socket, user, setShowUP, setSelectedRoom } = AppState();

  const isOwner = (user: User): boolean =>
    selectedRoom.RoomUsers.some(
      (ele: RoomUser) => ele.userId === user.id && ele.role === "Owner"
    );

  const isAdmin = (user: User): boolean =>
    selectedRoom.RoomUsers.some(
      (ele: RoomUser) => ele.userId === user.id && ele.role === "Admin"
    );

  const isUser = (): boolean =>
    selectedRoom.RoomUsers.some(
      (ele: RoomUser) => ele.userId === target.id && ele.role === "User"
    );

  const isBanned = (): boolean =>
    selectedRoom.RoomUsers.some(
      (ele: RoomUser) => ele.userId === target.id && ele.ban === true
    );

  const isMuted = (): boolean =>
    selectedRoom.RoomUsers.some(
      (ele: RoomUser) => ele.userId === target.id && ele.mute === true
    );

  return (
    <Box
      display={(isAdmin(user) && isUser()) || isOwner(user) ? "flex" : "none"}
    >
      <Popover>
        <PopoverTrigger>
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
          >
            <Text>more</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent width="150px" fontFamily="work sans" borderRadius="lg">
          <PopoverArrow />
          <Button
            width="100%"
            bg="white"
            borderRadius="0px"
            borderTopRadius="lg"
            pt="2px"
            onClick={() => {
              socket.emit("ban", {
                userId: target.id,
                roomId: selectedRoom.id,
                value: !isBanned(),
              });
              setShowUP(undefined);
              setSelectedRoom(undefined);
            }}
          >
            {isBanned() ? "Unban" : "Ban"}
          </Button>
          <Button
            width="100%"
            borderRadius="0px"
            bg="white"
            onClick={() => {
              socket.emit("mute", {
                userId: target.id,
                roomId: selectedRoom.id,
                value: !isMuted(),
              });
              setShowUP(undefined);
            }}
          >
            {isMuted() ? "UnMute" : "Mute"}
          </Button>
          <Button
            width="100%"
            borderRadius="0px"
            bg="white"
            onClick={() => {
              socket.emit("kick", {
                userId: target.id,
                roomId: selectedRoom.id,
              });
              setShowUP(undefined);
              setSelectedRoom(undefined);
            }}
          >
            kick
          </Button>
          <Button
            width="100%"
            bg="white"
            borderRadius="0px"
            borderBottomRadius="lg"
            display={isOwner(user) ? "flex" : "none"}
            onClick={() =>
              socket.emit("role", {
                userId: target.id,
                roomId: selectedRoom.id,
                role: isAdmin(target) ? "User" : "Admin",
              })
            }
          >
            {isAdmin(target) ? "Remove admin" : "Make admin"}
          </Button>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default MoreButton;
