import { Box, Button, Image, Text } from "@chakra-ui/react";
import { AppState } from "../../Context/AppProvider";

const FriendsList = () => {
  const { users, Friends } = AppState(); 

  return (
    <Box
      display="flex"
      width="100%"
      flexWrap="wrap"
      alignItems={"center"}
      justifyContent="flex-start"
    >
      <Box width="100%" height="100%">
        <Text
          m="10px"
          ml="20px"
          fontSize="25px"
          fontWeight="bold"
          color="gray.500"
        >
          Friends List
        </Text>
      </Box>
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
              >
                <Image
                  borderTopRadius="lg"
                  height="60%"
                  width="100%"
                  src={value1.imageUrl || "/defaultProfilePic.png"}
                />
                <Text fontWeight="bolder" height="30px">
                  {value1.login}
                </Text>
                {/* <Box
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
                        // onClick={() => removeFriend(value1.id)}
                      >
                        unfriend
                      </Button>
                      <Button bg="teal" height="35px">
                        message
                      </Button>
                    </Box> */}
              </Box>
            )
        )}
    </Box>
  );
};

export default FriendsList;
