"use client";

import Modal from "./Modal";
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
  return (
    <Modal
      title={title}
      description={description}
      onConfirm={onConfirm}
      isLoading={isLoading}
      confirmVariant="destructive"
      confirmText="Delete"
      icon={<HelpCircle className="w-8 h-8" />}
      triggerButton={
        triggerButton ? (
          triggerButton
        ) : (
          <button className="bg-red-50 hover:bg-red-100 text-red-500 p-2.5 rounded-xl transition-colors shadow-sm">
            <Trash2 size={20} />
          </button>
        )
      }
    />
  );
};

export default DeleteModal;
