import {TimeZone} from "../types/TimeZone";
import {formatTimeZone} from "../utils/timeZoneUtils";
import {TimeZoneLiveTime} from "./TimeZoneLiveTime";

export interface TimeZoneCardProps {
    timeZone: TimeZone
}

export const TimeZoneCard = (props: TimeZoneCardProps) => {
    const { timeZone: { name, abbreviation, gmtOffset, dst, countryName, countryCode }, timeZone } = props;

    return <div className='card time-zone-card'>
        <span><h3>{name}</h3> <h4>({abbreviation})</h4></span>

        <p>Offset: {formatTimeZone(timeZone)} (DST: {dst ? 'active' : 'inactive'})</p>
        <p>Time now: <TimeZoneLiveTime timeZone={timeZone}/></p>
    </div>
};
TimeZoneCard.displayName = 'TimeZoneCard';