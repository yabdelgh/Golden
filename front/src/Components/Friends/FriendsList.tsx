import { Box, Image, Text, Avatar, Button } from "@chakra-ui/react";
import { FcFlashOn } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Context/AppProvider";

const FriendsList = () => {
  const { users, Friends, setUserProfile, socket } = AppState();
  const navigate = useNavigate();
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
    <Box
      // className="debug"
      height="calc(100% - 70px)"
      // overflow='scroll'
    >
      <Text fontSize="25px" fontWeight="bold" color="#B8B9BF" m="35px">
        Friends List
      </Text>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        ml="20px"
        mr="30px"
        // className="debug"
        height="calc(100% - 120px)"
      >
        {Friends.length ? (
          users.map(
            (value1: any) =>
              Friends.some(
                (value2: any) =>
                  (value2.user2Id === value1.id ||
                    value2.user1Id === value1.id) &&
                  value2.status === true
              ) && (
                <Box
                  display="flex"
                  flexDir="column"
                  bg="#2B2D31"
                  color="gray.200"
                  height="250px"
                  width="230px"
                  ml='20px'
                  p="15px"
                  borderRadius="lg"
                  alignItems="center"
                  key={value1.id}
                  cursor="pointer"
                  shadow="xl"
                  // className="debug"
                  onClick={() => {
                    setUserProfile(value1);
                    navigate("/profile");
                  }}
                >
                  <Avatar
                    fontSize="9xl"
                    width="130px"
                    height="130px"
                    bg="chakra-placeholder-color"
                    color="white"
                    size="full"
                    cursor="pointer"
                    borderRadius="full"
                    m="10px"
                    // borderRadius="5px 5px 0 0 "
                    name={value1.login}
                    src={value1.imageUrl || "/defaultProfilePic.png"}
                  />
                <Box display="flex" alignItems="center">
                    <FcFlashOn size="15px"/>
                    <Text fontWeight="bolder" ml='5px'>{value1.login}</Text>
                  </Box>
                  <Box display="flex" justifyContent="space-around" width='90%' mt='15px'>
                    <Button
                      bg="gray"
                      borderRadius="3px"
                      height="35px"
                      onClick={() => removeFriend(value1.id)}
                    >
                      Unfriend
                    </Button>
                    <Button bg="teal" borderRadius="3px" height="35px">
                      Msg
                    </Button>
                  </Box>
                </Box>
              )
          )
        ) : (
          <Box
            height="90%"
            width="100%"
            color="#B8B9BF"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            fontSize={"50px"}
          >
            {/* <SlPeople size="100px" /> */}
            <Text fontSize="25px" mt="50px">
              You have no Friends.
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FriendsList;

// {Friends &&
//   users.map(
//     (value1: any) =>
//       Friends.some(
//         (value2: any) =>
//           (value2.user2Id === value1.id ||
//             value2.user1Id === value1.id) &&
//           value2.status === true
//       ) && (
//         <Box
//           m="10px"
//           width="200px"
//           height="350px"
//           borderRadius="lg"
//           display="flex"
//           flexDir="column"
//           bg="white"
//           alignItems="center"
//           justifyContent="space-between"
//           key={value1.id}
//           boxShadow="1px 5px 5px gray"
//         >
//           <Image
//             borderTopRadius="lg"
//             height="60%"
//             width="100%"
//             src={value1.imageUrl || "/defaultProfilePic.png"}
//           />
//           <Text fontWeight="bolder">{value1.login}</Text>
//           <Box
//             mb="7px"
//             display="flex"
//             flexDir="column"
//             justifyContent="space-between"
//             width="90%"
//             height="22%"
//           >
//             <Button
//               bg="gray.400"
//               height="35px"
//               onClick={() => removeFriend(value1.id)}
//             >
//               unfriend
//             </Button>
//             <Button bg="teal" height="35px">
//               message
//             </Button>
//           </Box>
//         </Box>
//       )
//   )}
// {Friends &&
//   users.map(
//     (value1: any) =>
//       Friends.some(
//         (value2: any) =>
//           value2.user1Id === value1.id && value2.status === false
//       ) && (
//         <Box
//           m="10px"
//           width="200px"
//           height="350px"
//           borderRadius="lg"
//           display="flex"
//           flexDir="column"
//           bg="white"
//           alignItems="center"
//           justifyContent="space-between"
//           key={value1.id}
//           boxShadow="1px 5px 5px gray"
//         >
//           <Image
//             borderTopRadius="lg"
//             height="60%"
//             width="100%"
//             src={value1.imageUrl || "/defaultProfilePic.png"}
//           />
//           <Text fontWeight="bolder">{value1.login}</Text>
//           <Box
//             mb="7px"
//             display="flex"
//             flexDir="column"
//             justifyContent="space-between"
//             width="90%"
//             height="22%"
//           >
//             <Button
//               bg="gray.400"
//               height="35px"
//               onClick={() => removeFriend(value1.id)}
//             >
//               Delete
//             </Button>
//             <Button
//               bg="teal"
//               height="35px"
//               onClick={() => confirmFriend(value1.id)}
//             >
//               Confirm
//             </Button>
//           </Box>
//         </Box>
//       )
//   )}
// {Friends &&
//   users.map(
//     (value1: any) =>
//       !Friends.some(
//         (value2: any) =>
//           value2.user1Id === value1.id || value2.user2Id === value1.id
//       ) && (
//         <Box
//           m="10px"
//           width="200px"
//           height="350px"
//           borderRadius="lg"
//           display="flex"
//           flexDir="column"
//           bg="white"
//           alignItems="center"
//           justifyContent="space-between"
//           key={value1.id}
//           boxShadow="1px 5px 5px gray"
//         >
//           <Image
//             borderTopRadius="lg"
//             height="60%"
//             width="100%"
//             src={value1.imageUrl || "/defaultProfilePic.png"}
//           />
//           <Text fontWeight="bolder">{value1.login}</Text>
//           <Box
//             mb="7px"
//             display="flex"
//             flexDir="column"
//             justifyContent="space-between"
//             width="90%"
//             height="22%"
//           >
//             <Button bg="gray.400" height="35px">
//               Remove
//             </Button>
//             <Button
//               bg="teal"
//               height="35px"
//               onClick={() => addFriend(value1.id)}
//             >
//               Add Friend
//             </Button>
//           </Box>
//         </Box>
//       )
//   )}
