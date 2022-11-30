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
import { useState } from "react";
import ChatHeader from "../Components/ChatHeader";
import { ChatState } from "../Context/ChatProvider";

const FriendsPage = () => {
  const { users, Friends } = ChatState();
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      alignItems="center"
      position={"fixed"}
    >
      <ChatHeader />
      <Tabs
        isFitted
        m="100px 10px 60px 0px"
        border="3px solid white"
        minWidth="420px"
        minHeight="600px"
        height="80vh"
        width={{ base: "100%", sm: "75%" }}
        borderRadius="lg"
      >
        <TabList minHeight="60px" height="6vh" bg="white">
          <Tab
            fontWeight="bold"
            fontSize="20px"
            borderRadius="5px"
            _selected={{ color: "white", bg: "teal" }}
          >
            Friends
          </Tab>
          <Tab
            fontWeight="bold"
            fontSize="20px"
            borderRadius="5px"
            _selected={{ color: "white", bg: "teal" }}
          >
            Friend Requests
          </Tab>
          <Tab
            fontWeight="bold"
            fontSize="20px"
            borderRadius="5px"
            _selected={{ color: "white", bg: "teal" }}
          >
            Suggestions
          </Tab>
        </TabList>
        <TabPanels>
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
            {Friends && (
              users.map((value1: any) => (
              Friends.some((value2: any) => (value2.user1Id === value1.id) && (value2.status === true) ) ?
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
                      <Button bg="gray.400" height="35px">
                        unfriend
                      </Button>
                      <Button bg="teal" height="35px">
                        message
                      </Button>
                    </Box>
                  </Box> : <></>
              ))
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
            {Friends && (
              users.map((value1: any) => (
              Friends.some((value2: any) => (value2.user1Id === value1.id) && (value2.status === false) ) ?
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
                      <Button bg="gray.400" height="35px">
                        Delete
                      </Button>
                      <Button bg="teal" height="35px">
                        Confirm
                      </Button>
                    </Box>
                  </Box> : <></>
              ))
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
            {Friends && (
              users.map((value1: any) => (
              !Friends.some((value2: any) => (value2.user1Id === value1.id)) ?
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
                      <Button bg="gray.400" height="35px">
                        Remove
                      </Button>
                      <Button bg="teal" height="35px">
                        Add Friend
                      </Button>
                    </Box>
                  </Box> : <></>
              ))
            )}

          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default FriendsPage;
