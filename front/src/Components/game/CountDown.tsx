import React, { useEffect, useState } from "react";
import Counter from "./Counter"
import { Box, Button } from "@chakra-ui/react";

const CountDown = ({callback}:{callback?: Function}) => {
    const [disabled, setDisabled] = useState(false);
    const [date, setDate] = useState(Date.now() + 10000);

    useEffect(() => {
        setDate(Date.now() + 10000);
    }, []);

    return (
        <Box
            m="auto auto 10vh auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            w="50%"
        >
            <Counter date={date} callback={disabled ? undefined : callback} />
            <Button 
                bgColor="#a9c45b" color="#ffffff"
                w="25%" m='1rem' isDisabled={disabled} 
                onClick={() => {
                    callback && callback();
                    setDisabled(true);}}
            >
                Ready
            </Button>
        </Box>
    );
};

export default CountDown;