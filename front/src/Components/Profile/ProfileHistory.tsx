import { Avatar, Box, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppState } from "../../Context/AppProvider";
import { SlGameController } from "react-icons/sl";
const ProfileHistory = () => {
  const [history, setHistory]: any = useState([]);
  const { userProfile, users, searchs, setSearchs } = AppState();

  const getOpponent = async (match: any) => {
    const id =
      userProfile.id === match.redCornerId
        ? match.blueCornerId
        : match.redCornerId;
    let opponent = users.find((user: any) => user.id === id);
    if (!opponent)
      opponent = searchs.find((user: any) => user.id === id && user.login);
    if (!opponent) {
      const ret = await axios.get(`/api/user?id=${id}`).then((payload: any) => {
        setSearchs((value: any) => [payload.data, ...value]);
        return payload.data;
      });
      return ret;
    } else return opponent;
  };

  const setMatch = async (match: any) => {
    const ret: any = {};
    ret.id = match.id;
    ret.opponent = await getOpponent(match);
    ret.score =
      ret.opponent.id === match.redCornerId
        ? [match.redCornerScore, match.blueCornerScore]
        : [match.blueCornerScore, match.redCornerScore];
    ret.win = ret.score[0] > ret.score[1] ? false : true;
    ret.date = match.createdAt;
    setHistory((value: any) => [...value, ret]);
  };
  useEffect(() => {
    setHistory([]);
  }, [userProfile]);

  useEffect(() => {
    if (userProfile.id !== undefined)
      axios
        .get(`/api/game/history/${userProfile.id}`)
        .then(async (payload: any) => {
          payload.data.map((value: any) => setMatch(value));
        });
  }, [userProfile]);

  return (
    <Box
      borderRadius={"lg"}
      bg="white"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Text
        p="10px 0 30px 20px"
        pl="20px"
        fontSize="25px"
        fontWeight="bold"
        color="gray.500"
        width="100%"
      >
        Match History
      </Text>
      {history.length ? (
        <VStack
          spacing="0"
          width="90%"
          borderRadius="15px"
          display="flex"
          flexDir="column"
          bg="gray.100"
        >
          <Box
            width="100%"
            height="60px"
            borderTopRadius={"5px"}
            display="flex"
            alignItems={"center"}
            fontSize="20px"
            color="gray"
            fontWeight="bold"
            pl="20px"
          >
            <Text width="40%">Opponent</Text>
            <Text width="30%">score</Text>
            <Text width="30%">Date</Text>
          </Box>

          {history.length !== 0 &&
            history.map((value: any) => (
              <Box
                width="100%"
                height="70px"
                display="flex"
                alignItems={"center"}
                pl="20px"
                key={value.id}
                fontSize="20px"
                color="gray.500"
                fontWeight="bold"
              >
                <Box display="flex" alignItems="center" width="40%">
                  <Avatar
                    color="white"
                    borderRadius="10px"
                    size="sm"
                    name={value.opponent.login}
                    src={value.opponent.imageUrl || "/defaultProfilePic.png"}
                  />

                  <Text ml="20px">{value.opponent.login}</Text>
                </Box>
                <Text width="30%">{`${value.score[0]} - ${value.score[1]}`}</Text>
                <Text width="20%">12-12-12</Text>
                <Text color={value.win ? "green.400" : "red.400"}>
                  {value.win ? "win" : "lose"}
                </Text>
              </Box>
            ))}
        </VStack>
      ) : (
        <Box
          height="90%"
          color="gray.400"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          fontSize={"50px"}
        >
          <SlGameController size="100px" />
          <Text fontSize="25px" mt="50px">
            You have no Games for now.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ProfileHistory;
