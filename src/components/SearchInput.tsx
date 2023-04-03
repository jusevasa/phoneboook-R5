import { ChangeEventHandler } from "react";

import { SearchIcon } from "@/icons";
import { Input } from "./Input";

interface ISearchInput {
  value: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const SearchInput: React.FC<ISearchInput> = ({
  value,
  name,
  onChange,
  disabled,
}) => {
  return (
    <div className='w-full relative flex justify-between items-center '>
      <Input
        placeholder='Search...'
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
      <button className='absolute right-4'>
        <SearchIcon className='w-5 h-5' />
      </button>
    </div>
  );
};
