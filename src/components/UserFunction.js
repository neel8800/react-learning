import { useEffect } from "react";

const UserFunction = (props) => {
  // useEffect(() => {
  //   console.log("Child useEffect");
  //   const interval = setInterval(() => {
  //     console.log("UserFunction component is mounted");
  //   }, 1000);

  //   /* Implementation of cmponentWillUnmount in functional component */
  //   return () => {
  //     console.log("Child functinal component will unmount");
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <div className="user-card">
      <h1>Name: {props.name}</h1>
      <h2>Location: Ahmedabad</h2>
      <h3>Contact: neelpatel</h3>
    </div>
  );
};

export default UserFunction;
