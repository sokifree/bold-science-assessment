import {ChangeEvent, useCallback} from "react";

interface CommonSelectProps {
    label: string;
    options: string[];
    disabled?: boolean;
    id: string;
}

interface SingleSelectProps {
    multiple?: false;
    value: string;
    onChange: (newValue: string) => void;
}

interface MultiSelectProps {
    multiple: true;
    values: string[];
    onChange: (newValues: string[]) => void;
}

export type SelectProps = CommonSelectProps & (SingleSelectProps | MultiSelectProps);

export const Select = (props: SelectProps) => {
    const { id, label, multiple , onChange, options, disabled} = props;

    const onValueChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        if (multiple) {
            onChange(Array.from(event.currentTarget.selectedOptions, opt => opt.value));
        }
        else {
            onChange(event.currentTarget.value);
        }
    }, [multiple, onChange])

    return <div>
        <label htmlFor={id}>{label}</label>
        <select
            multiple={multiple}
            value={multiple ? props.values : props.value}
            onChange={onValueChange}
            disabled={disabled}
            id={id}
        >
            {
                options.map(opt => <option value={opt} key={opt}>{opt}</option>)
            }
        </select>
    </div>
};
Select.displayName = 'Select';