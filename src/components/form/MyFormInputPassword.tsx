"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface MyFormInputPasswordProps {
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

const MyFormInputPassword = ({
  name,
  label,
  onValueChange,
  placeholder = "Enter your password",
  required = true,
  className,
  labelClassName,
  inputClassName,
  disabled = false,
}: MyFormInputPasswordProps) => {
  const { control, getValues } = useFormContext();
  const inputValue = useWatch({ control, name }) ?? "";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (onValueChange) onValueChange(inputValue);
  }, [inputValue, onValueChange]);

  const baseFieldClass = cn(
    "w-full px-4 py-3 font-normal rounded-md bg-white text-gray-900 placeholder-gray-400 border border-gray-300",
    "focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors pr-10",
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
              type={isPasswordVisible ? "text" : "password"}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(baseFieldClass, error && "border-red-500 focus:ring-red-300")}
              value={field.value ?? ""}
            />
            
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute right-3 top-[22px] transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
              disabled={disabled}
            >
              {isPasswordVisible ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </button>

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

export default MyFormInputPassword;
