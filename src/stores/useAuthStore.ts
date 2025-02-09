// stores/useAuthStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  id: string;
  roles: string[];
  // ...otros campos
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  checkRoles: (requiredRoles?: string[]) => boolean;
};

// export const useAuthStore = create<AuthState>((set,get) => ({
//     user: null,
//       isAuthenticated: false,
//       isLoading: true,
      
//       login: (user) => set({
//         isAuthenticated: true,
//         user,
//       }),
      
//       logout: () => set({
//         isAuthenticated: false,
//         user: null,
//        }),
      
//       checkRoles: (requiredRoles) => {
//         const { user } = get();
//         if (!requiredRoles?.length) return true;
//         return user?.roles.some(role => requiredRoles.includes(role)) || false;
//       }
//   }));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      
      login: (user) => {set(
        (state) =>{ 
          console.log("intenta loguarse")
          return{
        isAuthenticated: true,
        user,
      }})},
      
      logout: () => set({
        isAuthenticated: false,
        user: null,
       }),
      
      checkRoles: (requiredRoles) => {
        const { user } = get();
        if (!requiredRoles?.length) return true;
        return user?.roles.some(role => requiredRoles.includes(role)) || false;
      }
    }),
    {
      name: 'auth-store',
      //storage: createJSONStorage(() => sessionStorage),
      //partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);