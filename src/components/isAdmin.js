import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function IsAdmin({ children }) {
  const { isAdmin, isLoading } = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isAdmin) {
    // If the user is not logged in navigate to the login page ❌
    return children;
  }
}

export default IsAdmin;
