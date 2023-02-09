import { Box, Image, Text } from '@chakra-ui/react'
import { IoIosPeople } from 'react-icons/io'

const PlayerProfile = ({ target, color }: any) => {
  return (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="flex-end"
          border="3px solid white"
          alignItems="center"
          height="500px"
          width="300px"
          minHeight="400px"
          borderRadius="lg"
          background={`linear-gradient(to Bottom, ${color} 40%, white 20%)`}
        >
          <Image
            borderRadius="100%"
            width="180px"
            height="190px"
            minHeight="190px"
            bg="gray"
            m="10px"
            mt="50px"
            src={target.imageUrl || '/defaultProfilePic.png'}
          />
          <Text fontSize="30px" color="gray.600">
            {target.login}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            m="20px"
            mb="25px"
          >
            <IoIosPeople size="40px" />
            <Text fontWeight="bold" mt="7px">
              {/* {Friends.length} */}
              521
            </Text>
            <Text color="gray.700">Friends</Text>
          </Box>
          <Box display="flex" height="90px">
          </Box>
        </Box>
  )
}

export default PlayerProfile