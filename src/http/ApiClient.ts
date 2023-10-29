import {ApiQuery} from "../types/ApiQuery";
import axios from "axios";
import {
    CountryCollection,
    CountryCollectionDto,
    TimeZoneCollection,
    TimeZoneCollectionDto
} from "../types/ApiCollection";
import {TimeZone} from "../types/TimeZone";

const apiBase = 'https://api-core.boldquantum.com/1/';

export class ApiClient {
    async getCountries(query: ApiQuery) {
        return this.getWithBadRequestMappedToEmpty(query, "countries", { count: 0, countries: [] } as CountryCollectionDto)
            .then(countryCollection => new CountryCollection(countryCollection));
    }

    async getTimezones(query: ApiQuery) {
        return this.getWithBadRequestMappedToEmpty(query, "timezones", { count: 0, time_zones: [] } as TimeZoneCollectionDto)
            .then(timeZoneCollection => new TimeZoneCollection(timeZoneCollection));
    }

    private async getWithBadRequestMappedToEmpty<TColl>(query: ApiQuery, path: string, emptyCollection: TColl): Promise<TColl> {
        const uri = `${apiBase}${path}`;

        const response = await axios.get<TColl>(uri, {
            params: { search: query.nameContains, code: query.countryCode, limited: query.limited, inc: true },
            validateStatus: (status) => {
                if (status >= 200 && status < 300) {
                    return true;
                }
                return status === 400;
            }
        });

        if (response.status === 400) {
            return emptyCollection;
        }

        return response.data;
    }
}