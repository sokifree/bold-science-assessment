import {ChangeEvent, memo, useCallback} from "react";

export interface NumberInputProps {
    value: number | undefined;
    onChange: (newValue: number) => void;
    label: string;
    disabled?: boolean;
    id: string;
    min?: number;
    max?: number;
}

const NumberInput = (props: NumberInputProps) => {
    const { id, value, onChange, label, disabled, min, max } = props;

    const onValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.currentTarget.value));
    }, [onChange])

    return <div>
        <label htmlFor={id}>{label}</label>
        <input
            value={value}
            onChange={onValueChange}
            disabled={disabled}
            id={id}
            type='number'
            min={min}
            max={max}
        />
    </div>
};
NumberInput.displayName = 'NumberInput';
export default memo(NumberInput);