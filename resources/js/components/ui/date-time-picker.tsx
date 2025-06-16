"use client";

import { useState } from "react";
import { getLocalTimeZone, now, parseZonedDateTime } from "@internationalized/date";
import { DatePicker } from "./date-picker";

interface DatePickerComponentProps {
    label?: string;
    className?: string;
    value?: any;
    onChange?: (value: any) => void;
    errorMessage?: string;
    isRequired?: boolean;
    name?: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
    label,
    className,
    value,
    onChange,
    errorMessage,
    isRequired,
    name,
}) => {
    const today = parseZonedDateTime(now(getLocalTimeZone()).toString());
    const [internalValue, setInternalValue] = useState(value || today);

    const handleChange = (newValue: any) => {
        setInternalValue(newValue);

        const formattedDate = `${newValue.year}-${String(newValue.month).padStart(2, '0')}-${String(newValue.day).padStart(2, '0')} ${String(newValue.hour).padStart(2, '0')}:${String(newValue.minute).padStart(2, '0')}:${String(newValue.second).padStart(2, '0')}.${String(newValue.millisecond).padStart(3, '0')}`;
        onChange?.(formattedDate);
    };

    return (
        <div className={className}>
            <label className="block font-medium text-sm mb-2">
                {label} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <DatePicker
                name={name}
                hideTimeZone
                hourCycle={24}
                value={internalValue}
                onChange={handleChange}
            />
            {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
        </div>
    );
};

export default DatePickerComponent;
