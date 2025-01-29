import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import useCheckOnlineStatus from "./utils/useCheckOnlineStatus";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/reduxStore/appStore";
import Cart from "./components/Cart";
import Grocery from "./components/Grocery";

/* Initializing lazy loading */
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
const Error = lazy(() => import("./components/Error"));

/* Initializing main App component */
const App = () => {
  /* Initializing state variables */
  const onlineStatus = useCheckOnlineStatus();

  const [userName, setUserName] = useState();
  useEffect(() => {
    const userInfo = {
      userName: "Neel",
    };
    setUserName(userInfo?.userName);
  }, []);

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
    <Provider store={appStore}>
      <div>
        <UserContext.Provider
          value={{ loggedInUserName: userName, setUserName: setUserName }}
        >
          <div>
            <Header />
          </div>
          <div className="flex flex-col">
            <Outlet />
          </div>
        </UserContext.Provider>
      </div>
    </Provider>
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
        path: "/grocery",
        element: (
          <Suspense
            fallback={
              <div className="flex text-lg font-bold p-4 m-4">Loading...</div>
            }
          >
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense
            fallback={
              <div className="flex text-lg font-bold p-4 m-4">Loading...</div>
            }
          >
            <Cart />
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
