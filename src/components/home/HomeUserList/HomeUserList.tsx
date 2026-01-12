import { FC } from 'react';
import { useGetUsersQuery } from '../../../services/usersApi';
import HomeUserListCard from './HomeUserListCard';

const HomeUserList: FC = () => {
  // L'utilisation du contexte aurait été faite ici mais cela aurait créé une surcouche inutile avec la manière dont j'ai procédé
  const { data, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className='flex flex-col space-y-6'>
      {data?.map(user => <HomeUserListCard key={user.id} user={user} />)}
    </section>
  );
};

export default HomeUserList;
