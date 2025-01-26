import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import useCheckOnlineStatus from "./utils/useCheckOnlineStatus";

/* Initializing lazy loading */
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
const Error = lazy(() => import("./components/Error"));

/* Initializing main App component */
const App = () => {
  /* Initializing state variables */
  const onlineStatus = useCheckOnlineStatus();

  /* Render offline component if offline */
  if (!onlineStatus) {
    return (
      <div className="flex justify-center items-center">
        <h2 className="flex text-lg font-bold p-4 m-4">
          Oops....You are offline. Please check your internet connection.
        </h2>
      </div>
    );
  }

  /* Render actual component if online */
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};

/* Creating Browser Routers */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense
            fallback={
              <div className="flex text-lg font-bold p-4 m-4">Loading...</div>
            }
          >
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense
            fallback={
              <div className="flex text-lg font-bold p-4 m-4">Loading...</div>
            }
          >
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:restaurantId",
        element: (
          <Suspense
            fallback={
              <div className="flex text-lg font-bold p-4 m-4">Loading...</div>
            }
          >
            <RestaurantMenu />
          </Suspense>
        ),
      },
    ],

    errorElement: (
      <Suspense
        fallback={
          <div className="flex text-lg font-bold p-4 m-4">Error...</div>
        }
      >
        <Error />
      </Suspense>
    ),
  },
]);

/* Render Actual Element */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
