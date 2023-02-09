import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { AppState } from "../Context/AppProvider";
import { GiWorld } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";
import { FcLock } from "react-icons/fc";
import { useState } from "react";
import { Room, RoomUser } from "../../types";
const WorldPage = () => {
  const { roomProfile, socket, rooms, user } = AppState();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");

  const joinRoom = () => {
    socket.emit("joinRoom", { roomId: roomProfile.id, password });
  };
  const leaveRoom = () => {
    socket.emit("leaveRoom", { roomId: roomProfile.id });
  };

  const isMember = (userId: number): boolean => {
    const room = rooms.find((ele: Room) => ele.id === roomProfile.id);
    if (room)
      return room.RoomUsers.some(
        (object: RoomUser) =>
          object.userId === userId && object.status === "Member"
      );
    else return false;
  };

  return (
    <>
      {roomProfile && (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          border="3px solid white"
          alignItems="center"
          height="600px"
          width="500px"
          minHeight="400px"
          mt="100px"
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
            src="https://res.cloudinary.com/deh8jlnkz/image/upload/v1664901212/cld-sample-3.jpg"
          />
          <Text fontSize="30px" color="gray.600">
            {roomProfile.name}
          </Text>
          <Box
            display="flex"
            width="170px"
            justifyContent="space-between"
            m="20px"
          >
            <Box display="flex" flexDir="column" alignItems="center">
              <IoIosPeople size="40px" />
              <Text fontWeight="bold" mt="7px">
                113k
              </Text>
              <Text color="gray.700">Members</Text>
            </Box>
            <Box display="flex" flexDir="column" alignItems="center">
              {roomProfile.access === "Private" ? (
                <FcLock size="40px" />
              ) : (
                <GiWorld size="40px" />
              )}
              <Text fontWeight="bold" mt="7px">
                {roomProfile.access === "Private" ? "Private" : "Public"}
              </Text>
              <Text color="gray.700">Group</Text>
            </Box>
          </Box>
          {isMember(user.id) ? (
            <Button
              mb="25px"
              mt="15px"
              bg="#ca3232"
              color="white"
              width="200px"
              ml="10px"
              onClick={() => leaveRoom()}
            >
              leave
            </Button>
          ) : (
            <Box
              display='flex'
              height="40px"
              mb="25px"
              mt="15px"
            >
              {roomProfile.access === "Protected" && (
                <FormControl id="Password" isRequired>
                  <InputGroup size="md">
                    <Input
                      onBlur={(e) => setPassword(e.target.value)}
                      type={show ? "text" : "password"}
                      placeholder="Password"
                      focusBorderColor="gray.200"
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        w="3.5rem"
                        size="sm"
                        onClick={() => setShow(!show)}
                      >
                        {show ? "hide" : "show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              )}
              <Button
                colorScheme="teal"
                display={roomProfile.access === "Private" ? "none" : "flex"}
                width="100px"
                ml="10px"
                onClick={() => joinRoom()}
              >
                join
              </Button>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default WorldPage;
