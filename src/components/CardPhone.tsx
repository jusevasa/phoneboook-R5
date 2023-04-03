import { MouseEvent } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "./Button";
import { IPhone } from "@/models/types";
import { usePhone } from "@/context/phoneBook.context";

interface ICardPhone {
  phone: IPhone;
}

export const CardPhone: React.FC<ICardPhone> = ({ phone }) => {
  const { number, firstName, lastName, id } = phone;
  const router = useRouter();
  const { deletePhone } = usePhone();

  return (
    <div
      className='bg-neutral-800 rounded-md flex flex-col p-3 gap-1 shadow-md cursor-pointer justify-between h-auto max-h-80'
      onClick={() => router.push(`/edit/${id}`)}
    >
      <div className='w-full flex flex-col gap-2 self-center'>
        <h1
          className='text-white font-bold text-ellipsis overflow-hidden w-56 md:w-32'
          title={`${firstName} ${lastName}`}
        >
          {firstName} {lastName}
        </h1>
        <p className='text-white font-thin'>{number}</p>
      </div>
      <div className='self-center mt-3 w-full md:text-end'>
        <Button
          onClick={(e: MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            const confirmation = window.confirm("Are you sure?");
            if (confirmation) {
              deletePhone(id);
              toast.success("Contact deleted successfully");
            }
          }}
          className='bg-red-600 font-medium hover:bg-red-800 hover:text-red-200 md:w-fit'
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
