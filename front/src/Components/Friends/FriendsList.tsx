import { Box, Button, Image, Text } from "@chakra-ui/react";
import { SlPeople } from "react-icons/sl";
import { Navigate, useNavigate } from "react-router-dom";
import { AppState } from "../../Context/AppProvider";

const FriendsList = () => {
  const { users, Friends, setUserProfile } = AppState(); 
  const navigate = useNavigate();
  // const addFriend = (id: number) => {
  //   socket.emit("addFriend", id);
  // };
  // const removeFriend = (id: number) => {
  //   socket.emit("removeFriend", id);
  // };
  // const confirmFriend = (id: number) => {
  //   socket.emit("acceptFriend", id);
  // };
  return (
    <Box
          width={{base: '100%', xl:'49%'}}
          h={{base: '600px', xl: '48%'}}
          display="flex"
          flexDir="column"
          alignItems="center"
          borderRadius='lg'
          justifyContent={'center'}
          bg='white'
          mb={"20px"}
    >
        <Text
          width='95%'
          m="10px"
          ml="20px"
          fontSize="25px"
          fontWeight="bold"
          color="gray.500"
        >
          Friends List
        </Text>

      {Friends.length ?
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
                width="160px"
                height="fit-content"
                borderRadius="5px"
                display="flex"
                flexDir="column"
                bg="white"
                alignItems="center"
                justifyContent="space-between"
                key={value1.id}
                boxShadow="1px 5px 5px gray"
                cursor='pointer'
                onClick={() => { setUserProfile(value1);  navigate('/profile')}}
              >
                <Image
                  borderTopRadius="lg"
                 // height="60%"
                  width="100%"
                  src={value1.imageUrl || "/defaultProfilePic.png"}
                />
                <Text fontWeight="bolder" >
                  {value1.login}
                </Text>
              </Box>
            )
        ): 
        <Box
          height='90%'
          width='100%'
          color="gray.400"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          fontSize={'50px'}
        >
          <SlPeople size='100px' />
          <Text fontSize="25px" mt='50px'>You have no Friends for now.</Text>
        </Box>
        }
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