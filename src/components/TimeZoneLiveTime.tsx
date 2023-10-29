import {TimeZoneSummary} from "../types/TimeZoneSummary";
import {TimeZone} from "../types/TimeZone";
import {getCurrentTime} from "../utils/timeZoneUtils";
import {useEffect, useState} from "react";

export interface TimeZoneLiveTimeProps {
    timeZone: TimeZone | TimeZoneSummary
}

const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

export const TimeZoneLiveTime = (props: TimeZoneLiveTimeProps) => {
    const { timeZone } = props;

    const [currentTime, setCurrentTime] = useState(getCurrentTime(timeZone));

    // using useEffect to update times live
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getCurrentTime(timeZone));
        }, 1000);

        // cleanup function for when component is unmounted
        return () => clearInterval(intervalId);
    }, [timeZone]);

    const formatNum = (num: number) => num < 10 ? `0${num}` : num;
    const formattedTime = `${weekdays[currentTime.getDay()]} | ${formatNum(currentTime.getHours())}:${formatNum(currentTime.getMinutes())}:${formatNum(currentTime.getSeconds())}`;

    return <span>{formattedTime}</span>;
};
TimeZoneLiveTime.displayName = 'TimeZoneLiveTime';