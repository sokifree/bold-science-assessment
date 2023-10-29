import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {ApiType, COUNTRIES_API_TYPE} from "./types/ApiType";
import {ApiQuery} from "./types/ApiQuery";
import {ApiFilter} from "./components/ApiFilter";
import {Country} from "./types/Country";
import {TimeZone} from "./types/TimeZone";
import {ApiClient} from "./http/ApiClient";
import {PaginatedList} from "./components/PaginatedList";
import {CountryCard} from "./components/CountryCard";
import {TimeZoneCard} from "./components/TimeZoneCard";
import {ClientQuery} from "./types/ClientQuery";
import {getCurrentTime} from "./utils/timeZoneUtils";

const apiClient = new ApiClient();

function App() {
    const [apiType, setApiType] = useState<ApiType>(COUNTRIES_API_TYPE);
    const [apiQuery, setApiQuery] = useState<ApiQuery>({ countryCode: '', nameContains: '', limited: false });
    const [clientQuery, setClientQuery] = useState<ClientQuery>({minOffset: -12, maxOffset: 12, currentHours: [], countryNames: []})

    const [loading, setLoading] = useState(false);
    const [formDirty, setFormDirty] = useState(true);
    const [apiCountries, setApiCountries] = useState<Country[]>([]);
    const [filteredCountries, setFilteredCountries] = useState(apiCountries);
    const [apiTimeZones, setApiTimeZones] = useState<TimeZone[]>([]);
    const [filteredTimeZones, setFilteredTimeZones] = useState(apiTimeZones);
    const [apiError, setApiError] = useState<string>();

    const filterCountry = useCallback((country: Country) => {
        return (clientQuery.countryNames.length === 0 || clientQuery.countryNames.includes(country.name)) &&
        country.timeZones.find(tz =>
            tz.gmtOffset >= clientQuery.minOffset &&
            tz.gmtOffset <= clientQuery.maxOffset &&
            (clientQuery.currentHours.length === 0 || clientQuery.currentHours.includes(getCurrentTime(tz).getHours()))
        );
    }, [clientQuery]);

    const filterTimeZone = useCallback((timeZone: TimeZone) => {
        return timeZone.gmtOffset >= clientQuery.minOffset &&
            timeZone.gmtOffset <= clientQuery.maxOffset &&
            (clientQuery.currentHours.length === 0 || clientQuery.currentHours.includes(getCurrentTime(timeZone).getHours())) &&
            (clientQuery.countryNames.length === 0 || clientQuery.countryNames.includes(timeZone.countryName))
    }, [clientQuery]);

    const postFilterCountries = useCallback((countries: Country[]) => {
        return countries.filter(filterCountry);
    }, [filterCountry]);

    const postFilterTimeZones = useCallback((timeZones: TimeZone[]) => {
        return timeZones.filter(filterTimeZone);
    }, [filterTimeZone]);

    useEffect(() => {
        setFilteredCountries(postFilterCountries(apiCountries));
        setFilteredTimeZones(postFilterTimeZones(apiTimeZones));
    }, [apiCountries, apiTimeZones, postFilterCountries, postFilterTimeZones]);

    useEffect(() => {
        const handleApiError = (err: any) => {
            if (err.response) {
                setApiError(`Error response from API, status code: ${err.response.status}`);
            } else if (err.request) {
                setApiError(`Unable to connect to API, error details: ${err.request}`);
            } else {
                setApiError(`Unknown error: ${err.message}`);
            }
            setLoading(false);
        }

        if (!loading && formDirty) {
            setLoading(true);
            setFormDirty(false);
            setApiError(undefined);

            if (apiType === COUNTRIES_API_TYPE) {
                apiClient.getCountries(apiQuery)
                    .then((countries) => {
                        setApiCountries(countries.countries);
                        setLoading(false);
                    })
                    .catch(err => {
                        setApiCountries([]);
                        handleApiError(err);
                    });
            } else {
                apiClient.getTimezones(apiQuery)
                    .then((timeZones) => {
                        setApiTimeZones(timeZones.timeZones);
                        setLoading(false);
                    })
                    .catch(err => {
                        setApiTimeZones([]);
                        handleApiError(err);
                    });
            }
        }
    }, [apiType, apiQuery, loading, formDirty, postFilterCountries, postFilterTimeZones]);

    const countryCard = useCallback((country: Country) => <CountryCard country={country} />, []);
    const timeZoneCard = useCallback((timeZone: TimeZone) => <TimeZoneCard timeZone={timeZone} />, []);

    const paginatedList = useMemo(() => {
        if (apiType === COUNTRIES_API_TYPE) {
            return <PaginatedList items={filteredCountries} loading={loading} defaultPage={1} defaultPageSize={5} render={countryCard} />;
        }
        else {
            return <PaginatedList items={filteredTimeZones} loading={loading} defaultPage={1} defaultPageSize={5} render={timeZoneCard} />;
        }
    }, [apiType, filteredCountries, filteredTimeZones, loading, countryCard, timeZoneCard]);

    const onApiTypeChange = useCallback((newApiType: ApiType) => {
        setApiType(newApiType);
        setFormDirty(true);
    }, []);

    const onFilterChange = useCallback((newQuery: ApiQuery) => {
        setApiQuery(newQuery);
        setFormDirty(true);
    }, []);

    return (
      <div className="app">
          <h1>Country/TimeZone Search</h1>
          <span className='api-error'>{apiError}</span>
            <div className="form-list">
                <ApiFilter
                    apiType={apiType}
                    apiQuery={apiQuery}
                    clientQuery={clientQuery}
                    onApiTypeChange={onApiTypeChange}
                    onApiQueryChange={onFilterChange}
                    onClientQueryChange={setClientQuery}
                    loading={loading} />
                {paginatedList}
            </div>
      </div>
  );
}

export default App;
