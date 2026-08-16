"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface MyFormFileProps {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  isMultiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  acceptType?: string;
}

const MyFormFile = ({
  name,
  label,
  required = true,
  className,
  labelClassName,
  inputClassName,
  isMultiple = false,
  disabled = false,
  placeholder = "Upload File(s)",
  acceptType, // e.g. "image/*"
}: MyFormFileProps) => {
  const { control, getValues, setValue } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
        defaultValue={getValues(name)}
        rules={
          required
            ? {
                required: `${label ? `${label} is required` : "This field is required"}`,
              }
            : {}
        }
        render={({ fieldState: { error } }) => (
          <div className="relative w-full">
            <div className="flex flex-col gap-2">
              <label
                htmlFor={name}
                className={cn(
                  "border border-gray-300 text-gray-700 bg-white rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors relative overflow-hidden min-h-[120px]",
                  disabled && "bg-gray-100 text-gray-500 cursor-not-allowed hover:bg-gray-100",
                  error && "border-red-500",
                  inputClassName
                )}
              >
                {preview ? (
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-500"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <p className="text-center text-sm font-medium">
                      {placeholder}
                    </p>
                  </>
                )}

                <input
                  type="file"
                  id={name}
                  accept={acceptType}
                  multiple={isMultiple}
                  className="hidden"
                  disabled={disabled}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files || files.length === 0) return;

                    if (isMultiple) {
                      setValue(name, Array.from(files), {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setPreview(URL.createObjectURL(files[0])); // Show first image as preview
                    } else {
                      setValue(name, files[0], {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setPreview(URL.createObjectURL(files[0]));
                    }
                  }}
                />
              </label>
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

export default MyFormFile;
