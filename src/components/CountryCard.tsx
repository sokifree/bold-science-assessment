import {Country} from "../types/Country";
import {useCallback} from "react";
import {TimeZoneSummary} from "../types/TimeZoneSummary";
import {formatTimeZone} from "../utils/timeZoneUtils";
import {TimeZoneLiveTime} from "./TimeZoneLiveTime";

export interface CountryCardProps {
    country: Country
}

export const CountryCard = (props: CountryCardProps) => {
    const { country: { name, code, timeZones } } = props;

    const timeZone = useCallback((timeZone: TimeZoneSummary) => {
        return <span className='country-card-timezone' key={timeZone.name}>{timeZone.name} ({formatTimeZone(timeZone)}) - <TimeZoneLiveTime timeZone={timeZone}/></span>
    }, [])

    return <div className='card country-card'>
        <span><h3>{name}</h3> <h4>({code})</h4></span>

        <p>Time-zones:</p>
        <div className='country-card-timezones'>
            {timeZones.map(timeZone)}
        </div>
    </div>
};
CountryCard.displayName = 'CountryCard';