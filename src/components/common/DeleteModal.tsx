"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { HelpCircle, Trash2 } from "lucide-react";

interface DeleteModalProps {
  title?: string;
  description?: string;
  triggerButton?: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

const DeleteModal = ({
  title = "Are you sure?",
  description = "This action cannot be undone. Do you want to proceed?",
  triggerButton,
  onConfirm,
  isLoading = false,
}: DeleteModalProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      await onConfirm();
      setOpen(false);
    } catch (error) {
      console.error("Action failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : (
          <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-md transition-colors">
            <Trash2 size={20} />
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-[450px] !rounded-3xl bg-[#0f172a] border border-red-500/40 text-white [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col items-center gap-6 text-center">
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-500/20">
                <HelpCircle className="w-8 h-8 text-red-500" />
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-400 font-normal">{description}</p>
              </div>

              {/* Actions */}
              <div className="flex md:gap-5 gap-3 w-full justify-center mt-2">
                <button
                  onClick={() => setOpen(false)}
                  disabled={isLoading}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-w-[120px]"
                >
                  {isLoading ? (
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
