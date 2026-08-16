"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

interface MyFormInputTextProps {
  type?: "text" | "email" | "number" | "url" | "tel";
  name: string;
  label?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
}

const MyFormInputText = ({
  type = "text",
  name,
  label,
  onValueChange,
  placeholder = "",
  required = true,
  className,
  labelClassName,
  inputClassName,
  disabled = false,
}: MyFormInputTextProps) => {
  const { control, getValues } = useFormContext();
  const inputValue = useWatch({ control, name }) ?? "";

  useEffect(() => {
    if (onValueChange) onValueChange(inputValue);
  }, [inputValue, onValueChange]);

  const baseFieldClass = cn(
    "w-full px-4 py-3 font-normal rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300",
    "focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors",
    disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
    inputClassName
  );

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn("font-normal mb-1 text-gray-900", labelClassName)}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={getValues(name) ?? ""}
        rules={
          required
            ? {
                required: `${label ? `${label} is required` : "This field is required"}`,
              }
            : {}
        }
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full">
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(baseFieldClass, error && "border-red-500 focus:ring-red-300")}
              value={field.value ?? ""}
            />
            <div className="h-4 mt-1">
              {error && (
                <small className="text-red-500 text-xs block">{error.message}</small>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default MyFormInputText;
