export const getFullName = (user) => {
  return (user.firstName + " " + user.lastName).slice(0, 30);
};
