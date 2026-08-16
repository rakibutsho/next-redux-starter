"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

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
          className={cn("font-normal mb-1 text-gray-900", labelClassName)}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={getValues(name) ?? options?.[0]?.value ?? ""}
        rules={
          required
            ? {
                required: `${label ? `${label} is required` : "This field is required"}`,
              }
            : {}
        }
        render={({ field, fieldState: { error } }) => (
          <div className="relative w-full">
            <div className={cn("flex flex-col gap-2", groupClassName)}>
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-2 text-gray-900 cursor-pointer",
                    disabled && "opacity-60 cursor-not-allowed",
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
                      "form-radio text-gray-800 focus:ring-gray-400 h-4 w-4",
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
                    <span>{option.label}</span>
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
