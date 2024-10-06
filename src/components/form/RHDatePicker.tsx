/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

type TDatePickerProps = {
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    defaultValue?: any;
    required?: boolean;
    minDate?: string;
    maxDate?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RHDatePicker = ({ name, placeholder, label, className, defaultValue, required = true, minDate, maxDate, onChange }: TDatePickerProps) => {

    const { control } = useFormContext();

    return (
        <div className="space-y-2">
            {label ? <label>{label}</label> : null}
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                    <Input
                        {...field}
                        type="date"
                        id={name}
                        min={minDate}
                        max={maxDate}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        required={required}
                        onChange={(e) => {
                            field.onChange(e);
                            if (onChange) {
                                onChange(e);
                            }
                        }}
                        className={`${className} bg-offWhite/30`}
                    />
                }
            />
        </div>
    );
};

export default RHDatePicker;