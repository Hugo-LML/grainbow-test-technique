import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UPDATE_USER_VALIDATION } from '../../../constants/form-validations';
import { useDeleteUserMutation, useUpdateUserMutation } from '../../../services/usersApi';
import { User } from '../../../types';

type FormData = typeof UPDATE_USER_VALIDATION._type;

interface HomeUserListCardProps {
  user: User;
}

const HomeUserListCard: FC<HomeUserListCardProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(UPDATE_USER_VALIDATION),
    mode: 'onChange',
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthDate,
      gender: user.gender,
      height: user.height,
    },
  });

  const onSubmit = async (data: FormData) => {
    await updateUser({ id: user.id, ...data });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const deleteConfirmatipn = confirm(`Delete ${user.firstName} ${user.lastName}?`);
    if (!deleteConfirmatipn) return;
    await deleteUser(user.id);
  };

  return (
    <div className='space-y-2'>
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-start space-y-1'>
          <div className='space-x-1'>
            <Controller
              control={control}
              name='firstName'
              render={({ field, fieldState: { error } }) => (
                <>
                  <input {...field} className='border p-1' placeholder='First Name' />
                  {error && <p className='text-sm text-red-500'>{error.message}</p>}
                </>
              )}
            />
            <Controller
              control={control}
              name='lastName'
              render={({ field, fieldState: { error } }) => (
                <>
                  <input {...field} className='border p-1' placeholder='Last Name' />
                  {error && <p className='text-sm text-red-500'>{error.message}</p>}
                </>
              )}
            />
            <Controller
              control={control}
              name='birthDate'
              render={({ field, fieldState: { error } }) => (
                <>
                  <input {...field} type='date' className='border p-1' placeholder='Birth Date' />
                  {error && <p className='text-sm text-red-500'>{error.message}</p>}
                </>
              )}
            />
          </div>
          <div className='space-x-1'>
            <Controller
              control={control}
              name='gender'
              render={({ field, fieldState: { error } }) => (
                <>
                  <input {...field} className='border p-1' placeholder='Gender' />
                  {error && <p className='text-sm text-red-500'>{error.message}</p>}
                </>
              )}
            />
            <Controller
              control={control}
              name='height'
              render={({ field, fieldState: { error } }) => (
                <>
                  <input {...field} type='number' className='border p-1' placeholder='Height' />
                  {error && <p className='text-sm text-red-500'>{error.message}</p>}
                </>
              )}
            />
          </div>
          <button type='submit' className='text-blue-500 underline'>
            Save
          </button>
        </form>
      ) : (
        <div className='flex flex-col items-start space-y-1'>
          <h2 className='font-bold'>
            {user.firstName} {user.lastName} {user.birthDate}
          </h2>
          <h3 className='uppercase'>
            {user.gender} {user.height}cm
          </h3>
          <div className='flex space-x-3'>
            <button type='button' onClick={() => setIsEditing(true)} className='text-blue-500 underline'>
              Edit
            </button>
            <button type='button' className='text-red-500 underline' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeUserListCard;
