/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type TCheckboxProps = {
    name: string;
    label: string;
    className?: string;
    defaultChecked?: any;
}

const RHCheckbox = ({ name, label, className, defaultChecked }: TCheckboxProps) => {
    const { control } = useFormContext();

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Checkbox
                        id={name}
                        checked={field.value}
                        defaultChecked={defaultChecked}
                        onCheckedChange={field.onChange}
                    />
                )}
            />
            <Label htmlFor={name}>{label}</Label>
        </div>
    );
};

export default RHCheckbox;