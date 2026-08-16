"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { UploadCloud, X, File as FileIcon } from "lucide-react";

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
  rules?: RegisterOptions;
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
  placeholder,
  acceptType, // e.g. "image/*"
  rules,
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
        rules={{
          ...(required ? { required: `${label ? `${label} is required` : "This field is required"}` } : {}),
          ...rules,
        }}
        render={({ field, fieldState: { error } }) => {
          const selectedFiles = field.value;
          const hasFiles = Array.isArray(selectedFiles) ? selectedFiles.length > 0 : !!selectedFiles;

          return (
            <div className="relative w-full">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={name}
                  className={cn(
                    "border-2 border-dashed border-gray-300 bg-gray-50/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden min-h-[160px] group",
                    !disabled && "hover:border-blue-500 hover:bg-blue-50/50",
                    disabled && "bg-gray-100 text-gray-500 cursor-not-allowed opacity-70",
                    error && "border-red-500 hover:border-red-600 bg-red-50/50",
                    inputClassName
                  )}
                >
                  {preview ? (
                    <div className="absolute inset-0 w-full h-full p-2">
                      <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-100 bg-white">
                        <Image
                          src={preview}
                          alt="Preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ) : hasFiles ? (
                    <div className="flex flex-col items-center gap-2 text-center z-10">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                        <FileIcon size={24} />
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {isMultiple ? `${selectedFiles.length} file(s) selected` : selectedFiles.name}
                      </p>
                      <p className="text-xs text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                        <UploadCloud size={24} />
                      </div>
                      <p className="mb-1 text-sm font-medium text-gray-700">
                        <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        {placeholder || "SVG, PNG, JPG or GIF (max. 800x400px)"}
                      </p>
                    </div>
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
                        if (files[0].type.startsWith("image/")) {
                          setPreview(URL.createObjectURL(files[0]));
                        } else {
                          setPreview(null);
                        }
                      } else {
                        setValue(name, files[0], {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                        if (files[0].type.startsWith("image/")) {
                          setPreview(URL.createObjectURL(files[0]));
                        } else {
                          setPreview(null);
                        }
                      }
                    }}
                  />
                </label>

                {/* Clear button if file is selected */}
                {hasFiles && !disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setValue(name, isMultiple ? [] : null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setPreview(null);
                      // Reset the native input value so the same file can be selected again
                      const fileInput = document.getElementById(name) as HTMLInputElement;
                      if (fileInput) fileInput.value = "";
                    }}
                    className="absolute top-3 right-3 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-20 shadow-sm"
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="h-4 mt-1">
                {error && (
                  <small className="text-red-500 text-xs block">{error.message}</small>
                )}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default MyFormFile;
