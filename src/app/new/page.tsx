"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { usePhone } from "@/context/phoneBook.context";
import { IPhone } from "@/models/types";

interface IPage {
  params: { id: string };
}

const Page: React.FC<IPage> = ({ params }) => {
  const [phone, setPhone] = useState<IPhone>({
    firstName: "",
    lastName: "",
    number: null,
    id: "",
  });

  const { phones, savePhone, updatePhone } = usePhone();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      const phoneFound = phones.find((phone) => phone.id === params.id);
      if (phoneFound) {
        setPhone(phoneFound);
      } else {
        router.push("/");
      }
    }
  }, [params]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPhone({
      ...phone,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidForm()) {
      if (params.id) {
        updatePhone(params.id, phone);
      } else {
        savePhone(phone);
      }
      router.push("/");
    }
  };

  const isValidForm = () => {
    return (
      phone.firstName !== "" && phone.number !== null && phone.lastName !== ""
    );
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
      <Input
        placeholder='First name'
        onChange={handleChange}
        value={phone.firstName}
        name='firstName'
      />
      <Input
        placeholder='Last name'
        onChange={handleChange}
        value={phone.lastName}
        name='lastName'
      />
      <Input
        placeholder='Number'
        onChange={handleChange}
        value={phone.number?.toString()}
        name='number'
        type='number'
      />
      <Button
        onClick={() => {}}
        className='rounded-2xl'
        disabled={!isValidForm()}
      >
        Save
      </Button>
    </form>
  );
};

export default Page;
