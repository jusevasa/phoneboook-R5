import React, { ChangeEventHandler } from "react";

interface IInput {
  value?: string;
  name?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
}

export const Input: React.FC<IInput> = ({
  value,
  name,
  onChange,
  disabled,
  placeholder = "",
  type = "text",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className='w-full relative rounded-full h-full bg-white transition-colors shadow-lg shadow-green-800/30 p-2 focus:outline-none focus:ring-0 focus:ring-transparent focus:border-transparent disabled:bg-neutral-300'
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
      maxLength={100}
    />
  );
};
