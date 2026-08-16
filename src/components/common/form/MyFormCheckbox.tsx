"use client";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch, RegisterOptions } from "react-hook-form";
import { cn } from "@/lib/utils";

interface MyFormCheckboxProps {
  name: string; // Field name for react-hook-form
  consentText?: string; // Optional custom text for consent label
  onValueChange?: (value: boolean) => void; // Optional callback for value changes
  required?: boolean; // Optional required validation, default is false
  className?: string; // Custom className for input container
  labelClassName?: string; // Custom className for label
  checkboxClassName?: string; // Custom className for checkbox
  rules?: RegisterOptions;
}

const MyFormCheckbox = ({
  name,
  consentText,
  onValueChange,
  required = false,
  className,
  checkboxClassName,
  rules,
}: MyFormCheckboxProps) => {
  const { control, getValues } = useFormContext();
  const inputValue = useWatch({ control, name }) ?? false; // Ensures no undefined value

  useEffect(() => {
    if (onValueChange) {
      onValueChange(inputValue);
    }
  }, [inputValue, onValueChange]);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Controller
        name={name}
        control={control}
        defaultValue={getValues(name) ?? false} // Ensures controlled behavior
        rules={{
          ...(required ? { required: "This field is required" } : {}),
          ...rules,
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="relative flex items-start">
            <input
              {...field}
              id={name}
              type="checkbox"
              className={cn(
                "h-5 w-5 border-gray-300 rounded-md text-blue-600 bg-gray-50",
                "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all cursor-pointer",
                error && "border-red-500 focus:ring-red-500 bg-red-50",
                checkboxClassName
              )}
            />
            {consentText && (
              <span
                className="ml-3 text-sm font-medium text-gray-700 cursor-pointer select-none mt-0.5"
                dangerouslySetInnerHTML={{ __html: consentText }}
              ></span>
            )}
            <div className="h-4 my-1">
              {error && (
                <small className="text-red-500 text-xs">{error.message}</small>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default MyFormCheckbox;
