import { Component } from "react";
// import UserClass from "./UserClass";
import UserFunction from "./UserFunction";
import UserContext from "../utils/UserContext";

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>About</h1>
        <h2>This is about page</h2>
        <div className="user-cards">
          {/* <UserClass username={"neel8800"} /> */}
          {/* <UserClass username={"akshaymarch7"} /> */}
          <UserFunction name={"Neel"} />
          <UserContext.Consumer>
            {(userData) => {
              return (
                <h1 className="font-bold text-xl">
                  LoggedIn User from Context: {userData.loggedInUserName}
                </h1>
              );
            }}
          </UserContext.Consumer>
        </div>
      </div>
    );
  }
}

export default About;
