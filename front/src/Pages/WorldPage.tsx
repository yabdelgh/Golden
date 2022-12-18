import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react'
import ChatHeader from '../Components/ChatHeader'
import { AppState } from '../Context/AppProvider'

const WorldPage = () => {
  
    const { roomProfile } = AppState();
    return (
    <>
      <ChatHeader />
      { roomProfile &&
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
            minHeight="190px"
            bg="teal"
            m="10px"
            mt="50px"
            //src={userProfile.imageUrl}
          />
          <Text fontSize="30px" color="gray.600">
            {roomProfile.name}
          </Text>
        </Box>}
    </>
  )
}

export default WorldPage