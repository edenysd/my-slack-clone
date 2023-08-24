import _ from "lodash";
import { create } from "zustand";
import { mockUsersData } from "../api/user";

const createUsername = ({ firstName, lastName }) => {
  return (
    firstName.substr(0, 6).toLowerCase() + lastName.substr(0, 3).toLowerCase()
  );
};

const useUserStore = create((set, get) => ({
  loadingUsersData: false,
  users: [],
  currentUser: {},
  fetchAllUsers: () => {
    set({ loadingUsersData: true });
    mockUsersData().then((usersData) => {
      set({ users: usersData, loadingUsersData: false });
    });
  },
  getUserById: (id) => {
    return get().users.find((user) => user.id == id);
  },
  setCurrentUser: ({ firstName, lastName, email }) =>
    set({
      currentUser: {
        id: 0,
        firstName: _.capitalize(firstName),
        lastName: _.capitalize(lastName),
        email,
        username: createUsername({ firstName, lastName }),
        avatar: `https://i.pravatar.cc/100?u=${createUsername({
          firstName,
          lastName,
        })}`,
      },
    }),
}));

export default useUserStore;
