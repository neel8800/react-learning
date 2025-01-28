const { createContext } = require("react");

const UserContext = createContext({
  loggedInUserName: "Neel",
});

export default UserContext;
