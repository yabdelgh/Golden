import { Box, Image, Text } from "@chakra-ui/react";
import { AppState } from "../Context/AppProvider";
import { Room, RoomUser } from "../../types";
import ProfileButton from "./Buttons/ProfileButton";
import ChallengeButton from "./Buttons/ChallengeButton";
import MoreButton from "./Buttons/MoreButton";
import { useEffect } from "react";

const UserProfile = ({ showUP }: { showUP: any }) => {
  const { selectedRoom } = AppState();

  const getRole = (room: Room, userId: number): string | undefined => {
    if (room !== undefined && room.isGroupChat)
      return room.RoomUsers.find((ele: RoomUser) => ele.userId === userId)
        ?.role;
    return undefined;
  };
  useEffect(() => {
    console.log("showUP", showUP);
  }, [showUP]);

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      minWidth='20rem'
      min-width="25rem"
      minHeight="400px"
      mt="10px"
    >
      <Image
        borderRadius="100%"
        width="180px"
        height="190px"
        minHeight="190px"
        bg="black"
        m="10px"
        mt="50px"
        src={showUP?.imageUrl || "/defaultProfilePic.png"}
      />
      <Text fontSize="30px" color="gray.600">
        {showUP.login}
      </Text>
      <Text fontSize="15px">{getRole(selectedRoom, showUP?.id)}</Text>
      <Box
        display="flex"
        justifyContent="center"
        m="30px"
        width="350px"
        mt="50px"
      >
        <ChallengeButton target={showUP} icon={true} />
        <ProfileButton target={showUP} icon={true} />
        {selectedRoom.isGroupChat && <MoreButton target={showUP} />}
      </Box>
    </Box>
  );
};

export default UserProfile;

// <Box
//   display={
//     (isAdmin(user, selectedRoom) && isUser(showUP, selectedRoom)) || isOwner(user, selectedRoom)
//       ? "flex"
//       : "none"
//   }
// >
//   <Popover>
//     <PopoverTrigger>
//       <Button
//         color="teal"
//         variant="unstyled"
//         height="70px"
//         width="110px"
//         display="flex"
//         flexDir="column"
//         justifyContent="space-around"
//         borderRadius="10px"
//         mt="15px"
//         // border='1px solid red'
//       >
//         <FaCog size="38px" />
//         <Text>more</Text>
//       </Button>
//     </PopoverTrigger>
//     <PopoverContent
//       width="150px"
//       fontFamily="work sans"
//       borderRadius="lg"
//     >
//       <PopoverArrow />
//       <Button
//         width="100%"
//         bg="white"
//         borderRadius="0px"
//         borderTopRadius="lg"
//         pt="2px"
//         onClick={() => socket.emit("ban", {
//           userId: showUP.id,
//           roomId: selectedRoom.id,
//           value: !isBanned(showUP, selectedRoom)
//         })}
//       >
//         {isBanned(showUP, selectedRoom) ? "Unban" : "Ban"}
//       </Button>
//       <Button
//         width="100%"
//         bg="white"
//         borderRadius="0px"
//         onClick={() => socket.emit("mute", {
//           userId: showUP.id,
//           roomId: selectedRoom.id,
//           value: !isMuted(showUP, selectedRoom)
//         })}
//       >
//         {isMuted(showUP, selectedRoom) ? "UnMute" : "Mute"}
//       </Button>
//       <Button
//         width="100%"
//         bg="white"
//         borderRadius="0px"
//         borderBottomRadius="lg"
//         display={isOwner(user, selectedRoom) ? "flex" : "none"}
//         onClick={() => socket.emit("role", {
//           userId: showUP.id,
//           roomId: selectedRoom.id,
//           role: isAdmin(showUP, selectedRoom) ? 'User' : 'Admin'
//         })}
//       >
//         {isAdmin(showUP, selectedRoom)
//           ? "Remove admin"
//           : "Make admin"}
//       </Button>
//     </PopoverContent>
//   </Popover>
// </Box>
