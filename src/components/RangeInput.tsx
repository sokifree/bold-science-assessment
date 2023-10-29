import {ChangeEvent, memo, useCallback, useMemo, useState} from "react";

export interface RangeInputProps {
    range: number[];
    onChange: (newRange: number[]) => void;
    label: string;
    disabled?: boolean;
    id: string;
}

const RangeInput = (props: RangeInputProps) => {
    const { id, onChange, label, disabled} = props;

    const [rawText, setRawText] = useState('');

    const onValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const currentValue = event.currentTarget.value;
        setRawText(currentValue);

        if (currentValue.includes("-")) {
            const [x, y] = currentValue.split("-");
            const from = Number(x);
            const to = y ? Number(y) : Number(x);
            onChange(Array.from({ length: to - from + 1 }, (_, i) => i + from));
        }
        else if (currentValue.includes(",")) {
            const values = currentValue.split(",");
            onChange(values.filter(v => v === "0" || v).map(Number));
        }
        else if (!currentValue) {
            onChange([]);
        }
        else {
            onChange([Number(currentValue)]);
        }
    }, [onChange])

    return <div>
        <label htmlFor={id}>{label}</label>
        <input
            value={rawText}
            onChange={onValueChange}
            disabled={disabled}
            id={id}
        />
    </div>
};
RangeInput.displayName = 'NumberInput';
export default memo(RangeInput);