import {ApiQuery} from "../types/ApiQuery";
import {useCallback, useMemo} from "react";
import TextInput from "./TextInput";
import {Select} from "./Select";
import {ApiType, COUNTRIES_API_TYPE, TIME_ZONES_API_TYPE} from "../types/ApiType";
import NumberInput from "./NumberInput";
import {ClientQuery} from "../types/ClientQuery";
import * as isoCountryCodes from "iso-country-codes";
import RangeInput from "./RangeInput";

export interface ApiFilterProps {
    apiType: ApiType;
    apiQuery: ApiQuery;
    clientQuery: ClientQuery;
    onApiTypeChange: (newType: ApiType) => void;
    onApiQueryChange: (newQuery: ApiQuery) => void;
    onClientQueryChange: (newQuery: ClientQuery) => void;
    loading: boolean;
}

const countryCodes = [...isoCountryCodes.codes.map((code: any) => code.alpha2) as string[], ''];
// Some country names end up being spelt differently to how the api stores them fyi
const countryNames = [...isoCountryCodes.codes.map((code: any) => code.name) as string[], ''];

export const ApiFilter = (props: ApiFilterProps) => {
    const { apiType, apiQuery, onApiTypeChange, onApiQueryChange, clientQuery, onClientQueryChange } = props;

    // not really needed here but a nice little demo of useMemo to cache expensive values
    const title = useMemo(() => {
        if (apiType === COUNTRIES_API_TYPE) {
            return 'Filter countries';
        }
        return 'Filter time-zones';
    }, [apiType]);

    const apiTypeChanged = useCallback((newApiType: string) => {
        onApiTypeChange(newApiType as ApiType);
    }, [onApiTypeChange]);

    const nameFieldLabel = useMemo(() => {
        if (apiType === COUNTRIES_API_TYPE) {
            return 'Country name: ';
        }
        return 'Time-zone name: ';
    }, [apiType]);

    const nameContainsChanged = useCallback((newName: string) => {
        onApiQueryChange({...apiQuery, nameContains: newName});
    }, [apiQuery, onApiQueryChange]);

    const minOffsetChanged = useCallback((newMin: number) => {
        onClientQueryChange({...clientQuery, minOffset: newMin});
    }, [clientQuery, onClientQueryChange]);

    const maxOffsetChanged = useCallback((newMax: number) => {
        onClientQueryChange({...clientQuery, maxOffset: newMax});
    }, [clientQuery, onClientQueryChange]);

    const countryCodeChanged = useCallback((newCode: string) => {
        onApiQueryChange({...apiQuery, countryCode: newCode});
    }, [apiQuery, onApiQueryChange]);

    const currentHoursChanged = useCallback((newHours: number[]) => {
        onClientQueryChange({...clientQuery, currentHours: newHours});
    }, [clientQuery, onClientQueryChange]);

    const countryNamesChanged = useCallback((newCountryNames: string[]) => {
        onClientQueryChange({...clientQuery, countryNames: newCountryNames});
    }, [clientQuery, onClientQueryChange]);

    return <div className='api-filter'>
        <h2>{title}</h2>
        <Select id='api-type' label='Category: ' options={[COUNTRIES_API_TYPE, TIME_ZONES_API_TYPE]} onChange={apiTypeChanged} value={apiType} />
        <TextInput id='name-contains' value={apiQuery.nameContains} onChange={nameContainsChanged} label={nameFieldLabel} />
        <NumberInput id='offset-min' value={clientQuery.minOffset} onChange={minOffsetChanged} label='Minimum offset: ' min={-12} max={clientQuery.maxOffset} />
        <NumberInput id='offset-max' value={clientQuery.maxOffset} onChange={maxOffsetChanged} label='Maximum offset: ' max={12} min={clientQuery.minOffset} />
        <Select id='country-code' label='Country code: ' options={countryCodes} onChange={countryCodeChanged} value={apiQuery.countryCode} />
        <RangeInput id='current-hour' label='Current hour range: ' range={clientQuery.currentHours} onChange={currentHoursChanged} />
        <Select id='country-names' label='Countries: ' options={countryNames} onChange={countryNamesChanged} values={clientQuery.countryNames} multiple />
    </div>
}
ApiFilter.displayName = 'ApiFilter';