/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type TRadioProps = {
    name: string;
    label: string;
    options: { label: string; value: string }[];
    className?: string;
    defaultValue?: any;
    required?: boolean;
}

const RHRadio = ({ name, label, options, className, defaultValue, required = true }: TRadioProps) => {
    const { control } = useFormContext();

    return (
        <div className={`space-y-2 ${className}`}>
            <Label>{label}</Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        defaultChecked={defaultValue}
                        required={required}
                    >
                        {options?.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                                <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}
            />
        </div>
    );
};

export default RHRadio;