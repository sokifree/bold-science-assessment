export interface TimeZoneSummaryDto {
    name: string;
    gmt_offset: number;
    dst: number;
    abbreviation: string;
}

export class TimeZoneSummary {
    readonly name: string;
    readonly gmtOffset: number;
    readonly dst: boolean;
    readonly abbreviation: string;

    constructor(dto: TimeZoneSummaryDto) {
        this.name = dto.name;
        this.gmtOffset = dto.gmt_offset;
        this.dst = dto.dst === 1;
        this.abbreviation = dto.abbreviation;
    }
}