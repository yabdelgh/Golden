import { Box } from "@chakra-ui/react";
import ProfileBar from "../Components/Profile/ProfileBar";
import ProfileContent from "../Components/Profile/ProfileContent";

const ProfilePage = () => {
  
  return (
    <Box width="fit-content" mt="70px">
      <ProfileBar />
      <ProfileContent />
    </Box>
  );
};

export default ProfilePage;

// {
//   userProfile && userProfile.id !== user.id && (
//         <Box
//           m="10px"
//           display="flex"
//           flexDir="column"
//           justifyContent="flex-end"
//           border="3px solid white"
//           alignItems="center"
//           height="625px"
//           width="600px"
//           borderRadius="lg"
//           background="linear-gradient(to Bottom, teal 40%, white 20%)"
//         >
//           <Image
//             borderRadius="100%"
//             width="180px"
//             height="190px"
//             minHeight="190px"
//             bg="gray"
//             m="10px"
//             mt="50px"
//             src={userProfile.imageUrl || "/defaultProfilePic.png"}
//           />
//           <Text fontSize="30px" color="gray.600">
//             {userProfile.login}
//           </Text>
//           <Box
//             display="flex"
//             flexDir="column"
//             alignItems="center"
//             m="20px"
//             mb="25px"
//           >
//             <IoIosPeople size="40px" />
//             <Text fontWeight="bold" mt="7px">
//               {Friends.length}
//               {/* 521 */}
//             </Text>
//             <Text color="gray.700">Friends</Text>
//           </Box>
//           <Box display="flex" height="90px">
//             <ChallengeButton target={userProfile} icon={true} />
//             <MessageButton target={userProfile} icon={true} />
//             <ParamButton target={userProfile} />
//           </Box>
//         </Box>
//       )}
//       {userProfile.id === user.id && <Profile />}
