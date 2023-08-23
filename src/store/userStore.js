import { create } from "zustand";

const useUserStore = create((set) => ({
  users: [],
  currentUser: [],
  //TODO: complete fetch users method
  fetchAllUsers: () => set({ users: [{ name: "Julito" }] }),
  setCurrentUser: ({ firstName, lastName, email }) =>
    set({ currentUser: { firstName, lastName, email } }),
}));

export default useUserStore;
