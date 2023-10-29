// no way to do this stuff via the api (yet!)
export interface ClientQuery {
    minOffset: number;
    maxOffset: number;
    currentHours: number[];
    countryNames: string[];
}