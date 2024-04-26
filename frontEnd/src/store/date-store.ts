import { create } from "zustand";

interface DateStoreType {
  today: Date;
  year: string;
  month: string;
  date: string;
  todayDate: string;
  setToday: () => void;
}

const useDateStore = create<DateStoreType>(set => ({
  today: new Date(),
  year: "",
  month: "",
  date: "",
  todayDate: "",

  setToday: () => {
    const today = new Date();
    const year = String(today.getFullYear());
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}${month}${date}`;
    set({ today, year, month, date, todayDate });
  },
}));

export default useDateStore;
