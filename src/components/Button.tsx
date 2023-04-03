import { MouseEvent } from "react";

interface IButton {
  children?: React.ReactNode;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<IButton> = ({
  children,
  onClick,
  className,
  disabled,
}) => (
  <button
    className={
      "bg-green-800 hover:bg-green-600 hover:text-blue-900 text-white font-bold py-2 px-4 rounded transition-colors w-full disabled:bg-neutral-600 disabled:text-neutral-400 " +
      className
    }
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
