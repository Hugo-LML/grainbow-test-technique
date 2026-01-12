import { FC, PropsWithChildren } from 'react';
import Header from './Header/Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='px-5 md:px-8 pt-32'>
        {children}
      </main>
    </>
  );
};

export default Layout;
