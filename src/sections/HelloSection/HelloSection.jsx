import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const HelloSection = () => {
  return (
    <main className="grid w-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-xl font-semibold text-indigo-600 sm:text-3xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/">
            <Button variant="contained">Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HelloSection;
