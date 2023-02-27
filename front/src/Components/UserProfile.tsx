import { Box, Text, Avatar } from "@chakra-ui/react";
import { AppState } from "../Context/AppProvider";
import { Room, RoomUser } from "../../types";
import ProfileButton from "./Buttons/ProfileButton";
import ChallengeButton from "./Buttons/ChallengeButton";
import MoreButton from "./Buttons/MoreButton";

const UserProfile = ({ showUP }: { showUP: any }) => {
  const { selectedRoom } = AppState();

  const getRole = (room: Room, userId: number): string | undefined => {
    if (room !== undefined && room.isGroupChat)
      return room.RoomUsers.find((ele: RoomUser) => ele.userId === userId)
        ?.role;
    return undefined;
  };

  return (
    <Box
      pl='10px'
      display="flex"
      flexDir="column"
      alignItems="center"
      height="100%"
      width="100%"
      minWidth="20rem"
      min-width="25rem"
      minHeight="400px"
    mt="40px"
      // className="debug"
    >
        <Avatar
          fontSize="9xl"
          bg="chakra-placeholder-color"
          color="white"
          size="2xl"
          cursor="pointer"
          name={showUP.login}
          src={showUP?.imageUrl || "/defaultProfilePic.png"}
        />
      <Text fontSize="30px" color="#B8B9BF">
        {showUP.login}
      </Text>
      <Text fontSize="15px" color="white">{getRole(selectedRoom, showUP?.id)}</Text>
      <Box
        display="flex"
        // className="debug"
        flexDir='column'
        height={'140px'}
        justifyContent="center"
        width="90%"
        mt="50px"
      >
        <ChallengeButton target={showUP} icon={false} color={"gray"} />
        <ProfileButton target={showUP} icon={false} />
        {selectedRoom.isGroupChat && <MoreButton target={showUP} icon={ false } />}
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
