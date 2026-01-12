import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { UPDATE_USER_VALIDATION } from '../../../constants/form-validations';
import { useCreateUserMutation } from '../../../services/usersApi';

type FormData = typeof UPDATE_USER_VALIDATION._type;

const HomeUserAdd: FC = () => {
  const [createUser] = useCreateUserMutation();

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(UPDATE_USER_VALIDATION),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    await createUser({ id: uuidv4(), ...data });
  };

  return (
    <div className='space-y-1'>
      <h2>Add User:</h2>
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
          Create
        </button>
      </form>
    </div>
  );
};

export default HomeUserAdd;
