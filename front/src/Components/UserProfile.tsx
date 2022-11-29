import { Box, Button, IconButton, Image, Text } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { GiPingPongBat } from "react-icons/gi";
import { FaUserPlus, FaUser, FaUserCog } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { BsFillMicMuteFill } from "react-icons/bs";

const UserProfile = () => {
  const { showUP, setShowUP, selectedRoom, setUsersList } = ChatState();

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      height="100%"
      bgGradient="linear(to-b, teal, white)"
      borderRadius="lg"
    >
      <Box
        width="100%"
        height="10%"
        minHeight="65px"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
      >
        <IconButton
          aria-label="close"
          variant="ghost"
          colorScheme="teal"
          color="white"
          ml="20px"
          icon={<HiArrowLeft size="25px" />}
          onClick={() => {
            setShowUP(undefined);
            if (selectedRoom && !selectedRoom.isGroupChat) setUsersList(false);
          }}
        />
      </Box>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        height="80%"
        width="100%"
        minHeight="400px"
        mt="10px"
      >
        <Image
          borderRadius="100%"
          width="180px"
          height="190px"
          bg="black"
          m="10px"
          mt="50px"
          src={showUP.imageUrl}
        />
        <Text fontSize="30px" color="gray.600">
          {showUP.login}
        </Text>
        <Text fontSize="15px">member</Text>
        <Box
          display="flex"
          justifyContent="space-around"
          flexWrap="wrap"
          m="30px"
          width="350px"
        >
          <Button
            color="teal"
            variant="unstyled"
            display="flex"
            flexDir="column"
            width="100px"
            height="70px"
            justifyContent="space-around"
            borderRadius="15px"
            mt="10px"
            //border="1px solid red"
          >
            <GiPingPongBat size="40px" />
            challenge
          </Button>
          <Button
            color="teal"
            variant="unstyled"
            height="70px"
            width="100px"
            display="flex"
            flexDir="column"
            justifyContent="space-around"
            borderRadius="10px"
            mt="10px"
            // border="1px solid red"
          >
            <FaUserPlus size="40px" />
            <Text fontWeight="bolder">add freind</Text>
          </Button>
          <Button
            color="teal"
            variant="unstyled"
            height="70px"
            width="100px"
            display="flex"
            flexDir="column"
            justifyContent="space-around"
            borderRadius="10px"
            mt="10px"
            // border="1px solid red"
          >
            <FaUser size="34px" />
            <Text>Profile</Text>
          </Button>
          <Button
            color="teal"
            variant="unstyled"
            height="70px"
            width="100px"
            display="flex"
            flexDir="column"
            justifyContent="space-around"
            borderRadius="10px"
            mt="15px"
          >
            <FcCancel size="38px" />
            <Text>ban</Text>
          </Button>
          <Button
            color="teal"
            variant="unstyled"
            height="70px"
            width="100px"
            display="flex"
            flexDir="column"
            justifyContent="space-around"
            borderRadius="10px"
            mt="15px"
          >
            <BsFillMicMuteFill size="34px" color="#D50000" />
            <Text>unmute</Text>
          </Button>
          <Button
            color="teal"
            variant="unstyled"
            height="70px"
            width="100px"
            display="flex"
            flexDir="column"
            justifyContent="space-around"
            borderRadius="10px"
            mt="15px"
          >
            <FaUserCog size="38px" />
            <Text>more</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
