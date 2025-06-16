import React, { KeyboardEventHandler, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Label } from "./ui";
import { twMerge } from 'tailwind-merge';
import { FieldError } from 'react-aria-components';

const components = {
    DropdownIndicator: null,
};

type CreateMultiSelectProps = {
    label: string;
    name?: string;
    placeholder: string;
    defaultValue?: any;
    onChange: (value: any) => void;
    className?: string;
    isRequired?: boolean;
    values?: any;
    errorMessages?: any;
};

interface Option {
    readonly label: string;
    readonly value: string;
}

const createOption = (label: string) => ({
    label,
    value: label,
});

export const CreateMultiSelect = ({
    label,
    name,
    placeholder,
    defaultValue = [],
    onChange,
    className = '',
    isRequired = false,
    values = [],
    errorMessages,
}: CreateMultiSelectProps) => {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState<readonly Option[]>(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (values) {
            setValue(values);
        }
    }, [values]);

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                event.preventDefault();

                const exists = value.some(
                    (option) => option.value.toLowerCase() === inputValue.toLowerCase()
                );

                if (!exists) {
                    const newOption = createOption(inputValue);
                    setValue([...value, newOption]);
                    onChange([...value, newOption]);
                }

                setInputValue('');
        }
    };

    return (
        <div className={twMerge("flex flex-col gap-1.5", className)}>
            {label && (
                <Label className="capitalize">
                    {label}
                    {isRequired && <span className="text-red-500">*</span>}
                </Label>
            )}
            <CreatableSelect
                name={name}
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                placeholder={placeholder}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                value={value}
                onChange={(newValue) => {
                    onChange(newValue || []);
                }}
            />
            {errorMessages && <FieldError>{errorMessages}</FieldError>}
        </div>
    );
};
