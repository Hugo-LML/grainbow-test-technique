import { FC } from 'react';

const Header: FC = () => {
  return (
    <header className='fixed z-[1] flex h-[5rem] w-full items-center bg-gray-800 px-5 text-white md:px-8'>
      <h1 className='text-4xl font-bold uppercase'>Grainbow</h1>
    </header>
  );
};

export default Header;
