type LoadingSpinnerProps = {
  label?: string;
  className?: string;
};

const LoadingSpinner = ({ label = "Cargando", className = "" }: LoadingSpinnerProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label={label}>
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default LoadingSpinner;
