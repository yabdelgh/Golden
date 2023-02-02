import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../Context/AppProvider";

const FriendButton = ({ target, icon }: any) => {
    const { setUserProfile, userProfile, socket, Friends } = AppState();
    const [isFriend, setIsFriend] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);
    const [amRequesting, setAmRequesting] = useState(false);
    const navigate = useNavigate();

    const manageFriendship = () => {
        if (!isFriend)
            socket.emit("addFriend", target.id);
        else if (isRequesting)
            socket.emit("removeFriend", target.id);
        else
            socket.emit("acceptFriend", target.id);

    }

    useEffect(() => {
        const relation = Friends.find((ele: any) => (target.id === ele.user1Id || target.id === ele.user2Id));
        if (relation) {
            console.log(relation)
            setIsFriend(relation.status);
            setIsRequesting(target.id === relation.user1id);
        }
    }, [userProfile, Friends])


    const button = icon ? (
        <Button
            color="teal"
            variant="unstyled"
            display="flex"
            flexDir="column"
            width="110px"
            height="70px"
            justifyContent="space-around"
            onClick={() => manageFriendship}
        >
            <FaUser size="34px" />
            profile
        </Button>
    ) : (
        <Button
            height="35px"
            onClick={manageFriendship}
        >
            {isFriend ? 'Unfriend' : 'Confirm Request'}
        </Button>
    );


    return (
        <Box>
        <Button
            height="35px"
            display={isFriend ? 'none' : 'flex'}
            onClick={() => socket.emit("addFriend", target.id)}
        >
            Add Friend
        </Button>
        <Button
            height="35px"
            display={!isFriend ? 'none' : 'flex'}
            onClick={() => socket.emit("removeFriend", target.id)}
        >
            Unfriend
        </Button>
        <Button
            height="35px"
            onClick={() => socket.emit("acceptFriend")}
            display={isRequesting ? 'flex' : 'none'}
        >
            Confirm Request
        </Button>
        <Button
            height="35px"
            onClick={manageFriendship}
            display={isRequesting ? 'flex' : 'none'}
        >
            Delete Request
        </Button>
        <Button
            height="35px"
            onClick={manageFriendship}
            display={amRequesting ? 'flex' : 'none'}
        >
            Cancel Request
        </Button>

        </Box>
    );
};
// x sent you a friend request Delete Request Confirm Request
// Cancel Request
export default FriendButton;
