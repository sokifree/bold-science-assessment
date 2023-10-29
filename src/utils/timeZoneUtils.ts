import {TimeZoneSummary} from "../types/TimeZoneSummary";
import {TimeZone} from "../types/TimeZone";

// this won't handle timezones with an offset of half an hour, but neither does the api (yet!)
export const formatTimeZone = (timeZone: TimeZone | TimeZoneSummary) => {
    // stopped trying to use dst flag
    // const utcOffset = timeZone.gmtOffset + (timeZone.dst ? 1 : 0);
    const sign = timeZone.gmtOffset < 0 ? '-' : '+';
    const abs = Math.abs(timeZone.gmtOffset);

    if (abs < 10) {
        return `${sign}0${abs}:00`;
    }

    return `${sign}${abs}:00`;
}

export const getCurrentTime = (timeZone: TimeZone | TimeZoneSummary) => {
    return new Date(new Date().getTime() + (timeZone.gmtOffset*60*60*1000)); // eq for hours to miliseconds in an hour
}