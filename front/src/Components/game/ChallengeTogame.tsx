import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { AppState } from "../../Context/AppProvider";
import { useEffect, useState } from "react";
import { User } from "../../../types";
import { thereIsSomeOneOnline } from "../../Utils/rooms";
import { setMaxIdleHTTPParsers } from "http";

const ChallengeTogame = ({
  setInvit,
  send,
  opponent,
  setOpponent,
  setMap,
  setOpenentType,
}: any) => {
  const { users } = AppState();
  const [search, setSearch] = useState("");
  const [canChallenge, setCanChallenge] = useState(false);

  const ThereIsSomeOneToChallenge = (value: any) => {
    const user = users.find((ele: User) => ele.login === value);
    setOpponent(user);
    if (user && user.login === value) setCanChallenge(true);
    else setCanChallenge(false);
  };

  return (
    <Box
      height="500px"
      m="100px"
      width="500px"
      bg="white"
      borderRadius="lg"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent={"center"}
    >
      <Text fontSize="40px" color="gray.500" m="20px">
        Challenge to game
      </Text>
      <Box
        width="70%"
        height="120px"
        display="flex"
        flexDir="column"
        fontFamily="Inter"
        mb="20px"
        maxH="400px"
      >
        <FormControl height="50px" width="100%">
          <InputGroup height="100%">
            <Input
              pl="60px"
              height="100%"
              focusBorderColor="gray"
              placeholder="Invit a Friend"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                ThereIsSomeOneToChallenge(e.target.value);
              }}
            />
            <InputLeftElement ml="20px" mt="5px">
              <IconButton
                variant={"unstyled"}
                aria-label="Search database"
                icon={<BsSearch size="20px" color="gray" />}
              />
            </InputLeftElement>
          </InputGroup>
        </FormControl>
          {opponent && opponent.login ? (
            <Box
              display={"flex"}
              alignItems="center"
            justifyContent={"flex-Start"}
            width='100%'
            p='10px'
            >
              <Avatar
                bg="teal"
                color="white"
                size="md"
                cursor="pointer"
                name={opponent.login}
                src={opponent.imageUrl}
              />
              <Text m='10px' fontWeight={'bold'}>{opponent.login}</Text>
            </Box>
          ) : (
            <></>
          )}
      </Box>
      <Box display="flex" justifyContent={"flex-end"} width="90%">
        <Button
          mr="10px"
          width="100px"
          onClick={() => {
            setInvit(false);
            setMap('default')
            setOpenentType("quick pairing");
            setOpponent({});
          }}
        >
          cancel
        </Button>
        <Button
          mr="50px"
          width="100px"
          colorScheme={"teal"}
          onClick={() => send()}
          disabled={!canChallenge}
        >
          Challenge
        </Button>
      </Box>
    </Box>
  );
};

export default ChallengeTogame;
