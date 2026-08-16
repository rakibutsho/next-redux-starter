import { cn } from "@/lib/utils";

interface SpinnerProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Spinner = ({ fullScreen = false, size = "md", className }: SpinnerProps) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-4",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-slate-900/80 z-50 text-white backdrop-blur-sm"
    : "flex items-center justify-center w-full p-4";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "animate-spin rounded-full border-blue-500 border-t-transparent mb-4",
            sizeClasses[size],
            className
          )}
        />
        {fullScreen && <p className="text-sm font-medium animate-pulse">Loading...</p>}
      </div>
    </div>
  );
};

export default Spinner;
