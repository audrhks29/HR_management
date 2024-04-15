import { create } from "zustand";

interface UserStoreType {
  userInfo: UserDataTypes | null;
  setUserData: (userData: UserDataTypes) => void;
}

const useUserStore = create<UserStoreType>(set => ({
  userInfo: null,

  setUserData: userData => {
    set({ userInfo: userData });
  },
}));

export default useUserStore;
