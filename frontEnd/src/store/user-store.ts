import { create } from "zustand";

interface UserStoreType {
  userInfo: string | null;
  setUserInfo: () => void;
}

const useUserStore = create<UserStoreType>(set => ({
  userInfo: null,

  setUserInfo: () => {
    const user_id = sessionStorage?.getItem("user_id");
    set({ userInfo: user_id });
  },
}));

export default useUserStore;
