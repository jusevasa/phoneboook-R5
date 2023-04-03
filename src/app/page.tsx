"use client";

import { Button } from "@/components/Button";
import { CardPhone } from "@/components/CardPhone";
import { SearchInput } from "@/components/SearchInput";
import { usePhone } from "@/context/phoneBook.context";
import { IPhone } from "@/models/types";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const Page = () => {
  const { phones } = usePhone();
  const [inputValue, setInputValue] = useState({ search: "" });
  const { search } = inputValue;
  const router = useRouter();

  const keys = ["firstName", "lastName", "number"];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (phones: IPhone[]): IPhone[] => {
    return phones.filter((phone: IPhone) =>
      keys.some((key) =>
        (phone[key as keyof typeof phone] as String)
          .toLowerCase()
          .includes(inputValue.search)
      )
    );
  };

  const isEmptyPhones = (): boolean => {
    return handleSearch(phones).length === 0 && inputValue.search === "";
  };

  const handleClickBtnAdd = (): void => {
    router.push("new");
  };

  return (
    <div className='w-full h-full flex items-center flex-col gap-5'>
      <div className='flex w-full flex-col gap-5'>
        <h1 className='text-white font-bold text-5xl w-full'>Phone Book</h1>
        <Button
          onClick={() => handleClickBtnAdd()}
          className='animate-bounce max-w-fit'
        >
          Add Phone
        </Button>
      </div>
      <div className='border border-neutral-700 rounded-md w-full p-3 h-full flex flex-col justify-between items-center'>
        <SearchInput
          name='search'
          onChange={handleChange}
          value={search}
          disabled={isEmptyPhones()}
        />
        <div className='flex mt-5 w-full flex-col flex-grow relative'>
          <div className='absolute w-full h-full overflow-y-auto flex flex-col gap-2 md:grid md:grid-cols-4 '>
            {handleSearch(phones).map((phone) => (
              <CardPhone phone={phone} key={phone.id} />
            ))}
            {isEmptyPhones() && (
              <p className='text-neutral-700 font-light text-center underline'>
                Is empty, please create a contact.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
