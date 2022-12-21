import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  theme:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "success"
    | "warning"
    | "base-light"
    | "base-dark"
    | "base-neutral";
  size?: "sm" | "md" | "lg";
  outline?: boolean;
  onClick?: () => void | Promise<void> | Promise<any>;
}

// return button component using props and clsx to add tailwind classes
const Button = ({
  children,
  className,
  theme,
  size,
  outline,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        `${className} rounded-md px-2 py-1 text-sm transition-colors duration-200 ease-in-out`,
        {
          "bg-base-light text-base-dark hover:bg-base-dark hover:text-base-light":
            theme === "base-light",
          "bg-base-dark text-base-light hover:bg-base-light hover:text-base-dark":
            theme === "base-dark",
          "bg-base-dark-300 text-base-light hover:bg-base-light hover:text-base-dark":
            theme === "base-neutral",
          "bg-primary text-base-dark hover:bg-base-light hover:text-base-dark":
            theme === "primary" && !outline,
          " bg-transparent text-primary outline outline-1 outline-primary":
            theme === "primary" && outline,
          "bg-secondary text-secondary-dark": theme === "secondary" && !outline,
          "border border-secondary bg-secondary text-base-light":
            theme === "secondary" && outline,
          "bg-tertiary text-base-light": theme === "tertiary" && !outline,
          "bg-tertiary border-tertiary border text-base-light":
            theme === "tertiary" && outline,
          "bg-error text-error-dark": theme === "error" && !outline,
          "border border-error bg-error text-base-light":
            theme === "error" && outline,
          "bg-success text-base-light": theme === "success" && !outline,
          "bg-success border-success border text-base-light":
            theme === "success" && outline,
          "bg-warning text-warning-dark": theme === "warning" && !outline,
          "border border-warning bg-warning text-base-light":
            theme === "warning" && outline,
          "px-2 py-1 text-sm": size === "sm",
          "px-3 py-2 text-sm": size === "md",
          "px-4 py-3 text-base": size === "lg",
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
