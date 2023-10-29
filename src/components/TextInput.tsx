import {ChangeEvent, memo, useCallback} from "react";

export interface TextInputProps {
    value: string | undefined;
    onChange: (newValue: string) => void;
    label: string;
    disabled?: boolean;
    id: string;
}

const TextInput = (props: TextInputProps) => {
    const { id, value, onChange, label, disabled } = props;

    const onValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
    }, [onChange])

    return <div>
        <label htmlFor={id}>{label}</label>
        <input
            value={value}
            onChange={onValueChange}
            disabled={disabled}
            id={id}
        />
    </div>
};
TextInput.displayName = 'TextInput';
export default memo(TextInput);