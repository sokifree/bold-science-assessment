import {Country, CountryDto} from "./Country";
import {TimeZone, TimeZoneDto} from "./TimeZone";

export interface CountryCollectionDto {
    count: number;
    countries: CountryDto[];
}

export class CountryCollection {
    readonly count: number;
    readonly countries: Country[];

    constructor(dto: CountryCollectionDto){
        this.count = dto.count;
        this.countries = dto.countries.map(c => new Country(c));
    }
}

export interface TimeZoneCollectionDto {
    count: number;
    time_zones: TimeZoneDto[];
}

export class TimeZoneCollection {
    readonly count: number;
    readonly timeZones: TimeZone[];

    constructor(dto: TimeZoneCollectionDto){
        this.count = dto.count;
        this.timeZones = dto.time_zones.map(c => new TimeZone(c));
    }
}