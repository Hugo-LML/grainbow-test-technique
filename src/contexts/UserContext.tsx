import { createContext } from 'react';
import { useCreateUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../services/usersApi';

// Le contexte n'est pas utilisé dans les composants pour éviter une surcouche inutile et cela posait également des problèmes de typage avec les hooks RTK Query mais je le laisse visible ici pour voir la démarche de base

type UserContextType = {
  getUsers: ReturnType<typeof useGetUsersQuery>;
  createUser: ReturnType<typeof useCreateUserMutation>;
  updateUser: ReturnType<typeof useUpdateUserMutation>;
  deleteUser: ReturnType<typeof useDeleteUserMutation>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserContext.Provider
      value={{
        getUsers: useGetUsersQuery(),
        createUser: useCreateUserMutation(),
        updateUser: useUpdateUserMutation(),
        deleteUser: useDeleteUserMutation(),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
