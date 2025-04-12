import { cn } from "@/lib/utils";
import { ButtonType } from "@/types";
import Link from "next/link";

const Button = ({
  href,
  label,
  className,
  ...props
}: ButtonType & React.HTMLProps<HTMLAnchorElement>) => {
  return (
    <Link
      href={href}
      className={cn(
        "border-white text-white py-3 px-10 border-2 rounded-xl hover:bg-white hover:text-slate-900 transition-all",
        className
      )}
      {...props}
    >
      {label}
    </Link>
  );
};

export default Button;
