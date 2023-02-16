import { Box, Button, Image, Text } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Context/AppProvider";
import React from "react";
import { User } from "../../../types";

interface WinnerProps {
  login: string;
  image: string | null;
}

const Winner = ({login, image} : WinnerProps) => {
  const navigate = useNavigate();
  const {setUser} = AppState();
  
  const myNavigate = (path: string) => {
    setUser((user: User) => {
      return { ...user, WaitingAGame: false, inGame: false };
    });
    navigate(path);
  };

  return (
    <Box
      p="30px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="20px"
    >
      <Image
        src="/winner.png"
        alt="winner"
        w="40%"
      />
      <Image
        src={image ?? "/defaultProfilePic.png"}
        alt="profile"
        borderRadius="100%"
        w="15vw"
        h='15vw'
        maxW='300px'
        maxH='300px'
        p='4px'
        border='2px solid #a9c45b'
      />
      <Text fontSize='20pt' p='.5rem'>{login}</Text>
      <Box w='30%' display='flex' justifyContent='space-between' m='2rem'>
        <Button width='85%' color='#ffffff' bgColor='#a9c45b'
          onClick={() => myNavigate('/game')}
        >
          Play Again
        </Button>
        <Button width='10%' color='#ffffff' bgColor='#a9c45b' ml='0.3rem' p='0.5rem'
          onClick={() => myNavigate('/profile')}
        >
          <AiOutlineHome size={100}/>
        </Button>
      </Box>
    </Box>
  );
};

export default Winner;
