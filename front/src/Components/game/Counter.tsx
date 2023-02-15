import Countdown, { CountdownRendererFn } from "react-countdown";
import { Text } from "@chakra-ui/react";

const Counter = ({date, callback}:{date?:number|string|Date, callback?:Function}) => {
    const renderer: CountdownRendererFn = ({ seconds, completed }) => {
        if (completed) {
            callback && callback();
            return <Text p='1rem' color="gray.400" fontSize='5xl'>Time's up!</Text>;
        } else {
            return <Text p='1rem' color="#fff" fontSize='5xl'>{seconds} seconds remaining</Text>;
        }
    };
  return (
    <Countdown date={date} renderer={renderer}/>
  );
}

export default Counter;