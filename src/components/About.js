import { Component } from "react";
// import UserClass from "./UserClass";
import UserFunction from "./UserFunction";

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
        </div>
      </div>
    );
  }
}

export default About;
