export interface IPhone {
  id: string;
  number: number | null;
  firstName: string;
  lastName: string;
}

export type TodoContextType = {
  phones: IPhone[];
  savePhone: (todo: IPhone) => void;
  updatePhone: (id: string, newPhone: IPhone) => void;
  deletePhone: (id: string) => void;
};
