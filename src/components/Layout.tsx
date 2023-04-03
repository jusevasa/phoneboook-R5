"use client";

interface ILayout {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <main className='h-full w-full flex justify-center items-center'>
      <div className='w-5/6 bg-zinc-900 h-5/6  rounded-md shadow-md flex-col p-8 flex justify-center items-center'>
        {children}
      </div>
    </main>
  );
};
