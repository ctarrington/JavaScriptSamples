import {useCallback, useState} from "react";

const floatRegex = /^-?\d*(\.\d*)?$/;

interface NumericInputProps {
    min: number;
    max: number;
    currentValue: number;
    onChange: (value: number) => void;
    precision: number;
}

export function NumericInput({min, max, currentValue, onChange, precision}: NumericInputProps) {
    const [rawValue, setRawValue] = useState("0");

    const onChangeRawValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;

        if (floatRegex.test(raw)) {
            setRawValue(raw);
        }
    }, [setRawValue]);

    const isValid = useCallback((parsedValue: number) => {
        if (isNaN(parsedValue)) {
            return false;
        }

        if (parsedValue < min || parsedValue > max) {
            return false;
        }
        return true;
    }, [min, max]);

    const onLeave = useCallback(() => {
        const parsedValue = parseFloat(rawValue);
        if (!isValid(parsedValue)) {
            setRawValue(currentValue.toFixed(precision));
            return;
        }

        if (currentValue !== parsedValue) {
            onChange(parsedValue);
        }
        setRawValue(parsedValue.toFixed(precision))
    }, [setRawValue, rawValue, isValid, currentValue, onChange, precision]);

    const valid = isValid(parseFloat(rawValue));
    const inputStyle = valid ? {} : {
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
    };

    return (
        <div>
            <input style={inputStyle} type='text' value={rawValue} onChange={onChangeRawValue} onMouseLeave={onLeave}/>
        </div>
    )
}