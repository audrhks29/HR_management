import { create } from "zustand";

interface UserStoreType {
  userInfo: UserInfoTypes | null;
  setUserInfo: (userData: UserInfoTypes | null) => void;
}

const useUserStore = create<UserStoreType>(set => ({
  userInfo: null,

  setUserInfo: userData => {
    set({ userInfo: userData });
  },
}));

export default useUserStore;
