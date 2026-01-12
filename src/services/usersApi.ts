import { fakeBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

let USERS: User[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', birthDate: '1990-01-01', gender: 'homme', height: 175 },
  { id: '2', firstName: 'Jane', lastName: 'Doe', birthDate: '1992-02-02', gender: 'femme', height: 165 },
  { id: '3', firstName: 'Bob', lastName: 'Smith', birthDate: '1985-05-05', gender: 'homme', height: 180 },
];

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          return { data: [...USERS] };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<User, Omit<User, 'id'>>({
      queryFn: async user => {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          const newUser: User = { id: uuidv4(), ...user };
          USERS = [...USERS, newUser];
          return { data: newUser };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<User, User>({
      queryFn: async updatedUser => {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          USERS = USERS.map(u => (u.id === updatedUser.id ? updatedUser : u));
          return { data: updatedUser };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<{ id: string }, User['id']>({
      queryFn: async userId => {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          USERS = USERS.filter(u => u.id !== userId);
          return { data: { id: userId } };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation } = usersApi;
