import { Avatar, Box, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AppState } from "../../Context/AppProvider";
const ProfileHistory = () => {
  const [history, setHistory]: any = useState([]);
  const { userProfile, users, searchs } = AppState();

  const getOpponent = async (match: any) => {
    const id =
      userProfile.id === match.redCornerId
        ? match.blueCornerId
        : match.redCornerId;
    let opponent = users.find((user: any) => user.id === id);
    if (!opponent)
      opponent = searchs.find((user: any) => user.login && user.id === id);
    if (!opponent) {
      const ret = await axios.get(`/api/user?id=${id}`).then((payload: any) => {
        // setSearchs((value: any) => [payload.data, ...value]);
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
    ret.win = ret.score[0] > ret.score[1] ? "win" : ret.score[0] < ret.score[1] ?  "lose" : "draw";
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
      // className="debug"
      minW="600px"
      minH="600px"
      height="calc(100% - 70px)"
    >
      <Text fontSize="25px" fontWeight="bold" color="#B8B9BF" m="35px">
        Match History
      </Text>
      {history.length ? (
        <VStack
          spacing="0"
          width="90%"
          ml="30px"
          mr="30px"
          display="flex"
          flexDir="column"
          height="calc(100% - 120px)"
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
                color="gray.200"
                borderTop="2px solid #2B2D31"
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
                <Text color={value.win === "win" ? "#5CB85C" : value.win === "lose" ?  "#FF4136" : "gray"}>
                  {value.win}
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
          {/* <SlGameController size="100px" /> */}
          <Text fontSize="25px" mt="50px">
            You have no Games for now.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ProfileHistory;
