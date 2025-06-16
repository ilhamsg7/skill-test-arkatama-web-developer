import AsyncSelect from "react-select/async";
import { Label } from "./ui";
import { twMerge } from "tailwind-merge";

type CustomSelectProps = {
    label: string;
    name?: string;
    isMulti?: boolean;
    placeholder?: string;
    defaultValue: any;
    onChange: (value: any) => void;
    loadOptions: (params: any) => Promise<any>;
    className?: string;
    isRequired?: boolean;
    menuPlacement?: "auto" | "bottom" | "top";
    isReadOnly?: boolean;
    [key: string]: any;
};

export const CustomSelect = ({
    label,
    name,
    placeholder,
    defaultValue,
    onChange,
    loadOptions,
    className,
    isRequired,
    isMulti,
    isReadOnly = false,
    menuPlacement,
    ...props // Collect remaining props
}: CustomSelectProps) => {
    return (
        <div className={twMerge("flex flex-col gap-1.5", className)} {...props}>
            {label && (
                <Label className="capitalize">
                    {label}
                    {isRequired && <span className="text-red-500">*</span>}
                </Label>
            )}
            <AsyncSelect
                cacheOptions
                name={name}
                loadOptions={loadOptions}
                defaultOptions
                isClearable
                defaultValue={defaultValue}
                onChange={(value) => {
                    onChange(value);
                }}
                placeholder={placeholder}
                isMulti={isMulti}
                menuPlacement={menuPlacement}
                isDisabled={isReadOnly}
            />
        </div>
    );
};
