"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  triggerButton?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  
  // Footer actions
  showFooter?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive" | "success";
  isLoading?: boolean;
  
  // Customization
  className?: string;
  open?: boolean; // For controlled state
  onOpenChange?: (open: boolean) => void;
}

const Modal = ({
  title,
  description,
  triggerButton,
  icon,
  children,
  
  showFooter = true,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "default",
  isLoading = false,
  className,
  
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: ModalProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  
  const setOpen = (newOpen: boolean) => {
    if (isControlled && setControlledOpen) {
      setControlledOpen(newOpen);
    } else {
      setUncontrolledOpen(newOpen);
    }
  };

  const handleConfirm = async () => {
    if (!onConfirm) return;
    try {
      await onConfirm();
      setOpen(false);
    } catch (error) {
      console.error("Action failed", error);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setOpen(false);
  };

  const confirmClasses = {
    default: "bg-blue-600 hover:bg-blue-500 text-white",
    destructive: "bg-red-600 hover:bg-red-500 text-white",
    success: "bg-green-600 hover:bg-green-500 text-white",
  };

  const iconClasses = {
    default: "bg-blue-100 text-blue-600",
    destructive: "bg-red-100 text-red-600",
    success: "bg-green-100 text-green-600",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerButton && (
        <DialogTrigger asChild>
          {triggerButton}
        </DialogTrigger>
      )}

      <DialogContent className={cn("max-w-[450px] !rounded-3xl bg-white border border-gray-200 text-gray-900 shadow-xl [&>button]:hidden p-8", className)}>
        <DialogHeader>
          <DialogTitle asChild>
            <div className="flex flex-col items-center gap-6 text-center">
              {/* Icon */}
              {icon && (
                <div className={cn("w-16 h-16 flex items-center justify-center rounded-full", iconClasses[confirmVariant])}>
                  {icon}
                </div>
              )}

              {/* Title & Description */}
              {(title || description) && (
                <div>
                  {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
                  {description && <p className="text-sm text-gray-500 font-normal">{description}</p>}
                </div>
              )}

              {/* Custom Content (e.g. Forms) */}
              {children && (
                <div className="w-full text-left font-normal mt-2">
                  {children}
                </div>
              )}

              {/* Actions */}
              {showFooter && (
                <div className="flex md:gap-4 gap-3 w-full justify-center mt-2">
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl transition-colors disabled:opacity-50 font-medium"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={isLoading}
                    className={cn("flex-1 py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 font-medium", confirmClasses[confirmVariant])}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      confirmText
                    )}
                  </button>
                </div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
