import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";
import { AppState } from "../Context/AppProvider";
import { FaUserFriends } from "react-icons/fa"
import { GiWorld } from "react-icons/gi";
import {
  IoGameControllerOutline,
  IoChatbubblesOutline,
} from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
const FriendsPage = () => {
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
    <Tabs
      orientation="vertical"
      isFitted
      width="fit-content"
      height="618px"
      borderRadius="lg"
    >
      <TabList borderRadius="lg" bg='white'>
        <Tab
          display="flex"
          flexDir="column"
          fontWeight="bold"
          fontSize="18px"
          _selected={{
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
            color: "white",
            bg: "gray",
            borderRadius: "lg",
          }}
        >
          <FaUserFriends size="50px" />
          Profile
        </Tab>
        <Tab
          display="flex"
          flexDir="column"
          fontWeight="bold"
          fontSize="18px"
          _selected={{
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
            color: "white",
            bg: "gray",
            borderRadius: "lg",
          }}
        >
          <FaUserFriends size="50px" />
          Friends
        </Tab>
        <Tab
          display="flex"
          flexDir="column"
          fontWeight="bold"
          fontSize="18px"
          _selected={{
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
            color: "white",
            bg: "gray",
            borderRadius: "lg",
          }}
        >
          <GiWorld size="50px" />
          Groups
        </Tab>
        <Tab
          display="flex"
          flexDir="column"
          fontWeight="bold"
          fontSize="18px"
          _selected={{
            boxShadow:
              "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
            color: "white",
            bg: "gray",
            borderRadius: "lg",
          }}
        >
          <IoGameControllerOutline size="50px" />
          Games
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          p='0'
          height="625px"
          width="630px"
          pl='15px'
        >
      {userProfile && (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          border="3px solid white"
          alignItems="center"
          height="620px"
          width="600px"
          borderRadius="lg"
          background="linear-gradient(to Bottom, teal 40%, white 20%)"
        >
          <Image
            borderRadius="100%"
            width="180px"
            height="190px"
            minHeight="190px"
            bg="gray"
            m="10px"
            mt="50px"
            src={userProfile.imageUrl || "/defaultProfilePic.png"}
          />
          <Text fontSize="30px" color="gray.600">
            {userProfile.login}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            m="20px"
            mb="25px"
          >
            <IoIosPeople size="40px" />
            <Text fontWeight="bold" mt="7px">
              {Friends.length}
              {/* 521 */}
            </Text>
            <Text color="gray.700">Friends</Text>
          </Box>
          <Box display="flex" height="90px">
          </Box>
        </Box>
      )}

        </TabPanel>
        <TabPanel
          p='0'
          height="625px"
          width="630px"
          pl='15px'
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          mb="10px"
        >
          <Box
          display="flex"
          justifyContent="center"
          border="3px solid white"
          alignItems="center"
          bg='white'
          height="620px"
          width="600px"
          borderRadius="lg"
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
                      src={value1.imageUrl || '/defaultProfilePic.png'}
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
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FriendsPage;
