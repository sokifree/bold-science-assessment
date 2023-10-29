import {TimeZoneSummary, TimeZoneSummaryDto} from "./TimeZoneSummary";

export interface CountryDto {
    name: string;
    code: string;
    time_zone: TimeZoneSummaryDto[];
}

export class Country {
    readonly name: string;
    readonly code: string;
    readonly timeZones: TimeZoneSummary[];

    constructor(dto: CountryDto) {
        this.name = dto.name;
        this.code = dto.code;
        this.timeZones = dto.time_zone.map(tz => new TimeZoneSummary(tz));
    }
}