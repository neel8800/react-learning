import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "githubUser",
        location: "githubLocation",
        html_url: "githubUrl",
        avatar_ur: "githubAvtar",
      },
    };
  }

  async componentDidMount() {
    console.log("componentDidMount");

    const responseData = await fetch(
      "https://api.github.com/users/" + this.props.username
    );
    const userData = await responseData.json();

    this.setState({
      userInfo: {
        name: userData.login === null ? "Not Available" : userData.login,
        location:
          userData.location === null ? "Not Available" : userData.location,
        html_url:
          userData.html_url === null ? "Not Available" : userData.html_url,
        avatar_url:
          userData.avatar_url === null ? "Not Available" : userData.avatar_url,
      },
    });
  }

  componentDidUpdate() {
    console.log("conponentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    const { name, location, html_url, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <img src={avatar_url} alt="githubAvtar" />
        <h3>Name: {name}</h3>
        <h3>Location: {location}</h3>
        <h3>Follow on: {html_url}</h3>
      </div>
    );
  }
}

export default UserClass;
