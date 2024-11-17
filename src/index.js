import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";

const App = () => {
  return (
    <div className="container">
      <div>
        <Header />
      </div>
      <div>
        <Body />
      </div>
    </div>
  );
};

/* Render Actual Element */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
