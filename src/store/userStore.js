import _ from "lodash";
import { create } from "zustand";

const createUsername = ({ firstName, lastName }) => {
  return (
    firstName.substr(0, 3).toLowerCase() +
    lastName.substr(0, 3).toLowerCase() +
    "test"
  );
};

const useUserStore = create((set) => ({
  users: [],
  currentUser: {},
  //TODO: complete fetch users method
  fetchAllUsers: () => set({ users: [{ name: "Julito" }] }),
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
