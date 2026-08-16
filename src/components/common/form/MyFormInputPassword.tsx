"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch, RegisterOptions } from "react-hook-form";
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
  rules?: RegisterOptions;
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
  rules,
}: MyFormInputPasswordProps) => {
  const { control, getValues } = useFormContext();
  const inputValue = useWatch({ control, name }) ?? "";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    if (onValueChange) onValueChange(inputValue);
  }, [inputValue, onValueChange]);

  const baseFieldClass = cn(
    "w-full px-4 py-3 text-sm font-normal rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200",
    "focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 pr-10",
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
            <input
              {...field}
              id={name}
              type={isPasswordVisible ? "text" : "password"}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(baseFieldClass, error && "border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50")}
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
