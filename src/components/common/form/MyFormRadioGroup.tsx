"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";

export interface RadioOption {
  value: string;
  label: string;
  image?: string;
}

interface MyFormRadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  onValueChange?: (value: string) => void;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  groupClassName?: string;
  radioLabelClassName?: string;
  radioInputClassName?: string;
  radioImageClassName?: string;
  radioItemClassName?: string;
  disabled?: boolean;
  rules?: RegisterOptions;
}

const MyFormRadioGroup = ({
  name,
  label,
  options,
  onValueChange,
  required = true,
  className,
  labelClassName,
  groupClassName,
  radioLabelClassName,
  radioInputClassName,
  radioImageClassName,
  radioItemClassName,
  disabled = false,
  rules,
}: MyFormRadioGroupProps) => {
  const { control, getValues, setValue } = useFormContext();

  // Set default for radio on mount (only if empty)
  useEffect(() => {
    if (options?.length) {
      const current = getValues(name);
      if (!current) setValue(name, options[0].value);
    }
  }, [options, name, setValue, getValues]);

  return (
    <div className={cn("flex flex-col gap-1 w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn("font-medium mb-2 text-gray-700 text-sm", labelClassName)}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={getValues(name) ?? options?.[0]?.value ?? ""}
        rules={{
          ...(required ? { required: `${label ? `${label} is required` : "This field is required"}` } : {}),
          ...rules,
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full">
            <div className={cn("flex flex-col gap-3", groupClassName)}>
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer",
                    field.value === option.value ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500" : "border-gray-200 bg-gray-50 hover:bg-gray-100",
                    disabled && "opacity-60 cursor-not-allowed",
                    error && "border-red-300 bg-red-50/30",
                    radioLabelClassName
                  )}
                >
                  <input
                    {...field}
                    type="radio"
                    value={option.value}
                    disabled={disabled}
                    checked={field.value === option.value}
                    onChange={(e) => {
                      field.onChange(e);
                      if (onValueChange) onValueChange(e.target.value);
                    }}
                    className={cn(
                      "form-radio text-blue-600 focus:ring-blue-500 focus:ring-offset-1 h-5 w-5 border-gray-300 transition-all",
                      radioInputClassName
                    )}
                  />
                  <div
                    className={cn(
                      "flex gap-2 items-center",
                      radioItemClassName
                    )}
                  >
                    {option.image && (
                      <Image
                        src={option.image || "/placeholder.svg"}
                        alt={option.label}
                        width={100}
                        height={100}
                        className={cn("w-6 h-6 object-contain", radioImageClassName)}
                      />
                    )}
                    <span className="text-sm font-medium text-gray-700">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
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

export default MyFormRadioGroup;
