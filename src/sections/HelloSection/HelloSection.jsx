import { Avatar } from "@mui/material";
import useUserStore from "../../store/userStore";

const HelloSection = () => {
  const currentUser = useUserStore((state) => state.currentUser);

  if (!currentUser) return null;

  return (
    <main className="grid w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center flex flex-col items-center">
        <p className="text-xl font-semibold text-fuchsia-700 sm:text-3xl">
          Hi 👋
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          <span>{currentUser.firstName}</span>{" "}
          <span className="text-gray-600">{currentUser.lastName}</span>
        </h1>
        <Avatar
          className="mt-10"
          sx={{ width: 100, height: 100 }}
          alt={currentUser.username}
          src={currentUser.avatar}
        />
        <p className="mt-1 text-base leading-7 text-gray-400">
          username:{" "}
          <span className="text-gray-600 font-bold">
            {currentUser.username}
          </span>
        </p>
        <p className="mt-10 text-xl font-skin text-fuchsia-600 ">
          Your friends are waiting for you.
        </p>
      </div>
    </main>
  );
};

export default HelloSection;
