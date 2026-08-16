"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch, RegisterOptions } from "react-hook-form";

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
  rules?: RegisterOptions;
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
  rules,
}: MyFormTextareaProps) => {
  const { control, getValues } = useFormContext();
  const inputValue = useWatch({ control, name }) ?? "";

  useEffect(() => {
    if (onValueChange) onValueChange(inputValue);
  }, [inputValue, onValueChange]);

  const baseFieldClass = cn(
    "w-full px-4 py-3 text-sm font-normal rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200",
    "focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-y",
    disabled && "bg-gray-100 text-gray-500 cursor-not-allowed opacity-70",
    inputClassName
  );

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn("font-medium mb-1.5 text-gray-700 text-sm", labelClassName)}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={getValues(name) ?? ""}
        rules={{
          ...(required ? { required: `${label ? `${label} is required` : "This field is required"}` } : {}),
          ...rules,
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full">
            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              rows={rows}
              disabled={disabled}
              className={cn(baseFieldClass, error && "border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50")}
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
