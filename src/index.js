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
        <h2>Oops....You are offline. Please check your internet connection.</h2>
      </div>
    );
  }

  /* Render actual component if online */
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex flex-col justify-center items-center px-4 max-w-7xl mx-auto">
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
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:restaurantId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
    ],

    errorElement: (
      <Suspense fallback={<div>Error...</div>}>
        <Error />
      </Suspense>
    ),
  },
]);

/* Render Actual Element */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
