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

const FriendsPage = () => {
  const { socket, users, Friends } = AppState();

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
      isFitted
      border="3px solid white"
      mt="10px"
      width="60%"
      minWidth="420px"
      minHeight="400px"
      borderRadius="lg"
      mb="30px"
    >
      <TabList minHeight="38px" height="4vh" bg="white">
        <Tab
          fontWeight="bold"
          fontSize="18px"
          borderRadius="5px"
          _selected={{ color: "white", bg: "teal" }}
        >
          Friends
        </Tab>
        <Tab
          fontWeight="bold"
          fontSize="18px"
          borderRadius="5px"
          _selected={{ color: "white", bg: "teal" }}
        >
          Friend Requests
        </Tab>
        <Tab
          fontWeight="bold"
          fontSize="18px"
          borderRadius="5px"
          _selected={{ color: "white", bg: "teal" }}
        >
          Suggestions
        </Tab>
        <Tab
          fontWeight="bold"
          fontSize="18px"
          borderRadius="5px"
          _selected={{ color: "white", bg: "teal" }}
        >
          games
        </Tab>
        <Tab
          fontWeight="bold"
          fontSize="18px"
          borderRadius="5px"
          _selected={{ color: "white", bg: "teal" }}
        >
          groups
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel
          height="70vh"
          minHeight="530px"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          mb="10px"
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
                    m="20px"
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
                      src={value1.imageUrl}
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
        </TabPanel>
        <TabPanel
          height="70vh"
          minHeight="530px"
          overflowY="scroll"
          overflowX="hidden"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          mb="10px"
        >
          {Friends &&
            users.map(
              (value1: any) =>
                Friends.some(
                  (value2: any) =>
                    value2.user1Id === value1.id && value2.status === false
                ) && (
                  <Box
                    m="20px"
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
                      src={value1.imageUrl}
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
        </TabPanel>
        <TabPanel
          minHeight="530px"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          mb="10px"
        >
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
                      src={value1.imageUrl}
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
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FriendsPage;
