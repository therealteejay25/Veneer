"use client";

import { useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${
          type === "success"
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}
      >
        <HugeiconsIcon
          icon={type === "success" ? CheckmarkCircle02Icon : Cancel01Icon}
          size={20}
          color={type === "success" ? "#16a34a" : "#dc2626"}
          strokeWidth={2}
        />
        <p
          className={`text-sm font-medium ${
            type === "success" ? "text-green-800" : "text-red-800"
          }`}
        >
          {message}
        </p>
        <button
          onClick={onClose}
          className="ml-2 text-black/40 hover:text-black/60 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
