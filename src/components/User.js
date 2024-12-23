const User = (props) => {
  return (
    <div className="user-card">
      <h1>Name: {props.name}</h1>
      <h2>Location: Ahmedabad</h2>
      <h3>Contact: neelpatel</h3>
    </div>
  );
};

export default User;
