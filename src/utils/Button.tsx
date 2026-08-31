import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
}
