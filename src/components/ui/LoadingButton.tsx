import { Loader2 } from "lucide-react";
import { Button } from "./button";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

function LoadingButton({ children, loading, ...props }: LoadingButtonProps) {
  return (
    <Button
      className="w-full"
      {...props}
      type="submit"
      disabled={props.disabled || loading}
    >
      {loading && (
        <span>
          <Loader2 size={16} className="mr-2 animate-spin" />
        </span>
      )}
      {children}
    </Button>
  );
}
export default LoadingButton;
