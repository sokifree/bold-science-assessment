export interface TimeZoneDto {
    name: string;
    country_code: string;
    gmt_offset: number;
    abbreviation: string;
    is_dst: boolean;
    country_name: string;
}

// prefer camelcase to snake case personally :)
export class TimeZone {
    readonly name: string;
    readonly countryCode: string;
    readonly gmtOffset: number;
    readonly abbreviation: string;
    readonly dst: boolean;
    readonly countryName: string;

    constructor(dto: TimeZoneDto) {
        this.name = dto.name;
        this.countryCode = dto.country_code;
        this.gmtOffset = dto.gmt_offset;
        this.abbreviation = dto.abbreviation;
        this.dst = dto.is_dst;
        this.countryName = dto.country_name;
    }
}