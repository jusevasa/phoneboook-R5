"use client";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { v4 as uuid } from "uuid";

import { IPhone, TodoContextType } from "@/models/types";
import { KEY_PHONE_LOCAL_STORAGE } from "@/constants/phoneBook.constants";

export const PhoneBookContext = createContext<TodoContextType | null>(null);

export const usePhone = () => {
  const context = useContext(PhoneBookContext);
  if (context) return context;
  throw new Error("usePhone must used within a provider");
};

interface IPhoneBookProvider {
  children: ReactNode;
}

export const PhoneBookProvider: React.FC<IPhoneBookProvider> = ({
  children,
}) => {
  const [phones, setPhones] = useState<IPhone[]>([]);

  useEffect(() => {
    const item = localStorage.getItem(KEY_PHONE_LOCAL_STORAGE);
    const phones = JSON.parse(item as string);

    if (phones && phones.length > 0) {
      setPhones(phones);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY_PHONE_LOCAL_STORAGE, JSON.stringify(phones));
  }, [phones]);

  const savePhone = (phone: IPhone) => {
    if (phone) {
      const phoneNew = phone;
      phone.id = uuid();
      setPhones([...phones, phoneNew]);
    }
  };

  const updatePhone = (id: string, newPhone: IPhone) => {
    setPhones([
      ...phones.map((phone) =>
        phone.id === id ? { ...phone, ...newPhone } : phone
      ),
    ]);
  };

  const deletePhone = (id: string): void => {
    setPhones([...phones.filter((phone) => phone.id !== id)]);
  };

  return (
    <PhoneBookContext.Provider
      value={{ phones, savePhone, updatePhone, deletePhone }}
    >
      {children}
    </PhoneBookContext.Provider>
  );
};
