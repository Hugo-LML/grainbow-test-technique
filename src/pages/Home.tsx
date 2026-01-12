import { FC } from 'react';
import HomeUserList from '../components/home/HomeUserList/HomeUserList';
import Layout from '../components/layout/Layout';
import HomeUserAdd from '../components/home/HomeUserAdd/HomeUserAdd';

const Home: FC = () => {
  return (
    <Layout>
      <div className='flex justify-between space-x-10'>
        <HomeUserList />
        <HomeUserAdd />
      </div>
    </Layout>
  );
};

export default Home;
