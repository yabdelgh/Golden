import { Box, Image, Text } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";
import ProfileContent from "./ProfileContent";
const Profile = () => {
  const { socket, users, Friends, userProfile } = AppState();

  const addFriend = (id: number) => {
    socket.emit("addFriend", id);
  };
  const removeFriend = (id: number) => {
    socket.emit("removeFriend", id);
  };
  const confirmFriend = (id: number) => {
    socket.emit("acceptFriend", id);
  };

  return (
    <Box display="flex" width="100%" m="70px 5px 0 72px" height="fit-content">
      <ProfileContent />
    </Box>
  );
};

export default Profile;

{
  /* {/* <Box
          height="600px"
          width="600px"
        borderRadius="lg"
        //border='3px solid red'
        m='10px'
        p='10px'
        bg='white'
      >
        <Text
          m='10px'
          fontSize='30px'
        >Friends</Text>

      <Box
          display="flex"
          justifyContent="flex-end"
          border="3px solid white"
      >
        {Friends &&
          users.map(
            (value1: any) =>
              Friends.some(
                (value2: any) =>
                  (value2.user2Id === value1.id ||
                    value2.user1Id === value1.id) &&
                  value2.status === true
              ) && (
                <Box
                  m="10px"
                  width="200px"
                  height="350px"
                  borderRadius="lg"
                  display="flex"
                  flexDir="column"
                  bg="white"
                  alignItems="center"
                  justifyContent="space-between"
                  key={value1.id}
                  boxShadow="1px 5px 5px gray"
                >
                  <Image
                    borderTopRadius="lg"
                    height="60%"
                    width="100%"
                    src={value1.imageUrl || "/defaultProfilePic.png"}
                  />
                  <Text fontWeight="bolder">{value1.login}</Text>
                  <Box
                    mb="7px"
                    display="flex"
                    flexDir="column"
                    justifyContent="space-between"
                    width="90%"
                    height="22%"
                  >
                    <Button
                      bg="gray.400"
                      height="35px"
                      onClick={() => removeFriend(value1.id)}
                    >
                      unfriend
                    </Button>
                    <Button bg="teal" height="35px">
                      message
                    </Button>
                  </Box>
                </Box>
              )
          )}
        {Friends &&
          users.map(
            (value1: any) =>
              Friends.some(
                (value2: any) =>
                  value2.user1Id === value1.id && value2.status === false
              ) && (
                <Box
                  m="10px"
                  width="200px"
                  height="350px"
                  borderRadius="lg"
                  display="flex"
                  flexDir="column"
                  bg="white"
                  alignItems="center"
                  justifyContent="space-between"
                  key={value1.id}
                  boxShadow="1px 5px 5px gray"
                >
                  <Image
                    borderTopRadius="lg"
                    height="60%"
                    width="100%"
                    src={value1.imageUrl || "/defaultProfilePic.png"}
                  />
                  <Text fontWeight="bolder">{value1.login}</Text>
                  <Box
                    mb="7px"
                    display="flex"
                    flexDir="column"
                    justifyContent="space-between"
                    width="90%"
                    height="22%"
                  >
                    <Button
                      bg="gray.400"
                      height="35px"
                      onClick={() => removeFriend(value1.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      bg="teal"
                      height="35px"
                      onClick={() => confirmFriend(value1.id)}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              )
          )}
        {Friends &&
          users.map(
            (value1: any) =>
              !Friends.some(
                (value2: any) =>
                  value2.user1Id === value1.id || value2.user2Id === value1.id
              ) && (
                <Box
                  m="10px"
                  width="200px"
                  height="350px"
                  borderRadius="lg"
                  display="flex"
                  flexDir="column"
                  bg="white"
                  alignItems="center"
                  justifyContent="space-between"
                  key={value1.id}
                  boxShadow="1px 5px 5px gray"
                >
                  <Image
                    borderTopRadius="lg"
                    height="60%"
                    width="100%"
                    src={value1.imageUrl || "/defaultProfilePic.png"}
                  />
                  <Text fontWeight="bolder">{value1.login}</Text>
                  <Box
                    mb="7px"
                    display="flex"
                    flexDir="column"
                    justifyContent="space-between"
                    width="90%"
                    height="22%"
                  >
                    <Button bg="gray.400" height="35px">
                      Remove
                    </Button>
                    <Button
                      bg="teal"
                      height="35px"
                      onClick={() => addFriend(value1.id)}
                    >
                      Add Friend
                    </Button>
                  </Box>
                </Box>
              )
          )}
      </Box>
      </Box> */
}

// {/* <Box
//   display="flex"
//   flexDir="column"
//   alignItems="center"
//   m="20px"
//   mb="25px"
// >
//   <IoIosPeople size="40px" />
//   <Text fontWeight="bold" mt="7px">
//     {Friends.length}
//     {/* 521 */}
//   </Text>
//   <Text color="gray.700">Friends</Text>
// </Box> */}
