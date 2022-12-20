import { useTimer } from "react-timer-hook";

const Timer = ({timeLeft, setDisabled}) => {
    const getDate = () => {
        const time = new Date();
        let addTime = timeLeft ? timeLeft : 10
        time.setSeconds(time.getSeconds() + addTime);
        return time;
    };

    const timesUp = () => {
        setTimeout(() => {
            setDisabled(true);
            alert("time's up");
        }, 1000);
    };

    const { seconds, minutes, pause, restart } = useTimer({
        expiryTimestamp: getDate(),
        onExpire: () => timesUp(),
    });
    return (
        <div style={{ fontSize: "50px" }}>
            <span>{minutes}</span>:<span>{seconds}</span>
        </div>
    )
}

export default Timer