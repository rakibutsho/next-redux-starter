"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

interface MyFormTextareaProps {
  name: string;
  label?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  rows?: number;
  disabled?: boolean;
}

const MyFormTextarea = ({
  name,
  label,
  onValueChange,
  placeholder = "",
  required = true,
  className,
  labelClassName,
  inputClassName,
  rows = 4,
  disabled = false,
}: MyFormTextareaProps) => {
  const { control, getValues } = useFormContext();
  const inputValue = useWatch({ control, name }) ?? "";

  useEffect(() => {
    if (onValueChange) onValueChange(inputValue);
  }, [inputValue, onValueChange]);

  const baseFieldClass = cn(
    "w-full px-4 py-3 font-normal rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300",
    "focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors resize-y",
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
            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              rows={rows}
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

export default MyFormTextarea;
